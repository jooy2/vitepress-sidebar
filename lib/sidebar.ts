import type { UserConfig } from 'vitepress';
import { join, resolve } from 'path';
import { globSync } from 'glob';
import { existsSync, readdirSync, statSync } from 'fs';
import { isTrueMinimumNumberOfTimes, objMergeNewKey } from 'qsu';
import type { Sidebar, SidebarItem, SidebarListItem, VitePressSidebarOptions } from './types.js';
import {
  debugPrint,
  deepDeleteKey,
  generateNotTogetherMessage,
  getDateFromFrontmatter,
  getExcludeFromFrontmatter,
  getOrderFromFrontmatter,
  getTitleFromMd,
  removePrefixFromTitleAndLink,
  sortByFileTypes,
  sortByObjectKey
} from './helper.js';

function generateSidebarItem(
  depth: number,
  currentDir: string,
  displayDir: string,
  parentName: string | null,
  options: VitePressSidebarOptions
): SidebarListItem {
  const filesByGlobPattern: string[] = globSync('**', {
    cwd: currentDir,
    maxDepth: 1,
    ignore: options.excludeByGlobPattern || options.excludePattern || [],
    dot: true,
    follow: options.followSymlinks ?? false
  });
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

      let childItemPathDisplay = `${displayDir}/${x}`.replace(/\/{2}/, '/');

      if (childItemPathDisplay.endsWith('/index.md')) {
        childItemPathDisplay = childItemPathDisplay.replace('index.md', '');
      } else {
        childItemPathDisplay = childItemPathDisplay.replace(/\.md$/, '');
      }

      if (options.documentRootPath && childItemPathDisplay.startsWith(options.documentRootPath)) {
        if (depth === 1) {
          childItemPathDisplay = childItemPathDisplay.replace(
            new RegExp(`^${options.documentRootPath}`, 'g'),
            ''
          );
        }

        if (options.scanStartPath || options.resolvePath) {
          childItemPathDisplay = childItemPathDisplay.replace(/^\//g, '');

          if (options.scanStartPath) {
            childItemPathDisplay = childItemPathDisplay.replace(
              new RegExp(`^${options.scanStartPath}`, 'g'),
              ''
            );
          }

          childItemPathDisplay = childItemPathDisplay.replace(/^\/(?!$)/g, '');

          if (childItemPathDisplay === '/') {
            childItemPathDisplay = 'index.md';
          }
        } else if (!childItemPathDisplay.startsWith('/')) {
          childItemPathDisplay = `/${childItemPathDisplay}`;
        }
      }

      if (!childItemPathDisplay) {
        childItemPathDisplay = 'index.md';
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

      if (!filesByGlobPattern.includes(x)) {
        return null;
      }

      if (statSync(childItemPath).isDirectory()) {
        let directorySidebarItems =
          generateSidebarItem(depth + 1, childItemPath, childItemPathDisplay, x, options) || [];

        let isTitleReceivedFromFileContent = false;
        let newDirectoryText = getTitleFromMd(x, childItemPath, options, true, () => {
          isTitleReceivedFromFileContent = true;
        });
        let newDirectoryPagePath = childItemPath;
        let withDirectoryLink;
        let isNotEmptyDirectory = false;

        const indexFilePath = `${childItemPath}/index.md`;
        const findSameNameSubFile = directorySidebarItems.find(
          (y: SidebarListItem) => y.text === x
        );

        if (options.useFolderLinkFromSameNameSubFile && findSameNameSubFile) {
          newDirectoryPagePath = resolve(childItemPath, `${findSameNameSubFile.text}.md`);
          newDirectoryText = getTitleFromMd(x, newDirectoryPagePath, options, false, () => {
            isTitleReceivedFromFileContent = true;
          });

          if (options.folderLinkNotIncludesFileName) {
            withDirectoryLink = `${childItemPathDisplay}/`;
          } else {
            withDirectoryLink = findSameNameSubFile.link;
          }

          directorySidebarItems = directorySidebarItems.filter(
            (y: SidebarListItem) => y.text !== x
          );
        }

        // If an index.md file exists in a folder subfile,
        // replace the name or link of the folder with what is set in index.md.
        // The index.md file can still be displayed if the value of `includeFolderIndexFile` is `true`.
        if (existsSync(indexFilePath)) {
          if (options.includeFolderIndexFile) {
            isNotEmptyDirectory = true;
          }

          if (options.useFolderLinkFromIndexFile) {
            isNotEmptyDirectory = true;
            newDirectoryPagePath = indexFilePath;
            withDirectoryLink = `${childItemPathDisplay}/index.md`;
          }

          if (options.useFolderTitleFromIndexFile && !isTitleReceivedFromFileContent) {
            isNotEmptyDirectory = true;
            newDirectoryPagePath = indexFilePath;
            newDirectoryText = getTitleFromMd('index', newDirectoryPagePath, options, false);
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
            ...(directorySidebarItems.length > 0 ? { items: directorySidebarItems } : {}),
            ...(options.collapsed === null ||
            options.collapsed === undefined ||
            directorySidebarItems.length < 1
              ? {}
              : { collapsed: depth >= options.collapseDepth! && options.collapsed }),
            ...(options.sortMenusByFrontmatterOrder
              ? {
                  order: getOrderFromFrontmatter(
                    newDirectoryPagePath,
                    options.frontmatterOrderDefaultValue!
                  )
                }
              : {}),
            ...(options.sortMenusByFrontmatterDate
              ? {
                  date: getDateFromFrontmatter(childItemPath)
                }
              : {})
          };
        }

        return null;
      }

      if (childItemPath.endsWith('.md')) {
        if (getExcludeFromFrontmatter(childItemPath, options.excludeFilesByFrontmatterFieldName)) {
          return null;
        }

        let childItemText;
        const childItemTextWithoutExt = x.replace(/\.md$/, '');

        if (options.useFolderLinkFromSameNameSubFile && parentName === childItemTextWithoutExt) {
          childItemText = childItemTextWithoutExt;
        } else {
          childItemText = getTitleFromMd(x, childItemPath, options, false);
        }

        return {
          text: childItemText,
          link: childItemPathDisplay,
          ...(options.sortMenusByFrontmatterOrder
            ? {
                order: getOrderFromFrontmatter(childItemPath, options.frontmatterOrderDefaultValue!)
              }
            : {}),
          ...(options.sortMenusByFrontmatterDate
            ? {
                date: getDateFromFrontmatter(childItemPath)
              }
            : {})
        };
      }
      return null;
    })
    .filter((x) => x !== null);

  if (options.sortMenusByName) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'text',
      desc: options.sortMenusOrderByDescending
    });
  }

  if (options.sortMenusByFileDatePrefix) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'text',
      desc: options.sortMenusOrderByDescending,
      dateSortFromTextWithPrefix: true,
      datePrefixSeparator: options.prefixSeparator
    });
  }

  if (options.sortMenusByFrontmatterOrder) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'order',
      desc: options.sortMenusOrderByDescending,
      numerically: true
    });

    deepDeleteKey(sidebarItems, 'order');
  }

  if (options.sortMenusByFrontmatterDate) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'date',
      desc: options.sortMenusOrderByDescending,
      dateSortFromFrontmatter: true
    });

    deepDeleteKey(sidebarItems, 'date');
  }

  if (options.sortMenusOrderNumericallyFromTitle) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'text',
      desc: options.sortMenusOrderByDescending,
      numerically: true
    });
  }

  if (options.sortMenusOrderNumericallyFromLink) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'link',
      desc: options.sortMenusOrderByDescending,
      numerically: true
    });
  }

  if (options.sortFolderTo) {
    sidebarItems = sortByFileTypes(sidebarItems, options.sortFolderTo);
  }

  return sidebarItems;
}

export function generateSidebar(
  options?: VitePressSidebarOptions | VitePressSidebarOptions[]
): Sidebar {
  const sidebar: Sidebar = {};
  const isMultipleSidebars = Array.isArray(options);
  let enableDebugPrint = false;
  let optionItems: (VitePressSidebarOptions | undefined)[];

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
    if (
      isTrueMinimumNumberOfTimes(
        [
          optionItem.sortMenusByFrontmatterOrder,
          optionItem.sortMenusByName,
          optionItem.sortMenusByFileDatePrefix
        ],
        2
      )
    ) {
      throw new Error(
        generateNotTogetherMessage([
          'sortMenusByFrontmatterOrder',
          'sortMenusByName',
          'sortMenusByFileDatePrefix'
        ])
      );
    }
    if (
      isTrueMinimumNumberOfTimes(
        [
          optionItem.sortMenusByFrontmatterOrder,
          optionItem.sortMenusOrderNumericallyFromTitle,
          optionItem.sortMenusOrderNumericallyFromLink
        ],
        2
      )
    ) {
      throw new Error(
        generateNotTogetherMessage([
          'sortMenusByFrontmatterOrder',
          'sortMenusOrderNumericallyFromTitle',
          'sortMenusOrderNumericallyFromLink'
        ])
      );
    }
    if (
      isTrueMinimumNumberOfTimes(
        [optionItem.sortMenusByFrontmatterOrder, optionItem.sortMenusByFrontmatterDate],
        2
      )
    ) {
      throw new Error(
        generateNotTogetherMessage(['sortMenusByFrontmatterOrder', 'sortMenusByFrontmatterDate'])
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
    optionItem.frontmatterOrderDefaultValue = optionItem?.frontmatterOrderDefaultValue ?? 0;

    let scanPath = optionItem.documentRootPath;

    if (optionItem.scanStartPath) {
      scanPath = `${optionItem.documentRootPath}/${optionItem.scanStartPath}`
        .replace(/\/{2,}/g, '/')
        .replace('/$', '');
    }

    let sidebarResult: SidebarListItem = generateSidebarItem(
      1,
      join(process.cwd(), scanPath),
      scanPath,
      null,
      optionItem
    );

    if (optionItem.removePrefixAfterOrdering) {
      sidebarResult = removePrefixFromTitleAndLink(sidebarResult, optionItem);
    }

    sidebar[optionItem.resolvePath || '/'] = {
      base: optionItem.basePath || optionItem.resolvePath || '/',
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
    debugPrint(optionItems, sidebarResult);
  }

  return sidebarResult;
}

export function withSidebar(
  vitePressOptions: UserConfig,
  sidebarOptions?: VitePressSidebarOptions | VitePressSidebarOptions[]
): Partial<UserConfig> {
  let optionItems: (VitePressSidebarOptions | undefined)[];

  if (sidebarOptions === undefined) {
    optionItems = [{}];
  } else {
    optionItems = Array.isArray(sidebarOptions) ? sidebarOptions : [sidebarOptions];
  }

  let enableDebugPrint = false;

  optionItems.forEach((optionItem) => {
    if (optionItem?.debugPrint && !enableDebugPrint) {
      enableDebugPrint = true;
      optionItem.debugPrint = false;
    }
  });

  const sidebarResult: Partial<UserConfig> = {
    themeConfig: {
      sidebar: generateSidebar(sidebarOptions)
    }
  };

  if (vitePressOptions?.themeConfig?.sidebar) {
    vitePressOptions.themeConfig.sidebar = {};
  }

  const result: Partial<UserConfig> = objMergeNewKey(vitePressOptions, sidebarResult) as UserConfig;

  if (enableDebugPrint) {
    debugPrint(sidebarOptions, result);
  }

  return result;
}
