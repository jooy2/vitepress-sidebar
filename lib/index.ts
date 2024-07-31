import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import matter from 'gray-matter';

declare interface Options {
  documentRootPath?: string;
  scanStartPath?: string;
  resolvePath?: string;
  collapsed?: boolean | null | undefined;
  collapseDepth?: number;
  hyphenToSpace?: boolean;
  underscoreToSpace?: boolean;
  capitalizeFirst?: boolean;
  capitalizeEachWords?: boolean;
  includeRootIndexFile?: boolean;
  includeFolderIndexFile?: boolean;
  useTitleFromFileHeading?: boolean;
  useTitleFromFrontmatter?: boolean;
  useFolderTitleFromIndexFile?: boolean;
  useFolderLinkFromIndexFile?: boolean;
  includeDotFiles?: boolean;
  convertSameNameSubFileToGroupIndexPage?: boolean;
  folderLinkNotIncludesFileName?: boolean;
  includeEmptyFolder?: boolean;
  sortMenusByName?: boolean;
  sortMenusByFrontmatterOrder?: boolean;
  sortMenusByFrontmatterDate?: boolean;
  sortMenusByFileDatePrefix?: boolean;
  sortMenusOrderByDescending?: boolean;
  sortMenusOrderNumericallyFromTitle?: boolean;
  sortMenusOrderNumericallyFromLink?: boolean;
  keepMarkdownSyntaxFromTitle?: boolean;
  debugPrint?: boolean;
  manualSortFileNameByPriority?: string[];
  excludeFiles?: string[];
  excludeFilesByFrontmatterFieldName?: string;
  excludeFolders?: string[];
  removePrefixAfterOrdering?: boolean;
  prefixSeparator?: string | RegExp;
  rootGroupText?: string;
  rootGroupLink?: string;
  rootGroupCollapsed?: boolean | null | undefined;
  frontmatterOrderDefaultValue?: number;
  frontmatterTitleFieldName?: string;
  /**
   * @deprecated
   */
  excludeFilesByFrontmatter?: boolean;
  /**
   * @deprecated
   */
  sortMenusOrderNumerically?: boolean;
  /**
   * @deprecated
   */
  sortByFileName?: string[];
  /**
   * @deprecated
   */
  root?: string;
  /**
   * @deprecated
   */
  includeEmptyGroup?: boolean;
  /**
   * @deprecated
   */
  withIndex?: boolean;
  /**
   * @deprecated
   */
  useFolderLinkAsIndexPage?: boolean;
  /**
   * @deprecated
   */
  useIndexFileForFolderMenuInfo?: boolean;
}

declare interface SidebarListItem {
  [key: string]: any;
}

declare interface SortByObjectKeyOptions {
  arr: SidebarListItem;
  key: string;
  desc?: boolean;
  numerically?: boolean;
  datePrefixSeparator?: string | RegExp;
  dateSortFromFrontmatter?: boolean;
  dateSortFromTextWithPrefix?: boolean;
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

export interface SidebarMultiItem {
  base: string;
  items: SidebarItem[];
}

export interface SidebarMulti {
  [path: string]: SidebarMultiItem;
}

export type Sidebar = SidebarItem[] | SidebarMulti;
/*
 * End
 * */

export default class VitePressSidebar {
  static generateSidebar(options?: Options | Options[]): Sidebar {
    const sidebar: Sidebar = {};
    const isMultipleSidebars = Array.isArray(options);
    let enableDebugPrint = false;
    let optionItems: (Options | undefined)[];

    if (arguments.length > 1) {
      throw new Error(`You must pass 1 argument, see the documentation for details.`);
    }

    if (options === undefined) {
      optionItems = [{}];
    } else {
      optionItems = Array.isArray(options) ? options : [options];
    }

    for (let i = 0; i < optionItems.length; i += 1) {
      const optionItem = optionItems[i]!;

      // Exceptions for changed option names
      if (optionItem.root) {
        throw new Error(VitePressSidebar.generateDeprecateMessage('root', 'documentRootPath'));
      }
      if (optionItem.withIndex) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage('withIndex', 'includeRootIndexFile')
        );
      }
      if (optionItem.includeEmptyGroup) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage('includeEmptyGroup', 'includeEmptyFolder')
        );
      }
      if (optionItem.sortByFileName) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage(
            'sortByFileName',
            'manualSortFileNameByPriority'
          )
        );
      }
      if (optionItem.useFolderLinkAsIndexPage) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage(
            'useFolderLinkAsIndexPage',
            'useIndexFileForFolderMenuInfo'
          )
        );
      }
      if (optionItem.excludeFilesByFrontmatter) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage(
            'excludeFilesByFrontmatter',
            'excludeFilesByFrontmatterFieldName'
          )
        );
      }
      if (optionItem.useIndexFileForFolderMenuInfo) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage(
            'useIndexFileForFolderMenuInfo',
            'useFolderTitleFromIndexFile` and `useFolderLinkFromIndexFile'
          )
        );
      }
      if (optionItem.sortMenusOrderNumerically) {
        throw new Error(
          VitePressSidebar.generateDeprecateMessage(
            'sortMenusOrderNumerically',
            'sortMenusOrderNumericallyFromTitle` and `sortMenusOrderNumericallyFromLink'
          )
        );
      }
      if (
        VitePressSidebar.isTrueMinimumNumberOfTimes(
          [
            optionItem.sortMenusByFrontmatterOrder,
            optionItem.sortMenusByName,
            optionItem.sortMenusByFileDatePrefix
          ],
          2
        )
      ) {
        throw new Error(
          VitePressSidebar.generateNotTogetherMessage([
            'sortMenusByFrontmatterOrder',
            'sortMenusByName',
            'sortMenusByFileDatePrefix'
          ])
        );
      }
      if (
        VitePressSidebar.isTrueMinimumNumberOfTimes(
          [
            optionItem.sortMenusByFrontmatterOrder,
            optionItem.sortMenusOrderNumericallyFromTitle,
            optionItem.sortMenusOrderNumericallyFromLink
          ],
          2
        )
      ) {
        throw new Error(
          VitePressSidebar.generateNotTogetherMessage([
            'sortMenusByFrontmatterOrder',
            'sortMenusOrderNumericallyFromTitle',
            'sortMenusOrderNumericallyFromLink'
          ])
        );
      }
      if (
        VitePressSidebar.isTrueMinimumNumberOfTimes(
          [optionItem.sortMenusByFrontmatterOrder, optionItem.sortMenusByFrontmatterDate],
          2
        )
      ) {
        throw new Error(
          VitePressSidebar.generateNotTogetherMessage([
            'sortMenusByFrontmatterOrder',
            'sortMenusByFrontmatterDate'
          ])
        );
      }
      if (optionItem.removePrefixAfterOrdering && !optionItem.prefixSeparator) {
        throw new Error(`'prefixSeparator' should not use empty string`);
      }

      if (optionItem.debugPrint && !enableDebugPrint) {
        enableDebugPrint = true;
      }

      optionItem.documentRootPath = optionItem?.documentRootPath ?? '/';

      if (!/^\//.test(optionItem.documentRootPath)) {
        optionItem.documentRootPath = `/${optionItem.documentRootPath}`;
      }

      if (optionItem.collapseDepth) {
        optionItem.collapsed = true;
      }

      if (!optionItem.prefixSeparator) {
        optionItem.prefixSeparator = '.';
      }

      optionItem.collapseDepth = optionItem?.collapseDepth ?? 1;
      optionItem.manualSortFileNameByPriority = optionItem?.manualSortFileNameByPriority ?? [];
      optionItem.excludeFiles = optionItem?.excludeFiles ?? [];
      optionItem.excludeFolders = optionItem?.excludeFolders ?? [];
      optionItem.frontmatterOrderDefaultValue = optionItem?.frontmatterOrderDefaultValue ?? 0;

      let scanPath = optionItem.documentRootPath;

      if (optionItem.scanStartPath) {
        scanPath = `${optionItem.documentRootPath}/${optionItem.scanStartPath}`
          .replace(/\/{2,}/g, '/')
          .replace('/$', '');
      }

      let sidebarResult: SidebarListItem = VitePressSidebar.generateSidebarItem(
        1,
        join(process.cwd(), scanPath),
        scanPath,
        null,
        optionItem
      );

      if (optionItem.removePrefixAfterOrdering) {
        sidebarResult = VitePressSidebar.removePrefixFromTitleAndLink(sidebarResult, optionItem);
      }

      sidebar[optionItem.resolvePath || '/'] = {
        base: optionItem.resolvePath || '/',
        items:
          sidebarResult?.items ||
          (optionItem.rootGroupText ||
          optionItem.rootGroupLink ||
          optionItem.rootGroupCollapsed === true ||
          optionItem.rootGroupCollapsed === false
            ? [
                {
                  text: optionItem.rootGroupText,
                  ...(optionItem.rootGroupLink ? { link: optionItem.rootGroupLink } : {}),
                  items: sidebarResult as SidebarItem[],
                  ...(optionItem.rootGroupCollapsed === null
                    ? {}
                    : { collapsed: optionItem.rootGroupCollapsed })
                }
              ]
            : (sidebarResult as SidebarItem[]))
      };
    }

    let sidebarResult;

    if (!isMultipleSidebars && Object.keys(sidebar).length === 1) {
      // Single sidebar
      sidebarResult = Object.values(sidebar)[0].items;
    } else {
      // Multiple sidebars
      sidebarResult = sidebar;
    }

    if (enableDebugPrint) {
      process.stdout.write(
        `\n${'='.repeat(50)}\n${JSON.stringify(optionItems, null, 2)}\n${'-'.repeat(
          50
        )}\n${JSON.stringify(sidebarResult, null, 2)}\n${'='.repeat(50)}\n\n`
      );
    }

    return sidebarResult;
  }

  private static generateDeprecateMessage(original: string, renameTo: string) {
    return `The \`${original}\` option was renamed to \`${renameTo}\`.`;
  }

  private static generateNotTogetherMessage(options: string[]) {
    return `These options cannot be used together: ${options.join(', ')}`;
  }

  private static generateSidebarItem(
    depth: number,
    currentDir: string,
    displayDir: string,
    parentName: string | null,
    options: Options
  ): SidebarListItem {
    let directoryFiles: string[] = readdirSync(currentDir);

    if (options.manualSortFileNameByPriority!.length > 0) {
      const needSortItem = directoryFiles.filter(
        (x) => options.manualSortFileNameByPriority?.indexOf(x) !== -1
      );
      const remainItem = directoryFiles.filter(
        (x) => options.manualSortFileNameByPriority?.indexOf(x) === -1
      );

      needSortItem.sort(
        (a, b) =>
          options.manualSortFileNameByPriority!.indexOf(a) -
          options.manualSortFileNameByPriority!.indexOf(b)
      );

      directoryFiles = [...needSortItem, ...remainItem];
    }

    let sidebarItems: SidebarListItem = directoryFiles
      .map((x: string) => {
        const childItemPath = resolve(currentDir, x);
        let childItemPathDisplay = `${displayDir}/${x}`
          .replace(/\/{2}/, '/')
          .replace(/(index)?\.md$/, '');

        if (options.documentRootPath && childItemPathDisplay.startsWith(options.documentRootPath)) {
          childItemPathDisplay = childItemPathDisplay.replace(
            new RegExp(`^${options.documentRootPath}`, 'g'),
            ''
          );

          if (options.scanStartPath || options.resolvePath) {
            childItemPathDisplay = childItemPathDisplay.replace(/^\//g, '');

            if (options.scanStartPath) {
              childItemPathDisplay = childItemPathDisplay.replace(
                new RegExp(`^${options.scanStartPath}`, 'g'),
                ''
              );
            }

            childItemPathDisplay = childItemPathDisplay.replace(/^\//g, '');
          } else if (!childItemPathDisplay.startsWith('/')) {
            childItemPathDisplay = `/${childItemPathDisplay}`;
          }
        }

        if (/\.vitepress/.test(childItemPath)) {
          return null;
        }

        if (/node_modules/.test(childItemPath)) {
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
          let newDirectoryPagePath = childItemPath;
          let withDirectoryLink;
          let isNotEmptyDirectory = false;

          if (options.convertSameNameSubFileToGroupIndexPage) {
            const findItem = directorySidebarItems.find((y: SidebarListItem) => y.text === x);

            if (findItem) {
              newDirectoryPagePath = resolve(childItemPath, `${findItem.text}.md`);
              newDirectoryText = VitePressSidebar.getTitleFromMd(
                x,
                newDirectoryPagePath,
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
          } else {
            // If an index.md file exists in a folder subfile,
            // replace the name or link of the folder with what is set in index.md.
            // The index.md file can still be displayed if the value of `includeFolderIndexFile` is `true`.
            newDirectoryPagePath = `${childItemPath}/index.md`;

            if (existsSync(newDirectoryPagePath)) {
              isNotEmptyDirectory = true;

              if (options.useFolderTitleFromIndexFile) {
                newDirectoryText = VitePressSidebar.getTitleFromMd(
                  'index',
                  newDirectoryPagePath,
                  options
                );
              }
              if (options.useFolderLinkFromIndexFile) {
                withDirectoryLink = `${childItemPathDisplay}/index.md`;
              }
            }
          }

          if (
            (withDirectoryLink && options.includeEmptyFolder !== false) ||
            options.includeEmptyFolder ||
            directorySidebarItems.length > 0 ||
            isNotEmptyDirectory
          ) {
            return {
              text: newDirectoryText,
              ...(withDirectoryLink ? { link: withDirectoryLink } : {}),
              items: directorySidebarItems,
              ...(options.collapsed === null || options.collapsed === undefined
                ? {}
                : { collapsed: depth >= options.collapseDepth! && options.collapsed }),
              ...(options.sortMenusByFrontmatterOrder
                ? {
                    order: VitePressSidebar.getOrderFromFrontmatter(
                      newDirectoryPagePath,
                      options.frontmatterOrderDefaultValue!
                    )
                  }
                : {}),
              ...(options.sortMenusByFrontmatterDate
                ? {
                    date: VitePressSidebar.getDateFromFrontmatter(childItemPath)
                  }
                : {})
            };
          }

          return null;
        }

        if (childItemPath.endsWith('.md')) {
          if (
            options.excludeFiles?.includes(x) ||
            VitePressSidebar.getExcludeFromFrontmatter(
              childItemPath,
              options.excludeFilesByFrontmatterFieldName
            )
          ) {
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
            link: childItemPathDisplay,
            ...(options.sortMenusByFrontmatterOrder
              ? {
                  order: VitePressSidebar.getOrderFromFrontmatter(
                    childItemPath,
                    options.frontmatterOrderDefaultValue!
                  )
                }
              : {}),
            ...(options.sortMenusByFrontmatterDate
              ? {
                  date: VitePressSidebar.getDateFromFrontmatter(childItemPath)
                }
              : {})
          };
        }
        return null;
      })
      .filter((x) => x !== null);

    if (options.sortMenusByName) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'text',
        desc: options.sortMenusOrderByDescending
      });
    }

    if (options.sortMenusByFileDatePrefix) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'text',
        desc: options.sortMenusOrderByDescending,
        dateSortFromTextWithPrefix: true,
        datePrefixSeparator: options.prefixSeparator
      });
    }

    if (options.sortMenusByFrontmatterOrder) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'order',
        desc: options.sortMenusOrderByDescending
      });

      VitePressSidebar.deepDeleteKey(sidebarItems, 'order');
    }

    if (options.sortMenusByFrontmatterDate) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'date',
        desc: options.sortMenusOrderByDescending,
        dateSortFromFrontmatter: true
      });

      VitePressSidebar.deepDeleteKey(sidebarItems, 'date');
    }

    if (options.sortMenusOrderNumericallyFromTitle) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'text',
        desc: options.sortMenusOrderByDescending,
        numerically: true
      });
    }

    if (options.sortMenusOrderNumericallyFromLink) {
      sidebarItems = VitePressSidebar.sortByObjectKey({
        arr: sidebarItems,
        key: 'link',
        desc: options.sortMenusOrderByDescending,
        numerically: true
      });
    }

    return sidebarItems;
  }

  // Get a single value of type T from Frontmatter
  // Defaults to defaultValue
  private static getValueFromFrontmatter<T>(filePath: string, key: string, defaultValue: T): T {
    try {
      const fileData = readFileSync(filePath, 'utf-8');
      const { data } = matter(fileData);

      // Try for using gray-matter
      if (data?.[key]) {
        return data[key];
      }

      // Try manual parsing
      const lines = fileData.split('\n');
      let frontmatterStart = false;

      for (let i = 0, len = lines.length; i < len; i += 1) {
        const str = lines[i].toString().replace('\r', '');

        if (/^---$/.test(str)) {
          frontmatterStart = true;
        }
        if (new RegExp(`^${key}: (.*)`).test(str) && frontmatterStart) {
          return JSON.parse(str.replace(`${key}: `, '')) as T;
        }
      }
    } catch (e) {
      return defaultValue;
    }
    return defaultValue;
  }

  private static getOrderFromFrontmatter(filePath: string, defaultOrder: number): number {
    return parseInt(
      VitePressSidebar.getValueFromFrontmatter<string>(filePath, 'order', defaultOrder.toString()),
      10
    );
  }

  private static getDateFromFrontmatter(filePath: string): string {
    return VitePressSidebar.getValueFromFrontmatter<string>(filePath, 'date', '0001-01-01');
  }

  private static getExcludeFromFrontmatter(
    filePath: string,
    excludeFrontmatterFieldName?: string
  ): boolean {
    if (!excludeFrontmatterFieldName) {
      return false;
    }

    return VitePressSidebar.getValueFromFrontmatter<boolean>(
      filePath,
      excludeFrontmatterFieldName,
      false
    );
  }

  private static capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private static formatTitle(options: Options, title: string): string {
    let result = title;

    if (options.hyphenToSpace) {
      result = result.replace(/-/g, ' ');
    }

    if (options.underscoreToSpace) {
      result = result.replace(/_/g, ' ');
    }

    if (options.capitalizeEachWords) {
      const splitStr = result.trim().toLowerCase().split(' ');

      for (let i = 0; i < splitStr.length; i += 1) {
        splitStr[i] = VitePressSidebar.capitalizeFirst(splitStr[i]);
      }

      result = splitStr.join(' ');
    } else if (options.capitalizeFirst) {
      result = VitePressSidebar.capitalizeFirst(result);
    }

    return result;
  }

  private static getTitleFromMd(
    fileName: string,
    filePath: string,
    options: Options,
    isDirectory = false
  ): string {
    if (isDirectory) {
      return VitePressSidebar.formatTitle(options, fileName);
    }

    if (options.useTitleFromFrontmatter) {
      // Use content frontmatter title value instead of file name
      let value = VitePressSidebar.getValueFromFrontmatter<string | undefined>(
        filePath,
        options.frontmatterTitleFieldName || 'title',
        undefined
      );
      // Try to use title front-matter as fallback
      if (!value) {
        value = VitePressSidebar.getValueFromFrontmatter<string | undefined>(
          filePath,
          'title',
          undefined
        );
      }
      if (value) {
        return VitePressSidebar.formatTitle(options, value);
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
            str = str.replace(/^# /, '');

            if (/\[(.*)]\(.*\)/.test(str)) {
              // Remove hyperlink from h1 if exists
              const execValue = /(.*)?\[(.*)]\((.*)\)(.*)?/.exec(str) || '';

              str =
                execValue.length > 0
                  ? `${execValue[1] || ''}${execValue[2] || ''}${execValue[4] || ''}`
                  : '';
            }

            // Remove certain Markdown format
            if (!options.keepMarkdownSyntaxFromTitle) {
              str = str.replace(/\*{1,2}([^*]+?)\*{1,2}/g, '$1');
              str = str.replace(/_{1,2}([^_]+?)_{1,2}/g, '$1');
              str = str.replace(/~{1,2}([^~]+?)~{1,2}/g, '$1');
              str = str.replace(/`{1,3}([^`]+?)`{1,3}/g, '$1');
            }

            return VitePressSidebar.formatTitle(options, str);
          }
        }
      } catch {
        return 'Unknown';
      }
    }

    return VitePressSidebar.formatTitle(options, fileName.replace(/\.md$/, ''));
  }

  private static sortByObjectKey(options: SortByObjectKeyOptions): object[] {
    for (let i = 0; i < options.arr.length; i += 1) {
      if (options.arr[i].items && options.arr[i].items.length) {
        options.arr[i].items = VitePressSidebar.sortByObjectKey({
          ...options,
          arr: options.arr[i].items
        });
      }
    }

    if (options.numerically) {
      const collator = new Intl.Collator([], { numeric: true });

      const result = options.arr.sort((a: any, b: any) =>
        collator.compare(a[options.key], b[options.key])
      );

      if (options.desc) {
        return result.reverse();
      }

      return result;
    }

    if (options.dateSortFromFrontmatter) {
      const result = options.arr.sort(
        (a: any, b: any) => new Date(a[options.key]).valueOf() - new Date(b[options.key]).valueOf()
      );

      if (options.desc) {
        return result.reverse();
      }

      return result;
    }

    if (options.dateSortFromTextWithPrefix) {
      const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/g;

      const result = options.arr.sort((a: any, b: any) => {
        const aDate = a[options.key].split(dateRegex)?.[0];
        const bDate = b[options.key].split(dateRegex)?.[0];

        return new Date(aDate).valueOf() - new Date(bDate).valueOf();
      });

      if (options.desc) {
        return result.reverse();
      }

      return result;
    }

    return options.arr.sort((a: any, b: any) => {
      if (!options.desc) {
        if (a[options.key] < b[options.key]) return -1;
        if (a[options.key] > b[options.key]) return 1;

        return 0;
      }
      if (a[options.key] > b[options.key]) return -1;
      if (a[options.key] < b[options.key]) return 1;

      return 0;
    });
  }

  private static deepDeleteKey(obj: SidebarListItem, key: string) {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    if (Object.hasOwn(obj, key)) {
      delete obj[key];
    }

    Object.keys(obj).forEach((item) => {
      if (typeof obj[item] === 'object') {
        VitePressSidebar.deepDeleteKey(obj[item], key);
      }
    });
  }

  private static removePrefixFromTitleAndLink(
    sidebarList: SidebarListItem,
    options: Options
  ): SidebarListItem {
    const sidebarListLength = sidebarList.length;

    for (let i = 0; i < sidebarListLength; i += 1) {
      const obj = sidebarList[i];

      for (let j = 0; j < Object.keys(obj).length; j += 1) {
        const key = Object.keys(obj)[j];

        if (key === 'text') {
          if (
            !(
              !(options.prefixSeparator instanceof RegExp) &&
              obj[key].indexOf(options.prefixSeparator) === -1
            )
          ) {
            const splitItem = obj[key].split(options.prefixSeparator);

            splitItem.shift();

            obj[key] = splitItem.join(options.prefixSeparator);
          }
        } else if (key === 'items') {
          obj[key] = VitePressSidebar.removePrefixFromTitleAndLink(obj[key], options);
        }
      }
    }

    return sidebarList;
  }

  private static isTrueMinimumNumberOfTimes(conditions: any[], minimumCount = 1): boolean {
    const conditionLength = conditions.length;
    let trueCount = 0;

    for (let i = 0; i < conditionLength; i += 1) {
      if (typeof conditions[i] === 'boolean' && conditions[i]) {
        trueCount += 1;
      }
    }

    return trueCount >= minimumCount;
  }
}

export { VitePressSidebar };

export const { generateSidebar } = VitePressSidebar;
