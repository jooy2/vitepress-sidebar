import type { UserConfig } from 'vitepress';
import { join, relative, resolve } from 'path';
import { globSync } from 'glob';
import { existsSync, readdirSync, statSync } from 'fs';
import { isTrueMinimumNumberOfTimes, objMergeNewKey } from 'qsu';
import type { Sidebar, SidebarItem, SidebarListItem, VitePressSidebarOptions } from './types.js';
import {
  createSortItem,
  debugPrint,
  deepDeleteKey,
  formatTitle,
  generateNotTogetherMessage,
  getDateFromFile,
  getDateFromFrontmatter,
  getExcludeFromFrontmatter,
  getOrderFromFrontmatter,
  getTitleFromMd,
  removePrefixFromTitleAndLink,
  sortByCustomFunction,
  sortByFileTypes,
  sortByObjectKey,
  SORT_ITEM_KEY
} from './helper.js';
import { createSidebarHmrPlugin } from './external.js';
import {
  detectDocumentRootPath,
  mergeConfigFilesInPath,
  normalizeOptions,
  readConfigFile
} from './config-file.js';
import type { DynamicRoute, DynamicRouteNode } from './dynamic-route.js';
import {
  buildDynamicRouteTree,
  getDynamicRouteNode,
  hasDynamicRouteTemplate,
  isDynamicRouteName,
  isDynamicRoutePath,
  resolveDynamicRoutes
} from './dynamic-route.js';

// Every option that decides the order of the items of a level, other than the
// custom sort function itself.
const SORT_OPTION_NAMES = [
  'sortMenusByName',
  'sortMenusByFileDatePrefix',
  'sortMenusByFrontmatterOrder',
  'sortMenusByFrontmatterDate',
  'sortMenusByFileCreateDate',
  'sortMenusByFileModifyDate',
  'sortMenusOrderNumericallyFromTitle',
  'sortMenusOrderNumericallyFromLink',
  'sortMenusOrderByDescending'
] as const;

/**
 * The paths that the `srcExclude` of the VitePress configuration matches.
 *
 * VitePress never builds a page it excludes, so an item left in the sidebar for
 * one would link to a page that does not exist. The patterns are resolved once
 * per document root, because they describe the project as a whole instead of a
 * single directory, and are matched by path instead of being handed to the
 * per-directory scan: a pattern such as `guide/private/**` is relative to the
 * document root and matches nothing when it is applied inside every directory.
 */
interface SrcExcludePaths {
  /** Directory the paths are relative to */
  rootDir: string;
  /** Every matched path, relative to `rootDir` and separated by `/` */
  paths: Set<string>;
}

function toPosixPath(path: string): string {
  return path.replace(/\\/g, '/');
}

function resolveSrcExcludePaths(rootDir: string, patterns?: string[]): SrcExcludePaths | null {
  if (!patterns || patterns.length < 1) {
    return null;
  }

  // A pattern that ends in `/**` matches the directory itself as well, so a
  // whole excluded folder is dropped instead of being scanned and then found
  // empty.
  const matchedPaths = globSync(patterns, {
    cwd: rootDir,
    dot: true,
    follow: false
  });

  if (matchedPaths.length < 1) {
    return null;
  }

  return { rootDir, paths: new Set(matchedPaths.map((x) => toPosixPath(x))) };
}

function isExcludedBySrcExclude(srcExclude: SrcExcludePaths | null, itemPath: string): boolean {
  if (!srcExclude) {
    return false;
  }

  return srcExclude.paths.has(toPosixPath(relative(srcExclude.rootDir, itemPath)));
}

function applyManualSort(fileNames: string[], priority: string[]): string[] {
  if (priority.length < 1) {
    return fileNames;
  }

  const needSortItem = fileNames.filter((x) => priority.indexOf(x) !== -1);
  const remainItem = fileNames.filter((x) => priority.indexOf(x) === -1);

  needSortItem.sort((a, b) => priority.indexOf(a) - priority.indexOf(b));

  return [...needSortItem, ...remainItem];
}

/**
 * Turns the name of an item into the link it gets in the sidebar.
 *
 * Shared by the items read from disk and by the ones a dynamic route generates,
 * because a generated page is linked exactly like a file sitting at that path.
 */
function resolveDisplayPath(
  displayDir: string,
  itemName: string,
  depth: number,
  options: VitePressSidebarOptions
): string {
  let itemPathDisplay = `${displayDir}/${itemName}`.replace(/\/{2}/, '/');

  if (itemPathDisplay.endsWith('/index.md')) {
    itemPathDisplay = itemPathDisplay.replace('index.md', '');
  } else {
    itemPathDisplay = itemPathDisplay.replace(/\.md$/, '');
  }

  if (options.documentRootPath && itemPathDisplay.startsWith(options.documentRootPath)) {
    if (depth === 1) {
      itemPathDisplay = itemPathDisplay.replace(
        new RegExp(`^${options.documentRootPath}`, 'g'),
        ''
      );
    }

    if (options.scanStartPath || options.resolvePath) {
      itemPathDisplay = itemPathDisplay.replace(/^\//g, '');

      if (options.scanStartPath) {
        itemPathDisplay = itemPathDisplay.replace(new RegExp(`^${options.scanStartPath}`, 'g'), '');
      }

      itemPathDisplay = itemPathDisplay.replace(/^\/(?!$)/g, '');

      if (itemPathDisplay === '/') {
        itemPathDisplay = 'index.md';
      }
    } else if (!itemPathDisplay.startsWith('/')) {
      itemPathDisplay = `/${itemPathDisplay}`;
    }
  }

  if (!itemPathDisplay) {
    itemPathDisplay = 'index.md';
  }

  return itemPathDisplay;
}

/**
 * Reads a value the `paths` loader supplied for a generated page.
 *
 * A dynamic route template is one file, so anything read from it is identical
 * for every page it generates. A parameter is the only place where a generated
 * page can carry a value of its own, which is why it wins over the frontmatter.
 */
function getValueFromRouteParams(
  routeParams: { [key: string]: string } | undefined,
  key: string
): string | undefined {
  const value = routeParams?.[key];

  return value === undefined || value === null || value === '' ? undefined : String(value);
}

function generateFileItem(
  fileName: string,
  filePath: string,
  filePathDisplay: string,
  parentName: string | null,
  options: VitePressSidebarOptions,
  routeParams?: { [key: string]: string }
): SidebarListItem | null {
  if (getExcludeFromFrontmatter(filePath, options.excludeFilesByFrontmatterFieldName)) {
    return null;
  }

  const fileNameWithoutExt = fileName.replace(/\.md$/, '');
  const titleFromParams = getValueFromRouteParams(routeParams, options.dynamicRouteTitleParam!);
  const orderFromParams = parseFloat(getValueFromRouteParams(routeParams, 'order') ?? '');
  const dateFromParams = getValueFromRouteParams(routeParams, 'date');
  let fileItemText;

  if (titleFromParams) {
    fileItemText = formatTitle(options, titleFromParams);
  } else if (options.useFolderLinkFromSameNameSubFile && parentName === fileNameWithoutExt) {
    fileItemText = fileNameWithoutExt;
  } else {
    fileItemText = getTitleFromMd(fileName, filePath, options, false, undefined, routeParams);
  }

  return {
    text: fileItemText,
    link: filePathDisplay,
    ...(options.sortMenusByFrontmatterOrder
      ? {
          order: Number.isFinite(orderFromParams)
            ? orderFromParams
            : getOrderFromFrontmatter(filePath, options.frontmatterOrderDefaultValue!)
        }
      : {}),
    ...(options.sortMenusByFrontmatterDate
      ? {
          date: dateFromParams ?? getDateFromFrontmatter(filePath)
        }
      : {}),
    ...(options.sortMenusByFileCreateDate
      ? {
          date: getDateFromFile(filePath)
        }
      : {}),
    ...(options.sortMenusByFileModifyDate
      ? {
          date: getDateFromFile(filePath, true)
        }
      : {}),
    ...(options.sortMenusByCustomFunction
      ? {
          [SORT_ITEM_KEY]: createSortItem({
            text: fileItemText,
            link: filePathDisplay,
            fileName,
            filePath,
            isDirectory: false
          })
        }
      : {})
  };
}

function generateDirectoryItem(
  depth: number,
  directoryName: string,
  directoryPath: string,
  directoryPathDisplay: string,
  options: VitePressSidebarOptions,
  rawOptions: VitePressSidebarOptions,
  routeNode: DynamicRouteNode | null,
  srcExclude: SrcExcludePaths | null
): SidebarListItem | null {
  // A `sidebar.config.json` inside the folder takes priority over the
  // inherited options, both for the folder itself and everything below it.
  const folderConfig = readConfigFile(directoryPath, false);
  const childRawOptions = folderConfig ? { ...rawOptions, ...folderConfig.options } : rawOptions;
  const childOptions = folderConfig ? normalizeOptions(childRawOptions) : options;
  // Describes this folder only, so it is read here instead of being
  // passed down with the options.
  const folderMeta = folderConfig?.folder ?? {};

  let directorySidebarItems =
    generateSidebarItem(
      depth + 1,
      directoryPath,
      directoryPathDisplay,
      directoryName,
      childOptions,
      childRawOptions,
      routeNode,
      srcExclude
    ) || [];

  let isTitleReceivedFromFileContent = false;
  let newDirectoryText = getTitleFromMd(directoryName, directoryPath, childOptions, true, () => {
    isTitleReceivedFromFileContent = true;
  });
  let newDirectoryPagePath = directoryPath;
  let withDirectoryLink;
  let isNotEmptyDirectory = false;

  const indexFilePath = `${directoryPath}/index.md`;
  const findSameNameSubFile = directorySidebarItems.find(
    (y: SidebarListItem) => y.text === directoryName
  );

  if (childOptions.useFolderLinkFromSameNameSubFile && findSameNameSubFile) {
    newDirectoryPagePath = resolve(directoryPath, `${findSameNameSubFile.text}.md`);
    newDirectoryText = getTitleFromMd(
      directoryName,
      newDirectoryPagePath,
      childOptions,
      false,
      () => {
        isTitleReceivedFromFileContent = true;
      }
    );

    if (childOptions.folderLinkNotIncludesFileName) {
      withDirectoryLink = `${directoryPathDisplay}/`;
    } else {
      withDirectoryLink = findSameNameSubFile.link;
    }

    directorySidebarItems = directorySidebarItems.filter(
      (y: SidebarListItem) => y.text !== directoryName
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
      withDirectoryLink = `${directoryPathDisplay}/index.md`;
    }

    if (childOptions.useFolderTitleFromIndexFile && !isTitleReceivedFromFileContent) {
      isNotEmptyDirectory = true;
      newDirectoryPagePath = indexFilePath;
      newDirectoryText = getTitleFromMd('index', newDirectoryPagePath, childOptions, false);
    }
  }

  // `$folder` states what the folder should look like, so it wins over
  // the folder name and over anything read from `index.md`.
  newDirectoryText = folderMeta.text ?? newDirectoryText;
  withDirectoryLink = folderMeta.link ?? withDirectoryLink;

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
      (typeof childOptions.collapseFromLevel === 'number' && depth < childOptions.collapseFromLevel)
        ? {}
        : { collapsed: depth >= childOptions.collapseDepth! && childOptions.collapsed }),
      ...(options.sortMenusByFrontmatterOrder
        ? {
            // Ordering a folder through `$folder` keeps its position
            // independent of where its `index.md` sits inside it, and
            // works for a folder that has no `index.md` at all.
            order:
              folderMeta.order ??
              getOrderFromFrontmatter(newDirectoryPagePath, options.frontmatterOrderDefaultValue!)
          }
        : {}),
      ...(options.sortMenusByFrontmatterDate
        ? {
            date: getDateFromFrontmatter(directoryPath)
          }
        : {}),
      ...(options.sortMenusByFileCreateDate
        ? {
            date: getDateFromFile(directoryPath)
          }
        : {}),
      ...(options.sortMenusByFileModifyDate
        ? {
            date: getDateFromFile(directoryPath, true)
          }
        : {}),
      // A folder only gets a link when an option asks for one, so sorting by
      // link alone would leave every link-less folder at one end of the list.
      // Its path is what a file in that position would be linked by, so it
      // sorts the folder where the folder name says it belongs.
      ...(options.sortMenusOrderNumericallyFromLink && !withDirectoryLink
        ? {
            sortPath: directoryPathDisplay
          }
        : {}),
      // Built from the options of the parent, because this item is sorted
      // among the items of the folder that holds it.
      ...(options.sortMenusByCustomFunction
        ? {
            [SORT_ITEM_KEY]: createSortItem({
              text: newDirectoryText,
              link: withDirectoryLink,
              fileName: directoryName,
              filePath: directoryPath,
              isDirectory: true
            })
          }
        : {})
    };
  }

  return null;
}

/**
 * Builds the items of the pages a dynamic route template generates.
 *
 * The items are read from the resolved routes instead of from disk, because the
 * only thing on disk is the template, and VitePress never serves a page under
 * the literal path of a template.
 */
function generateDynamicRouteItems(
  depth: number,
  currentDir: string,
  displayDir: string,
  parentName: string | null,
  options: VitePressSidebarOptions,
  rawOptions: VitePressSidebarOptions,
  routeNode: DynamicRouteNode,
  filesByGlobPattern: string[],
  srcExclude: SrcExcludePaths | null
): SidebarListItem {
  // A child whose template segment holds no parameter stands for a real
  // directory, which the scan of this directory already covers.
  const childNodes = [...routeNode.children.values()].filter((node) =>
    isDynamicRouteName(node.templateName)
  );

  if (childNodes.length < 1) {
    return [];
  }

  const nodesByName = new Map(childNodes.map((node) => [node.name, node]));

  return applyManualSort([...nodesByName.keys()], options.manualSortFileNameByPriority!)
    .map((name) => {
      const node = nodesByName.get(name)!;

      if (depth === 1 && name === 'index.md' && !options.includeRootIndexFile) {
        return null;
      }

      if (depth !== 1 && name === 'index.md' && !options.includeFolderIndexFile) {
        return null;
      }

      if (!options.includeDotFiles && /^\./.test(name)) {
        return null;
      }

      // Excluding a template excludes every page it generates, which is the
      // only way to exclude them: a generated page has no file to match.
      if (!filesByGlobPattern.includes(node.templateName)) {
        return null;
      }

      const templatePath = resolve(currentDir, node.templateName);

      // Excluding the template from the build excludes every page it
      // generates, because none of them has a file of its own.
      if (isExcludedBySrcExclude(srcExclude, templatePath)) {
        return null;
      }

      const itemPathDisplay = resolveDisplayPath(displayDir, name, depth, options);

      if (node.route) {
        return generateFileItem(
          name,
          templatePath,
          itemPathDisplay,
          parentName,
          options,
          node.route.params
        );
      }

      return generateDirectoryItem(
        depth,
        name,
        templatePath,
        itemPathDisplay,
        options,
        rawOptions,
        node,
        srcExclude
      );
    })
    .filter((x) => x !== null);
}

function generateSidebarItem(
  depth: number,
  currentDir: string,
  displayDir: string,
  parentName: string | null,
  options: VitePressSidebarOptions,
  rawOptions: VitePressSidebarOptions,
  routeNode: DynamicRouteNode | null = null,
  srcExclude: SrcExcludePaths | null = null
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
  // Below a dynamic route template directory, every page comes from a resolved
  // route. Reading the directory there would produce items for paths that
  // VitePress does not serve, so the files on disk are left alone.
  const isBelowDynamicRouteTemplate = !!routeNode && isDynamicRoutePath(routeNode.templatePath);
  const directoryFiles: string[] = isBelowDynamicRouteTemplate
    ? []
    : applyManualSort(readdirSync(currentDir), options.manualSortFileNameByPriority!);

  let sidebarItems: SidebarListItem = directoryFiles
    .map((x: string) => {
      const childItemPath = resolve(currentDir, x);
      const childItemPathDisplay = resolveDisplayPath(displayDir, x, depth, options);

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

      // Applied on top of the exclusion options instead of replacing them, so
      // that both what VitePress excludes and what the sidebar excludes on its
      // own are left out.
      if (isExcludedBySrcExclude(srcExclude, childItemPath)) {
        return null;
      }

      // A template is not a page of its own, and the pages it generates are
      // added separately, so it never appears under its literal name.
      if (options.includeDynamicRoutes && isDynamicRouteName(x)) {
        return null;
      }

      if (statSync(childItemPath).isDirectory()) {
        return generateDirectoryItem(
          depth,
          x,
          childItemPath,
          childItemPathDisplay,
          options,
          rawOptions,
          routeNode?.children.get(x) ?? null,
          srcExclude
        );
      }

      if (childItemPath.endsWith('.md')) {
        return generateFileItem(x, childItemPath, childItemPathDisplay, parentName, options);
      }

      return null;
    })
    .filter((x) => x !== null);

  if (routeNode) {
    sidebarItems = sidebarItems.concat(
      generateDynamicRouteItems(
        depth,
        currentDir,
        displayDir,
        parentName,
        options,
        rawOptions,
        routeNode,
        filesByGlobPattern,
        srcExclude
      )
    );
  }

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
      fallbackKey: 'sortPath',
      desc: options.sortMenusOrderByDescending,
      numerically: true
    });

    deepDeleteKey(sidebarItems, 'sortPath');
  }

  if (options.sortMenusByCustomFunction) {
    sidebarItems = sortByCustomFunction(sidebarItems, options.sortMenusByCustomFunction);

    deepDeleteKey(sidebarItems, SORT_ITEM_KEY);
  }

  if (options.sortFolderTo) {
    sidebarItems = sortByFileTypes(sidebarItems, options.sortFolderTo);
  }

  return sidebarItems;
}

/**
 * Builds the sidebar.
 *
 * `srcExcludePatterns` holds the `srcExclude` of the VitePress configuration,
 * which only `withSidebar` is able to read. It is a parameter instead of an
 * option because it belongs to VitePress rather than to the sidebar, and it is
 * never something the user of this function sets.
 */
function buildSidebar(
  options?: VitePressSidebarOptions | VitePressSidebarOptions[],
  srcExcludePatterns?: string[]
): Sidebar {
  const sidebar: Sidebar = {};
  const isMultipleSidebars = Array.isArray(options);
  let enableDebugPrint = false;
  let optionItems: (VitePressSidebarOptions | undefined)[];

  if (options === undefined) {
    optionItems = [{}];
  } else {
    optionItems = Array.isArray(options) ? options : [options];
  }

  const cwd = process.cwd();
  const resolvedOptionItems: VitePressSidebarOptions[] = [];
  // Resolving the routes evaluates project code, so it is done once per
  // document root and shared by every sidebar built from it. The cache lives
  // for this call only, so a later call always sees the current routes.
  const dynamicRoutesByRootPath = new Map<string, DynamicRoute[]>();
  // Matching `srcExclude` walks the whole document root, so the result is
  // shared by every sidebar built from the same one.
  const srcExcludeByRootPath = new Map<string, SrcExcludePaths | null>();
  // Only a configuration file in the current working directory may declare
  // `documentRootPath`, because the document root decides which of the other
  // configuration files are read.
  const projectRootConfig = readConfigFile(cwd, true);
  let detectedDocumentRootPath: string | null | undefined;

  for (let i = 0; i < optionItems.length; i += 1) {
    const inlineOptions = optionItems[i]!;

    let documentRootPath =
      projectRootConfig?.options.documentRootPath ?? inlineOptions.documentRootPath;

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
      projectRootConfig?.options.documentRootPath === undefined
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
    if (optionItem.sortMenusByCustomFunction) {
      if (typeof optionItem.sortMenusByCustomFunction !== 'function') {
        throw new Error(`'sortMenusByCustomFunction' must be a function`);
      }

      // A custom sort function decides the order of a whole level by itself, so
      // another sorting option could only run before it and be discarded, or
      // run after it and discard it.
      const conflictingOptions = SORT_OPTION_NAMES.filter((name) => optionItem[name]);

      if (conflictingOptions.length > 0) {
        throw new Error(
          generateNotTogetherMessage(['sortMenusByCustomFunction', ...conflictingOptions])
        );
      }
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

    const documentRootDir = join(cwd, resolvedOptionItem.documentRootPath!);
    // A `srcExclude` pattern is relative to the document root even when the
    // scan starts below it, exactly like it is relative to the `srcDir` of
    // VitePress.
    let srcExclude = srcExcludeByRootPath.get(documentRootDir);

    if (srcExclude === undefined) {
      srcExclude = resolveSrcExcludePaths(documentRootDir, srcExcludePatterns);

      srcExcludeByRootPath.set(documentRootDir, srcExclude);
    }

    let routeNode: DynamicRouteNode | null = null;

    if (resolvedOptionItem.includeDynamicRoutes) {
      // A route is relative to the document root even when the scan starts
      // below it, so the routes are always resolved from the document root and
      // the tree is walked down to the directory the scan starts from.
      let dynamicRoutes = dynamicRoutesByRootPath.get(documentRootDir);

      if (!dynamicRoutes) {
        dynamicRoutes = hasDynamicRouteTemplate(documentRootDir)
          ? resolveDynamicRoutes(documentRootDir)
          : [];

        dynamicRoutesByRootPath.set(documentRootDir, dynamicRoutes);
      }

      if (dynamicRoutes.length > 0) {
        routeNode = getDynamicRouteNode(
          buildDynamicRouteTree(dynamicRoutes),
          resolvedOptionItem.scanStartPath ?? ''
        );
      }
    }

    let sidebarResult: SidebarListItem = generateSidebarItem(
      1,
      join(cwd, scanPath),
      scanPath,
      null,
      resolvedOptionItem,
      optionItem,
      routeNode,
      srcExclude
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

export function generateSidebar(
  options?: VitePressSidebarOptions | VitePressSidebarOptions[]
): Sidebar {
  if (arguments.length > 1) {
    throw new Error(`You must pass 1 argument, see the documentation for details.`);
  }

  // Called without the VitePress configuration, so there is no `srcExclude` to
  // honor. Only `withSidebar` is able to read it.
  return buildSidebar(options);
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

  // A page excluded by `srcExclude` is never built, so an item generated for it
  // would link nowhere. The patterns are inherited instead of having to be
  // repeated in the options of the sidebar, and apply on top of them.
  const sidebarResult: Partial<UserConfig> = {
    themeConfig: {
      sidebar: buildSidebar(sidebarOptions, vitePressOptions?.srcExclude)
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
