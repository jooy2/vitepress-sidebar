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
  getDateFromFile,
  getDateFromFrontmatter,
  getExcludeFromFrontmatter,
  getOrderFromFrontmatter,
  getTitleFromMd,
  removePrefixFromTitleAndLink,
  sortByFileTypes,
  sortByObjectKey
} from './helper.js';
import { createSidebarHmrPlugin } from './external.js';
import {
  detectDocumentRootPath,
  mergeConfigFilesInPath,
  normalizeOptions,
  readConfigFile
} from './config-file.js';

function generateSidebarItem(
  depth: number,
  currentDir: string,
  displayDir: string,
  parentName: string | null,
  options: VitePressSidebarOptions,
  rawOptions: VitePressSidebarOptions
): SidebarListItem {
  if (typeof options.excludeByFolderDepth === 'number' && options.excludeByFolderDepth <= depth) {
    return [];
  }

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
        // A `sidebar.config.json` inside the folder takes priority over the
        // inherited options, both for the folder itself and everything below it.
        const folderConfig = readConfigFile(childItemPath, false);
        const childRawOptions = folderConfig ? { ...rawOptions, ...folderConfig } : rawOptions;
        const childOptions = folderConfig ? normalizeOptions(childRawOptions) : options;

        let directorySidebarItems =
          generateSidebarItem(
            depth + 1,
            childItemPath,
            childItemPathDisplay,
            x,
            childOptions,
            childRawOptions
          ) || [];

        let isTitleReceivedFromFileContent = false;
        let newDirectoryText = getTitleFromMd(x, childItemPath, childOptions, true, () => {
          isTitleReceivedFromFileContent = true;
        });
        let newDirectoryPagePath = childItemPath;
        let withDirectoryLink;
        let isNotEmptyDirectory = false;

        const indexFilePath = `${childItemPath}/index.md`;
        const findSameNameSubFile = directorySidebarItems.find(
          (y: SidebarListItem) => y.text === x
        );

        if (childOptions.useFolderLinkFromSameNameSubFile && findSameNameSubFile) {
          newDirectoryPagePath = resolve(childItemPath, `${findSameNameSubFile.text}.md`);
          newDirectoryText = getTitleFromMd(x, newDirectoryPagePath, childOptions, false, () => {
            isTitleReceivedFromFileContent = true;
          });

          if (childOptions.folderLinkNotIncludesFileName) {
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
          if (childOptions.includeFolderIndexFile) {
            isNotEmptyDirectory = true;
          }

          if (childOptions.useFolderLinkFromIndexFile) {
            isNotEmptyDirectory = true;
            newDirectoryPagePath = indexFilePath;
            withDirectoryLink = `${childItemPathDisplay}/index.md`;
          }

          if (childOptions.useFolderTitleFromIndexFile && !isTitleReceivedFromFileContent) {
            isNotEmptyDirectory = true;
            newDirectoryPagePath = indexFilePath;
            newDirectoryText = getTitleFromMd('index', newDirectoryPagePath, childOptions, false);
          }
        }

        if (
          (withDirectoryLink && childOptions.includeEmptyFolder !== false) ||
          childOptions.includeEmptyFolder ||
          directorySidebarItems.length > 0 ||
          isNotEmptyDirectory
        ) {
          return {
            text: newDirectoryText,
            ...(withDirectoryLink ? { link: withDirectoryLink } : {}),
            ...(directorySidebarItems.length > 0 ? { items: directorySidebarItems } : {}),
            ...(childOptions.collapsed === null ||
            childOptions.collapsed === undefined ||
            directorySidebarItems.length < 1 ||
            (typeof childOptions.collapseFromLevel === 'number' &&
              depth < childOptions.collapseFromLevel)
              ? {}
              : { collapsed: depth >= childOptions.collapseDepth! && childOptions.collapsed }),
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
              : {}),
            ...(options.sortMenusByFileCreateDate
              ? {
                  date: getDateFromFile(childItemPath)
                }
              : {}),
            ...(options.sortMenusByFileModifyDate
              ? {
                  date: getDateFromFile(childItemPath, true)
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
            : {}),
          ...(options.sortMenusByFileCreateDate
            ? {
                date: getDateFromFile(childItemPath)
              }
            : {}),
          ...(options.sortMenusByFileModifyDate
            ? {
                date: getDateFromFile(childItemPath, true)
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

  if (
    options.sortMenusByFrontmatterDate ||
    options.sortMenusByFileCreateDate ||
    options.sortMenusByFileModifyDate
  ) {
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

  const cwd = process.cwd();
  const resolvedOptionItems: VitePressSidebarOptions[] = [];
  // Only a configuration file in the current working directory may declare
  // `documentRootPath`, because the document root decides which of the other
  // configuration files are read.
  const projectRootConfig = readConfigFile(cwd, true);
  let detectedDocumentRootPath: string | null | undefined;

  for (let i = 0; i < optionItems.length; i += 1) {
    const inlineOptions = optionItems[i]!;

    let documentRootPath = projectRootConfig?.documentRootPath ?? inlineOptions.documentRootPath;

    if (documentRootPath === undefined) {
      // Without an explicit document root, the location of the configuration
      // files found in the project defines it.
      if (detectedDocumentRootPath === undefined) {
        detectedDocumentRootPath = detectDocumentRootPath(cwd);
      }

      documentRootPath = detectedDocumentRootPath ?? '/';
    }

    // Configuration files placed between the working directory and the scan
    // root are merged from the shallowest to the deepest one, and take priority
    // over the options passed as an argument.
    const rootPathConfig = mergeConfigFilesInPath(cwd, documentRootPath, true);

    if (
      rootPathConfig.documentRootPath !== undefined &&
      projectRootConfig?.documentRootPath === undefined
    ) {
      process.stderr.write(
        `[vitepress-sidebar] 'documentRootPath' is only read from a configuration file in the current working directory, so it was ignored.\n`
      );
    }

    let optionItem: VitePressSidebarOptions = {
      ...inlineOptions,
      ...rootPathConfig,
      documentRootPath
    };

    if (optionItem.scanStartPath) {
      optionItem = {
        ...optionItem,
        ...mergeConfigFilesInPath(join(cwd, documentRootPath), optionItem.scanStartPath, false)
      };
    }

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

    const resolvedOptionItem = normalizeOptions(optionItem);

    resolvedOptionItems.push(resolvedOptionItem);

    let scanPath = resolvedOptionItem.documentRootPath!;

    if (resolvedOptionItem.scanStartPath) {
      scanPath = `${resolvedOptionItem.documentRootPath}/${resolvedOptionItem.scanStartPath}`
        .replace(/\/{2,}/g, '/')
        .replace('/$', '');
    }

    let sidebarResult: SidebarListItem = generateSidebarItem(
      1,
      join(cwd, scanPath),
      scanPath,
      null,
      resolvedOptionItem,
      optionItem
    );

    if (resolvedOptionItem.removePrefixAfterOrdering) {
      sidebarResult = removePrefixFromTitleAndLink(sidebarResult, resolvedOptionItem);
    }

    sidebar[resolvedOptionItem.resolvePath || '/'] = {
      base: resolvedOptionItem.basePath || resolvedOptionItem.resolvePath || '/',
      items:
        sidebarResult?.items ||
        (resolvedOptionItem.rootGroupText ||
        resolvedOptionItem.rootGroupLink ||
        resolvedOptionItem.rootGroupCollapsed === true ||
        resolvedOptionItem.rootGroupCollapsed === false
          ? [
              {
                text: resolvedOptionItem.rootGroupText,
                ...(resolvedOptionItem.rootGroupLink
                  ? { link: resolvedOptionItem.rootGroupLink }
                  : {}),
                items: sidebarResult as SidebarItem[],
                ...(resolvedOptionItem.rootGroupCollapsed === null
                  ? {}
                  : { collapsed: resolvedOptionItem.rootGroupCollapsed })
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
    debugPrint(resolvedOptionItems, sidebarResult);
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

  // Inject a Vite plugin that restarts the dev server when Markdown files
  // are added or removed inside any `documentRootPath`. This allows the
  // sidebar to refresh in dev mode without manually restarting the server.
  const hmrPlugin = createSidebarHmrPlugin(sidebarOptions);
  const viteConfig = (result.vite ?? {}) as { plugins?: unknown[] };

  viteConfig.plugins = [...(viteConfig.plugins ?? []), hmrPlugin];
  result.vite = viteConfig as UserConfig['vite'];

  if (enableDebugPrint) {
    debugPrint(sidebarOptions, result);
  }

  return result;
}
