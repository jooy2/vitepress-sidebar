import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import matter from 'gray-matter';

declare interface Options {
  documentRootPath?: string;
  scanStartPath?: string;
  resolvePath?: string;
  rootGroupText?: string;
  rootGroupLink?: string;
  rootGroupCollapsed?: boolean | null | undefined;
  collapsed?: boolean | null | undefined;
  collapseDepth?: number;
  hyphenToSpace?: boolean;
  underscoreToSpace?: boolean;
  capitalizeFirst?: boolean;
  includeRootIndexFile?: boolean;
  includeFolderIndexFile?: boolean;
  useTitleFromFileHeading?: boolean;
  useTitleFromFrontmatter?: boolean;
  includeDotFiles?: boolean;
  convertSameNameSubFileToGroupIndexPage?: boolean;
  useIndexFileForFolderMenuInfo?: boolean;
  folderLinkNotIncludesFileName?: boolean;
  includeEmptyFolder?: boolean;
  sortByFileName?: string[];
  excludeFiles?: string[];
  excludeFolders?: string[];
  root?: string; // Deprecated
  includeEmptyGroup?: boolean; // Deprecated
  withIndex?: boolean; // Deprecated
  useFolderLinkAsIndexPage?: boolean; // Deprecated
}

declare interface SidebarListItem {
  [key: string]: any;
}

/*
 * Types from: `vitepress/types/default-theme.d.ts`
 */
export type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
};

export interface SidebarMulti {
  [path: string]: SidebarItem[];
}

export type Sidebar = SidebarItem[] | SidebarMulti;
/*
 * End
 * */

export default class VitePressSidebar {
  static generateSidebar(options: Options | Options[]): Sidebar {
    const optionItems: Options[] = Array.isArray(options) ? options : [options];
    const sidebar: Sidebar = {};
    let isMultipleSidebars = false;

    for (let i = 0; i < optionItems.length; i += 1) {
      const optionItem = optionItems[i];

      if (Object.keys(optionItem).length > 0) {
        // Exceptions for changed option names
        if (optionItem.root) {
          throw new Error('The `root` option was renamed to `documentRootPath`.');
        }
        if (optionItem.withIndex) {
          throw new Error('The `withIndex` option was renamed to `includeRootIndexFile`.');
        }
        if (optionItem.includeEmptyGroup) {
          throw new Error('The `includeEmptyGroup` option was renamed to `includeEmptyFolder`.');
        }
        if (optionItem.useFolderLinkAsIndexPage) {
          throw new Error(
            'The `useFolderLinkAsIndexPage` option was renamed to `useIndexFileForFolderMenuInfo`.'
          );
        }

        optionItem.documentRootPath = optionItem?.documentRootPath ?? '/';

        if (!/^\//.test(optionItem.documentRootPath)) {
          optionItem.documentRootPath = `/${optionItem.documentRootPath}`;
        }

        if (optionItem.scanStartPath && !/^\//.test(optionItem.scanStartPath)) {
          optionItem.scanStartPath = `/${optionItem.scanStartPath}`;
        }

        if (optionItem.scanStartPath && /\/$/.test(optionItem.scanStartPath)) {
          optionItem.scanStartPath = optionItem.scanStartPath.replace(/\/$/, '');
        }

        if (optionItem.collapseDepth) {
          optionItem.collapsed = true;
        }

        optionItem.rootGroupText = optionItem?.rootGroupText ?? 'Table of Contents';
        optionItem.collapseDepth = optionItem?.collapseDepth ?? 1;
        optionItem.sortByFileName = optionItem?.sortByFileName ?? [];
        optionItem.excludeFiles = optionItem?.excludeFiles ?? [];
        optionItem.excludeFolders = optionItem?.excludeFolders ?? [];

        let scanPath = optionItem.documentRootPath;

        if (optionItem.scanStartPath) {
          scanPath = `${optionItem.documentRootPath}${optionItem.scanStartPath}`;
        }

        const sidebarResult: SidebarListItem = VitePressSidebar.generateSidebarItem(
          1,
          join(process.cwd(), scanPath),
          scanPath,
          null,
          optionItem
        );

        if (optionItem.resolvePath) {
          isMultipleSidebars = true;
        }

        sidebar[optionItem.resolvePath || '/'] = sidebarResult?.items || [
          {
            text: optionItem.rootGroupText,
            ...(optionItem.rootGroupLink ? { link: optionItem.rootGroupLink } : {}),
            items: sidebarResult as SidebarItem[],
            ...(optionItem.rootGroupCollapsed === null ||
            optionItem.rootGroupCollapsed === undefined
              ? {}
              : { collapsed: optionItem.rootGroupCollapsed })
          }
        ];
      }
    }

    // Single sidebar
    if (!isMultipleSidebars && Object.keys(sidebar).length === 1) {
      return Object.values(sidebar)[0];
    }

    // Multiple sidebars
    return sidebar;
  }

  private static generateSidebarItem(
    depth: number,
    currentDir: string,
    displayDir: string,
    parentName: string | null,
    options: Options
  ): SidebarListItem {
    let directoryFiles: string[] = readdirSync(currentDir);

    if (options.sortByFileName!.length > 0) {
      const needSortItem = directoryFiles.filter((x) => options.sortByFileName?.indexOf(x) !== -1);
      const remainItem = directoryFiles.filter((x) => options.sortByFileName?.indexOf(x) === -1);
      needSortItem.sort(
        (a, b) => options.sortByFileName!.indexOf(a) - options.sortByFileName!.indexOf(b)
      );

      directoryFiles = [...needSortItem, ...remainItem];
    }

    return directoryFiles
      .map((x: string) => {
        const childItemPath = resolve(currentDir, x);
        let childItemPathDisplay = `${displayDir}/${x}`.replace(/\/{2}/, '/').replace(/\.md$/, '');

        if (options.documentRootPath && childItemPathDisplay.startsWith(options.documentRootPath)) {
          childItemPathDisplay = childItemPathDisplay.replace(options.documentRootPath, '');

          if (!childItemPathDisplay.startsWith('/')) {
            childItemPathDisplay = `/${childItemPathDisplay}`;
          }
        }

        if (/\.vitepress/.test(childItemPath)) {
          return null;
        }

        if (depth === 1 && x === 'index.md' && !options.includeRootIndexFile) {
          return null;
        }

        if (depth !== 1 && x === 'index.md' && !options.includeFolderIndexFile) {
          return null;
        }

        if (!options.includeDotFiles && /^\./.test(x)) {
          return null;
        }

        if (statSync(childItemPath).isDirectory()) {
          if (options.excludeFolders?.includes(x)) {
            return null;
          }

          let directorySidebarItems =
            VitePressSidebar.generateSidebarItem(
              depth + 1,
              childItemPath,
              childItemPathDisplay,
              x,
              options
            ) || [];

          let newDirectoryText = VitePressSidebar.getTitleFromMd(x, childItemPath, options, true);
          let withDirectoryLink;

          if (options.convertSameNameSubFileToGroupIndexPage) {
            const findItem = directorySidebarItems.find((y: SidebarListItem) => y.text === x);

            if (findItem) {
              newDirectoryText = VitePressSidebar.getTitleFromMd(
                x,
                resolve(childItemPath, `${findItem.text}.md`),
                options,
                false
              );

              if (options.folderLinkNotIncludesFileName) {
                withDirectoryLink = childItemPathDisplay;
              } else {
                withDirectoryLink = findItem.link;
              }

              directorySidebarItems = directorySidebarItems.filter(
                (y: SidebarListItem) => y.text !== x
              );
            }
          } else if (options.useIndexFileForFolderMenuInfo) {
            // If an index.md file exists in a folder subfile,
            // replace the name and link of the folder with what is set in index.md.
            // The index.md file can still be displayed if the value of `includeFolderIndexFile` is `true`.
            const childIndexFilePath = `${childItemPath}/index.md`;

            if (existsSync(childIndexFilePath)) {
              newDirectoryText = VitePressSidebar.getTitleFromMd(
                'index',
                childIndexFilePath,
                options
              );
              withDirectoryLink = `${childItemPathDisplay}/index`;
            }
          }

          if (options.includeEmptyFolder || directorySidebarItems.length > 0) {
            return {
              text: newDirectoryText,
              ...(withDirectoryLink ? { link: withDirectoryLink } : {}),
              items: directorySidebarItems,
              ...(options.collapsed === null || options.collapsed === undefined
                ? {}
                : { collapsed: depth >= options.collapseDepth! && options.collapsed })
            };
          }

          return null;
        }

        if (childItemPath.endsWith('.md')) {
          if (options.excludeFiles?.includes(x)) {
            return null;
          }

          let childItemText;
          const childItemTextWithoutExt = x.replace(/\.md$/, '');

          if (
            options.convertSameNameSubFileToGroupIndexPage &&
            parentName === childItemTextWithoutExt
          ) {
            childItemText = childItemTextWithoutExt;
          } else {
            childItemText = VitePressSidebar.getTitleFromMd(x, childItemPath, options);
          }

          return {
            text: childItemText,
            link: childItemPathDisplay
          };
        }
        return null;
      })
      .filter((x) => x !== null);
  }

  private static getTitleFromMd(
    fileName: string,
    filePath: string,
    options: Options,
    isDirectory = false
  ): string {
    let result: string = options.capitalizeFirst
      ? fileName.charAt(0).toUpperCase() + fileName.slice(1)
      : fileName;

    if (isDirectory) {
      if (options.hyphenToSpace) {
        result = result.replace(/-/g, ' ');
      }

      if (options.underscoreToSpace) {
        result = result.replace(/_/g, ' ');
      }

      return result;
    }

    if (options.useTitleFromFrontmatter) {
      // Use content frontmatter title value instead of file name
      try {
        const fileData = readFileSync(filePath, 'utf-8');

        const { data } = matter(fileData);

        // Try for using gray-matter
        if (data?.title) {
          const title = data?.title.toString();
          return options.capitalizeFirst ? title.charAt(0).toUpperCase() + title.slice(1) : title;
        }

        // Try manual parsing
        const lines = fileData.split('\n');
        let frontmatterStart = false;

        for (let i = 0, len = lines.length; i < len; i += 1) {
          let str = lines[i].toString().replace('\r', '');
          if (/^---$/.test(str)) {
            frontmatterStart = true;
          }
          if (/^title: (.*)/.test(str) && frontmatterStart) {
            str = str.replace('title: ', '');
            return options.capitalizeFirst ? str.charAt(0).toUpperCase() + str.slice(1) : str;
          }
        }
      } catch {
        return 'Unknown';
      }
    }

    if (options.useTitleFromFileHeading) {
      // Use content 'h1' string instead of file name
      try {
        const data = readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        for (let i = 0, len = lines.length; i < len; i += 1) {
          let str = lines[i].toString().replace('\r', '');
          if (/^# /.test(str)) {
            if (/\[(.*)]\(.*\)/.test(str)) {
              // Remove hyperlink from h1 if exists
              const execValue = /\[(.*)]\(.*\)/.exec(str)?.[1] || 'Unknown';
              return options.capitalizeFirst
                ? execValue.charAt(0).toUpperCase() + execValue.slice(1)
                : execValue;
            }
            str = str.replace(/^# /, '');
            return options.capitalizeFirst ? str.charAt(0).toUpperCase() + str.slice(1) : str;
          }
        }
      } catch {
        return 'Unknown';
      }
    } else {
      result = result.replace(/\.md$/, '');

      if (options.hyphenToSpace) {
        result = result.replace(/-/g, ' ');
      }

      if (options.underscoreToSpace) {
        result = result.replace(/_/g, ' ');
      }
    }

    return result;
  }
}

export { VitePressSidebar };

export const { generateSidebar } = VitePressSidebar;
