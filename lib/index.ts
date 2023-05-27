import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

declare interface Options {
  root?: string;
  rootGroupText?: string;
  rootGroupLink?: string;
  collapsed?: boolean;
  collapseDepth?: number;
  hyphenToSpace?: boolean;
  underscoreToSpace?: boolean;
  capitalizeFirst?: boolean;
  withIndex?: boolean;
  useTitleFromFileHeading?: boolean;
  useTitleFromFrontmatter?: boolean;
  convertSameNameSubFileToGroupIndexPage?: boolean;
  includeEmptyGroup?: boolean;
  sortByFileName?: string[];
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
  static generateSidebar(options: Options): Sidebar {
    options.root = options?.root ?? '/';
    if (!/^\//.test(options.root)) {
      options.root = `/${options.root}`;
    }
    if (options.collapseDepth) {
      options.collapsed = true;
    }

    options.rootGroupText = options?.rootGroupText ?? 'Table of Contents';
    options.collapseDepth = options?.collapseDepth ?? 1;
    options.sortByFileName = options?.sortByFileName ?? [];

    const sidebar: SidebarListItem = VitePressSidebar.generateSidebarItem(
      1,
      join(process.cwd(), options.root),
      options.root,
      null,
      options
    );

    if (!sidebar.items) {
      return [
        {
          text: options.rootGroupText,
          ...(options.rootGroupLink ? { link: options.rootGroupLink } : {}),
          items: sidebar as SidebarItem[],
          ...(options.collapsed === null || options.collapsed === undefined
            ? {}
            : { collapsed: options.collapseDepth! <= 1! && options.collapsed })
        }
      ];
    }

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
        const childItemPathDisplay = `${displayDir}/${x}`
          .replace(options.root ?? '', '')
          .replace(/\/{2}/, '/')
          .replace(/\.md$/, '');

        if (/\.vitepress/.test(childItemPath)) {
          return null;
        }
        if (displayDir === options.root && x === 'index.md' && !options.withIndex) {
          return null;
        }

        if (statSync(childItemPath).isDirectory()) {
          let directorySidebarItems =
            VitePressSidebar.generateSidebarItem(
              depth + 1,
              childItemPath,
              childItemPathDisplay,
              x,
              options
            ) || [];

          const convertDirectoryTitle = VitePressSidebar.getTitleFromMd(
            x,
            childItemPath,
            options,
            true
          );
          let withDirectoryLink;

          if (options.convertSameNameSubFileToGroupIndexPage) {
            const findItem = directorySidebarItems.find((y: SidebarListItem) => y.text === x);

            if (findItem) {
              withDirectoryLink = findItem.link;
              directorySidebarItems = directorySidebarItems.filter(
                (y: SidebarListItem) => y.text !== x
              );
            }
          }

          if (options.includeEmptyGroup || directorySidebarItems.length > 0) {
            return {
              text: convertDirectoryTitle,
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
        const data = readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        let frontmatterStart = false;
        for (let i = 0, len = lines.length; i < len; i += 1) {
          let str = lines[i].toString().replace('\r', '');
          if (str.indexOf('---') !== -1) {
            frontmatterStart = true;
          }
          if (str.indexOf('title: ') !== -1 && frontmatterStart) {
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
          if (str.indexOf('# ') !== -1) {
            if (/\[(.*)]\(.*\)/.test(str)) {
              // Remove hyperlink from h1 if exists
              const execValue = /\[(.*)]\(.*\)/.exec(str)?.[1] || 'Unknown';
              return options.capitalizeFirst
                ? execValue.charAt(0).toUpperCase() + execValue.slice(1)
                : execValue;
            }
            str = str.replace('# ', '');
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
