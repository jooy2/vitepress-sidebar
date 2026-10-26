import type { UserConfig } from 'vitepress';
import { join, relative, resolve } from 'path';
import { globSync } from 'glob';
import { existsSync, readdirSync, realpathSync, statSync } from 'fs';
import type { Dirent } from 'fs';
import { isTrueAtLeast, objMergeWithArrays } from 'qsu';
import type {
  Sidebar,
  SidebarItem,
  SidebarListItem,
  SidebarMulti,
  VitePressSidebarOptions
} from './types.js';
import {
  clearMarkdownFileCache,
  createPrefixRemover,
  createSortItem,
  debugPrint,
  deleteKeyFromLevel,
  formatTitle,
  generateNotTogetherMessage,
  getDateFromFile,
  getDateFromFrontmatter,
  getExcludeFromFrontmatter,
  getOrderFromFrontmatter,
  getTitleFromMd,
  removePrefixFromPath,
  removePrefixFromTitleAndLink,
  sortByCustomFunction,
  sortByFileTypes,
  sortByObjectKey,
  DIRECTORY_ITEM_KEY,
  FOLDER_META_LINK_KEY,
  SORT_ITEM_KEY
} from './helper.js';
import { createSidebarHmrPlugin } from './external.js';
import {
  clearReportedWarnings,
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

/** Name a root group is given when `rootGroupText` does not name one. */
const ROOT_GROUP_DEFAULT_TEXT = 'Table of Contents';

/**
 * Key a folder item is marked with when `splitSidebarByFolder` moves its
 * contents into a sidebar of its own. It holds the path of the folder on disk.
 *
 * The sidebar of the folder is made from the item, because the title and the
 * link of the item are only final once the sidebar holding it is.
 */
const SPLIT_FOLDER_KEY = 'splitFolderPath';

/**
 * Where the options of one sidebar come from.
 *
 * A sidebar is either one that the options passed describe, or one that
 * `splitSidebarByFolder` makes for a folder whose contents the sidebar above it
 * leaves out. The second kind is built from the options of the sidebar the
 * split started from, and `split` tells it apart.
 */
interface SidebarSource {
  inlineOptions: VitePressSidebarOptions;
  split?: {
    /**
     * Set over every other source, the configuration files included, because
     * a file found on the way down to the folder describes the sidebar the
     * split started from rather than this one.
     */
    overrides: VitePressSidebarOptions;
    /** Link of the folder, which the sidebars of its own folders link back to */
    folderLink: string;
  };
}

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

/**
 * The path a directory really is, with every symbolic link resolved, or `null`
 * when it cannot be resolved at all.
 */
function toRealPath(dirPath: string): string | null {
  try {
    return realpathSync(dirPath);
  } catch {
    return null;
  }
}

function applyManualSort(fileNames: string[], priority: string[]): string[] {
  if (priority.length < 1) {
    return fileNames;
  }

  // Looked up by name rather than searched for, so that a long list of
  // priorities does not turn every folder into a scan of it per entry.
  const priorityByName = new Map(priority.map((name, index) => [name, index]));
  const needSortItem: string[] = [];
  const remainItem: string[] = [];

  fileNames.forEach((fileName) => {
    (priorityByName.has(fileName) ? needSortItem : remainItem).push(fileName);
  });

  needSortItem.sort((a, b) => priorityByName.get(a)! - priorityByName.get(b)!);

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
  let itemPathDisplay = `${displayDir}/${itemName}`.replace(/\/{2,}/g, '/');

  if (itemPathDisplay.endsWith('/index.md')) {
    itemPathDisplay = itemPathDisplay.replace('index.md', '');
  } else {
    itemPathDisplay = itemPathDisplay.replace(/\.md$/, '');
  }

  if (options.documentRootPath && itemPathDisplay.startsWith(options.documentRootPath)) {
    // A path is stripped as the text it is, and never as a regular expression:
    // a `.`, a `(` or a `+` in a folder name would otherwise match something
    // else, or nothing at all, and leave the path in the link.
    if (depth === 1) {
      itemPathDisplay = itemPathDisplay.slice(options.documentRootPath.length);
    }

    if (options.scanStartPath || options.resolvePath) {
      itemPathDisplay = itemPathDisplay.replace(/^\//g, '');

      if (options.scanStartPath && itemPathDisplay.startsWith(options.scanStartPath)) {
        itemPathDisplay = itemPathDisplay.slice(options.scanStartPath.length);
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
 * A page path in the one form every link to that page shares: `/guide/`,
 * `/guide/index` and `/guide/index.md` all point at the index of `guide`.
 */
function toComparablePagePath(path: string): string {
  return path
    .replace(/\/{2,}/g, '/')
    .replace(/(^|\/)index(\.md)?$/, '$1')
    .replace(/\.md$/, '');
}

/**
 * Creates the check that reports two pages left at the same path once the
 * prefix is removed from their links, such as `1.intro.md` and `2.intro.md`.
 *
 * VitePress serves a single page at a path, so one of the two can no longer be
 * reached, and nothing else would say so. `seenPagePaths` maps every path seen
 * so far, without its prefix, to the page it was seen for.
 */
function createLinkCollisionCheck(
  options: VitePressSidebarOptions,
  seenPagePaths: Map<string, string>
): (link: string, linkWithoutPrefix: string) => void {
  // A link is relative to the scan root when the sidebar is resolved to a path
  // of its own, and the same link may sit below another document root, so the
  // page a link points at is told by the three together.
  const scanStartPath = options.scanStartPath ?? '';
  const pageDir = `${options.documentRootPath}/${scanStartPath}`;
  const pageDirWithoutPrefix = `${options.documentRootPath}/${removePrefixFromPath(
    scanStartPath,
    createPrefixRemover(options.prefixSeparator!)
  )}`;

  return (link, linkWithoutPrefix) => {
    const pagePath = toComparablePagePath(`${pageDir}/${link}`);
    const pagePathWithoutPrefix = toComparablePagePath(
      `${pageDirWithoutPrefix}/${linkWithoutPrefix}`
    );
    const otherPagePath = seenPagePaths.get(pagePathWithoutPrefix);

    if (otherPagePath === undefined) {
      seenPagePaths.set(pagePathWithoutPrefix, pagePath);
    } else if (otherPagePath !== pagePath) {
      process.stderr.write(
        `[vitepress-sidebar] '${otherPagePath}' and '${pagePath}' both become '${pagePathWithoutPrefix}' once their prefix is removed, so only one of them can be reached.\n`
      );
    }
  };
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
  srcExclude: SrcExcludePaths | null,
  ancestorRealPaths: Set<string> | null
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
      srcExclude,
      ancestorRealPaths
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

  // A split sidebar shows what it leaves out of a folder in a sidebar of the
  // folder's own. A folder that a dynamic route generates has no directory on
  // disk to start that sidebar from, so it stays as the scan leaves it.
  const isSplitFolder =
    !!childOptions.splitSidebarByFolder &&
    typeof childOptions.excludeByFolderDepth === 'number' &&
    childOptions.excludeByFolderDepth <= depth + 1 &&
    !(routeNode && isDynamicRoutePath(routeNode.templatePath));

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
      // Said rather than guessed from the items it holds, because a folder
      // kept by `includeEmptyFolder` or linked through an `index.md` holds
      // none and would otherwise be ordered as a file.
      ...(options.sortFolderTo ? { [DIRECTORY_ITEM_KEY]: true } : {}),
      ...(options.removePrefixFromLink && typeof folderMeta.link === 'string'
        ? { [FOLDER_META_LINK_KEY]: true }
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
        : {}),
      ...(isSplitFolder ? { [SPLIT_FOLDER_KEY]: directoryPath } : {})
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
  srcExclude: SrcExcludePaths | null,
  ancestorRealPaths: Set<string> | null
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
        srcExclude,
        ancestorRealPaths
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
  srcExclude: SrcExcludePaths | null = null,
  ancestorRealPaths: Set<string> | null = null
): SidebarListItem {
  if (typeof options.excludeByFolderDepth === 'number' && options.excludeByFolderDepth <= depth) {
    return [];
  }

  // Following a symbolic link can lead back to a directory that is already
  // being scanned, and a scan that walks into itself never ends. The real path
  // of every directory on the way here is remembered, so a link that closes
  // the circle is left out instead of being followed once more.
  let visitedRealPaths = ancestorRealPaths;

  if (options.followSymlinks) {
    const realPath = toRealPath(currentDir);

    if (realPath) {
      if (ancestorRealPaths?.has(realPath)) {
        return [];
      }

      visitedRealPaths = new Set(ancestorRealPaths).add(realPath);
    }
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
  // Read with the type of every entry, which the directory already knows, so
  // that telling a folder from a file costs nothing beyond the read itself.
  const directoryEntries: Dirent[] = isBelowDynamicRouteTemplate
    ? []
    : readdirSync(currentDir, { withFileTypes: true });
  const entryByName = new Map(directoryEntries.map((entry) => [entry.name, entry]));
  const directoryFiles: string[] = applyManualSort(
    // `readdirSync` returns the entries in whatever order the file system holds
    // them, which is sorted on some and a hash order on others, so the same
    // project produced a different sidebar depending on where it was built.
    // Sorted by code unit rather than by locale, so that the order does not
    // depend on the machine either.
    directoryEntries.map((entry) => entry.name).sort(),
    options.manualSortFileNameByPriority!
  );

  let sidebarItems: SidebarListItem = directoryFiles
    .map((x: string) => {
      const childItemPath = resolve(currentDir, x);
      const childItemPathDisplay = resolveDisplayPath(displayDir, x, depth, options);

      // Matched against the name of the entry rather than against the whole
      // path, so that a project whose own location holds one of these names
      // ("~/my-node_modules-docs") is scanned like any other.
      if (x === '.vitepress' || x === 'node_modules') {
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

      const childItemEntry = entryByName.get(x)!;
      let isChildDirectory = childItemEntry.isDirectory();

      // A directory entry says a symbolic link is a symbolic link, and not what
      // it points at, so that one still has to be looked up. One pointing at
      // nothing, or at a file removed while the scan was running, has nothing
      // to put in the sidebar and is not a reason to fail the whole build.
      if (!isChildDirectory && childItemEntry.isSymbolicLink()) {
        try {
          isChildDirectory = statSync(childItemPath).isDirectory();
        } catch {
          return null;
        }
      }

      if (isChildDirectory) {
        return generateDirectoryItem(
          depth,
          x,
          childItemPath,
          childItemPathDisplay,
          options,
          rawOptions,
          routeNode?.children.get(x) ?? null,
          srcExclude,
          visitedRealPaths
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
        srcExclude,
        visitedRealPaths
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
      dateSortFromTextWithPrefix: true
    });
  }

  if (options.sortMenusByFrontmatterOrder) {
    sidebarItems = sortByObjectKey({
      arr: sidebarItems,
      key: 'order',
      desc: options.sortMenusOrderByDescending,
      numerically: true
    });

    deleteKeyFromLevel(sidebarItems, 'order');
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

    deleteKeyFromLevel(sidebarItems, 'date');
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

    deleteKeyFromLevel(sidebarItems, 'sortPath');
  }

  if (options.sortMenusByCustomFunction) {
    sidebarItems = sortByCustomFunction(sidebarItems, options.sortMenusByCustomFunction);

    deleteKeyFromLevel(sidebarItems, SORT_ITEM_KEY);
  }

  if (options.sortFolderTo) {
    sidebarItems = sortByFileTypes(sidebarItems, options.sortFolderTo);

    deleteKeyFromLevel(sidebarItems, DIRECTORY_ITEM_KEY);
  }

  return sidebarItems;
}

/**
 * Whether VitePress resolves a link against the base of the sidebar it is in.
 *
 * VitePress puts the base in front of every link of a sidebar, so that only a
 * link relative to it comes out right. A link that starts with `/`, or that
 * names a protocol, already says where it points, and the base in front of it
 * turns `/guide/` into `/base//guide/`, and `/` into `//`, a link to another
 * host.
 */
function isLinkRelativeToBase(link: string): boolean {
  return !/^(?:\/|[a-z][a-z\d+.-]*:)/i.test(link);
}

/** The link VitePress makes of `link` in a sidebar based at `base`. */
function toAbsoluteLink(link: string, base: string): string {
  return isLinkRelativeToBase(link) ? `${base}${link}` : link;
}

function hasLinkNotRelativeToBase(items: SidebarItem[]): boolean {
  return items.some(
    (item) =>
      (!!item.link && !isLinkRelativeToBase(item.link)) ||
      (!!item.items && hasLinkNotRelativeToBase(item.items))
  );
}

/**
 * Puts the base in front of every link that is relative to it, which is what
 * VitePress would have done, so that the sidebar needs no base anymore and the
 * other links are kept as they were written.
 */
function resolveLinksAgainstBase(items: SidebarItem[], base: string): SidebarItem[] {
  return items.map((item) => ({
    ...item,
    ...(item.link ? { link: toAbsoluteLink(item.link, base) } : {}),
    ...(item.items ? { items: resolveLinksAgainstBase(item.items, base) } : {})
  }));
}

/** A path with a single `/` at either end, the way a sidebar names a folder. */
function toDirectoryPath(path: string): string {
  return `/${path}/`.replace(/\/{2,}/g, '/');
}

/**
 * Collects the folder items marked with `SPLIT_FOLDER_KEY`, in the order they
 * appear in, and removes the mark from them.
 */
function takeSplitFolders(items: SidebarListItem): { dirPath: string; item: SidebarListItem }[] {
  const splitFolders: { dirPath: string; item: SidebarListItem }[] = [];

  const takeFromLevel = (levelItems: SidebarListItem): void => {
    for (let i = 0, len = levelItems.length; i < len; i += 1) {
      const item = levelItems[i];

      if (item[SPLIT_FOLDER_KEY]) {
        splitFolders.push({ dirPath: item[SPLIT_FOLDER_KEY], item });

        delete item[SPLIT_FOLDER_KEY];
      }

      if (item.items) {
        takeFromLevel(item.items);
      }
    }
  };

  takeFromLevel(items);

  return splitFolders;
}

/**
 * Makes the source of a sidebar for every folder that the sidebar just built
 * from `options` gave a sidebar of its own, in the order the folders appear in.
 *
 * `sidebarLink` is where the new sidebars link back to, and `splitRealPaths`
 * holds the real path of every folder that already has a sidebar.
 */
function createFolderSidebarSources({
  items,
  inlineOptions,
  options,
  scanDir,
  documentRootDir,
  sidebarLink,
  splitRealPaths
}: {
  items: SidebarListItem;
  inlineOptions: VitePressSidebarOptions;
  options: VitePressSidebarOptions;
  scanDir: string;
  documentRootDir: string;
  sidebarLink: string;
  splitRealPaths: Set<string>;
}): SidebarSource[] {
  const base = options.basePath || options.resolvePath || '/';
  const resolvePath = toDirectoryPath(options.resolvePath || '/');
  const basePath = options.basePath ? toDirectoryPath(options.basePath) : null;
  // A folder is served without its prefix once `rewrites` move its pages, so
  // its sidebar has to be resolved there too.
  const removePrefix = options.removePrefixFromLink
    ? createPrefixRemover(options.prefixSeparator!)
    : null;
  const sources: SidebarSource[] = [];

  takeSplitFolders(items).forEach(({ dirPath, item }) => {
    const realPath = toRealPath(dirPath) ?? dirPath;

    // A symbolic link can lead back to a folder that already has a sidebar,
    // and following it would make sidebars without end.
    if (splitRealPaths.has(realPath)) {
      return;
    }

    splitRealPaths.add(realPath);

    const folderPath = toPosixPath(relative(scanDir, dirPath));
    const folderUrlPath = removePrefix
      ? removePrefixFromPath(folderPath, removePrefix)
      : folderPath;
    const folderResolvePath = `${resolvePath}${folderUrlPath}/`;

    sources.push({
      inlineOptions,
      split: {
        overrides: {
          scanStartPath: toPosixPath(relative(documentRootDir, dirPath)),
          resolvePath: folderResolvePath,
          ...(basePath ? { basePath: `${basePath}${folderUrlPath}/` } : {}),
          // The folder opens on its `index.md`, which nothing else in its own
          // sidebar links to.
          includeRootIndexFile: true,
          rootGroupText: item.text,
          rootGroupLink: sidebarLink
        },
        folderLink: item.link ? toAbsoluteLink(item.link, base) : folderResolvePath
      }
    });
  });

  return sources;
}

/**
 * Builds the sidebar, and returns it together with the options it was built
 * with once the configuration files and the defaults have been applied.
 *
 * `srcExcludePatterns` holds the `srcExclude` of the VitePress configuration,
 * which only `withSidebar` is able to read. It is a parameter instead of an
 * option because it belongs to VitePress rather than to the sidebar, and it is
 * never something the user of this function sets.
 */
function buildSidebar(
  options?: VitePressSidebarOptions | VitePressSidebarOptions[],
  srcExcludePatterns?: string[]
): { sidebar: Sidebar; optionItems: VitePressSidebarOptions[] } {
  // Several options read something from the same file, and the files of the
  // previous build may have changed since, so every build starts and ends
  // without anything left over from another one.
  clearMarkdownFileCache();
  clearReportedWarnings();

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
  // Shared by every sidebar, because two pages left at the same path collide
  // whichever sidebars their menu items are in.
  const pagePathsWithoutPrefix = new Map<string, string>();
  // Only a configuration file in the current working directory may declare
  // `documentRootPath`, because the document root decides which of the other
  // configuration files are read.
  const projectRootConfig = readConfigFile(cwd, true);
  let detectedDocumentRootPath: string | null | undefined;
  // The sidebars that `splitSidebarByFolder` makes are added at the end while
  // the ones before them are built, so every sidebar the options describe is
  // built before the first one a split makes.
  const sources: SidebarSource[] = optionItems.map((inlineOptions) => ({
    inlineOptions: inlineOptions!
  }));
  const passedSidebarPaths = new Set<string>();
  const splitRealPaths = new Set<string>();
  let hasSplitSidebar = false;

  for (let i = 0; i < sources.length; i += 1) {
    const { inlineOptions, split } = sources[i];
    const splitOverrides = split?.overrides ?? {};

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
    const rootPathConfig = mergeConfigFilesInPath(cwd, documentRootPath, false);

    // Said once for the options passed, and not again for every sidebar a
    // split makes from them.
    if (
      !split &&
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
      documentRootPath,
      ...splitOverrides
    };

    if (optionItem.scanStartPath) {
      optionItem = {
        ...optionItem,
        ...mergeConfigFilesInPath(join(cwd, documentRootPath), optionItem.scanStartPath, true),
        ...splitOverrides
      };
    }

    // Exceptions for changed option names
    if (
      isTrueAtLeast(
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
      isTrueAtLeast(
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
      isTrueAtLeast(
        [optionItem.sortMenusByFrontmatterOrder, optionItem.sortMenusByFrontmatterDate],
        2
      )
    ) {
      throw new Error(
        generateNotTogetherMessage(['sortMenusByFrontmatterOrder', 'sortMenusByFrontmatterDate'])
      );
    }
    // An omitted `prefixSeparator` takes its default, so only a value that was
    // written down and is empty is an error. The check runs before the defaults
    // are applied, which is what told the two apart.
    if (
      (optionItem.removePrefixAfterOrdering || optionItem.removePrefixFromLink) &&
      optionItem.prefixSeparator !== undefined &&
      !optionItem.prefixSeparator
    ) {
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
    const resolvePathKey = resolvedOptionItem.resolvePath || '/';

    // A sidebar passed for a path is kept over the one a split makes for the
    // same path, and nothing is said about it: the split only fills in the
    // folders that have no sidebar of their own. Compared as folders, because
    // `/api` is written for the same pages as `/api/`.
    if (split && passedSidebarPaths.has(toDirectoryPath(resolvePathKey))) {
      continue;
    }

    if (!split) {
      passedSidebarPaths.add(toDirectoryPath(resolvePathKey));
    }

    resolvedOptionItems.push(resolvedOptionItem);

    let scanPath = resolvedOptionItem.documentRootPath!;

    if (resolvedOptionItem.scanStartPath) {
      scanPath = `${resolvedOptionItem.documentRootPath}/${resolvedOptionItem.scanStartPath}`
        .replace(/\/{2,}/g, '/')
        .replace(/\/$/, '');
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

    const scanDir = join(cwd, scanPath);

    // Every path is resolved from the current working directory, which is the
    // one thing a mistyped `documentRootPath` never mentions. Without this the
    // build stops at a bare `ENOENT: scandir`, naming neither the option that
    // is wrong nor what it was resolved against.
    if (!existsSync(scanDir)) {
      throw new Error(
        `The path to scan does not exist: '${scanDir}'. It is built from 'documentRootPath'` +
          `${resolvedOptionItem.scanStartPath ? ` and 'scanStartPath'` : ''}, resolved from the ` +
          `current working directory ('${cwd}').`
      );
    }

    let sidebarResult: SidebarListItem = generateSidebarItem(
      1,
      scanDir,
      scanPath,
      null,
      resolvedOptionItem,
      optionItem,
      routeNode,
      srcExclude
    );

    if (resolvedOptionItem.removePrefixAfterOrdering || resolvedOptionItem.removePrefixFromLink) {
      sidebarResult = removePrefixFromTitleAndLink(
        sidebarResult,
        resolvedOptionItem,
        resolvedOptionItem.removePrefixFromLink
          ? createLinkCollisionCheck(resolvedOptionItem, pagePathsWithoutPrefix)
          : undefined
      );
    }

    const base = resolvedOptionItem.basePath || resolvedOptionItem.resolvePath || '/';

    if (resolvedOptionItem.splitSidebarByFolder) {
      hasSplitSidebar = true;

      splitRealPaths.add(toRealPath(scanDir) ?? scanDir);

      sources.push(
        ...createFolderSidebarSources({
          items: sidebarResult,
          inlineOptions,
          options: resolvedOptionItem,
          scanDir,
          documentRootDir,
          // A sidebar the options describe links back to where its own root
          // group does, or to the folder it is resolved to.
          sidebarLink:
            split?.folderLink ??
            (resolvedOptionItem.rootGroupLink
              ? toAbsoluteLink(resolvedOptionItem.rootGroupLink, base)
              : toDirectoryPath(resolvePathKey)),
          splitRealPaths
        })
      );
    }

    // Two sidebars resolving to the same path are one sidebar, and the work
    // done for the earlier one is thrown away without anything to show for it.
    if (Object.hasOwn(sidebar, resolvePathKey)) {
      process.stderr.write(
        `[vitepress-sidebar] More than one sidebar resolves to '${resolvePathKey}', so only the last of them is used.\n`
      );
    }

    const withRootGroup =
      resolvedOptionItem.rootGroupText ||
      resolvedOptionItem.rootGroupLink ||
      resolvedOptionItem.rootGroupCollapsed === true ||
      resolvedOptionItem.rootGroupCollapsed === false;

    sidebar[resolvePathKey] = {
      base,
      items: withRootGroup
        ? [
            {
              // The default belongs here rather than to the other defaults: a
              // root group is only made when one of its options asks for one,
              // and a name given to every option set would ask for one always.
              text: resolvedOptionItem.rootGroupText ?? ROOT_GROUP_DEFAULT_TEXT,
              ...(resolvedOptionItem.rootGroupLink
                ? { link: resolvedOptionItem.rootGroupLink }
                : {}),
              items: sidebarResult as SidebarItem[],
              ...(resolvedOptionItem.rootGroupCollapsed === null
                ? {}
                : { collapsed: resolvedOptionItem.rootGroupCollapsed })
            }
          ]
        : (sidebarResult as SidebarItem[])
    };
  }

  let sidebarResult;

  // A split sidebar resolves its links to a path even when it is the only one
  // it makes, so it has to be returned with the base that path gives them.
  if (!isMultipleSidebars && !hasSplitSidebar && Object.keys(sidebar).length === 1) {
    // Single sidebar
    sidebarResult = Object.values(sidebar)[0].items;
  } else {
    // Multiple sidebars. A sidebar holding a link that is not relative to its
    // base gets every other link resolved against the base instead, and no base
    // that VitePress would put in front of that link.
    Object.entries(sidebar as SidebarMulti).forEach(([path, { base, items }]) => {
      if (hasLinkNotRelativeToBase(items)) {
        (sidebar as SidebarMulti)[path] = {
          base: '',
          items: resolveLinksAgainstBase(items, base)
        };
      }
    });

    sidebarResult = sidebar;
  }

  if (enableDebugPrint) {
    debugPrint(resolvedOptionItems, sidebarResult);
  }

  clearMarkdownFileCache();
  clearReportedWarnings();

  return { sidebar: sidebarResult, optionItems: resolvedOptionItems };
}

function isSamePrefixSeparator(a: string | RegExp, b: string | RegExp): boolean {
  if (a instanceof RegExp && b instanceof RegExp) {
    // Only the first match is ever removed, so the global flag makes no
    // difference to what two expressions remove.
    return a.source === b.source && a.flags.replace(/g/g, '') === b.flags.replace(/g/g, '');
  }

  return a === b;
}

/**
 * Creates the `rewrites` that serve every page under a sidebar enabling
 * `removePrefixFromLink` at the path its link points at, or returns `null`
 * when no sidebar enables it.
 *
 * A page path is read relative to `documentRootPath`, the way `srcExclude` is,
 * and a page belongs to a sidebar when it sits below its `scanStartPath`. A
 * page left out of the sidebar is rewritten too, so every page of the folder
 * follows the same rule. The `rewrites` of the VitePress configuration come
 * first and see the paths as they are on disk, and the prefix is removed from
 * the path they return.
 */
function createPrefixRewrites(
  optionItems: VitePressSidebarOptions[],
  userRewrites: UserConfig['rewrites']
): ((id: string) => string) | null {
  const enabledOptionItems = optionItems.filter((optionItem) => optionItem.removePrefixFromLink);

  if (enabledOptionItems.length < 1) {
    return null;
  }

  const prefixSeparator = enabledOptionItems[0].prefixSeparator!;

  // VitePress takes a single `rewrites`, so a page under two sidebars would
  // be rewritten with one separator while the links of the other one were
  // built with another.
  if (
    enabledOptionItems.some(
      (optionItem) => !isSamePrefixSeparator(optionItem.prefixSeparator!, prefixSeparator)
    )
  ) {
    throw new Error(
      `Every sidebar that enables 'removePrefixFromLink' must use the same 'prefixSeparator', because one 'rewrites' serves the pages of all of them.`
    );
  }

  // An object is matched by VitePress with rules of its own, which cannot be
  // run here to find out what it would return.
  if (userRewrites && typeof userRewrites !== 'function') {
    throw new Error(
      `'removePrefixFromLink' adds a 'rewrites' function to the VitePress configuration, and cannot combine it with 'rewrites' written as an object. Write your 'rewrites' as a function instead.`
    );
  }

  const rewriteFirst = typeof userRewrites === 'function' ? userRewrites : null;
  const removePrefix = createPrefixRemover(prefixSeparator);
  const scanStartPaths = enabledOptionItems.map((optionItem) => optionItem.scanStartPath ?? '');
  const isCovered = (id: string): boolean =>
    scanStartPaths.some((scanStartPath) => !scanStartPath || id.startsWith(`${scanStartPath}/`));

  return (id) => {
    // VitePress leaves a page where it is when a function returns nothing.
    const rewrittenId = rewriteFirst?.(id) || id;

    return isCovered(id) ? removePrefixFromPath(rewrittenId, removePrefix) : rewrittenId;
  };
}

export function generateSidebar(
  options?: VitePressSidebarOptions | VitePressSidebarOptions[]
): Sidebar {
  if (arguments.length > 1) {
    throw new Error(`You must pass 1 argument, see the documentation for details.`);
  }

  // Called without the VitePress configuration, so there is no `srcExclude` to
  // honor. Only `withSidebar` is able to read it.
  return buildSidebar(options).sidebar;
}

export function withSidebar(
  vitePressOptions: UserConfig,
  sidebarOptions?: VitePressSidebarOptions | VitePressSidebarOptions[]
): Partial<UserConfig> {
  // Neither the VitePress configuration nor the options belong to this
  // function, so nothing below writes to either of them. VitePress evaluates
  // its configuration again on every restart of the dev server, and a change
  // made here would be carried into the next evaluation.
  const optionItems: VitePressSidebarOptions[] =
    sidebarOptions === undefined
      ? [{}]
      : Array.isArray(sidebarOptions)
        ? sidebarOptions
        : [sidebarOptions];

  // The sidebar is printed here, together with the configuration it was merged
  // into, so the build is asked not to print it a second time on its own.
  const enableDebugPrint = optionItems.some((optionItem) => optionItem?.debugPrint);
  const withoutDebugPrint = (optionItem: VitePressSidebarOptions): VitePressSidebarOptions => ({
    ...optionItem,
    debugPrint: false
  });
  let buildOptions = sidebarOptions;

  if (enableDebugPrint) {
    buildOptions = Array.isArray(sidebarOptions)
      ? sidebarOptions.map(withoutDebugPrint)
      : withoutDebugPrint(sidebarOptions ?? {});
  }

  // A page excluded by `srcExclude` is never built, so an item generated for it
  // would link nowhere. The patterns are inherited instead of having to be
  // repeated in the options of the sidebar, and apply on top of them.
  const { sidebar, optionItems: resolvedOptionItems } = buildSidebar(
    buildOptions,
    vitePressOptions?.srcExclude
  );
  const sidebarResult: Partial<UserConfig> = {
    themeConfig: {
      sidebar
    }
  };

  // A sidebar already in the configuration is replaced by the generated one,
  // which merging alone would not do.
  const baseOptions: UserConfig = vitePressOptions?.themeConfig?.sidebar
    ? {
        ...vitePressOptions,
        themeConfig: { ...vitePressOptions.themeConfig, sidebar: {} }
      }
    : vitePressOptions;

  const result: Partial<UserConfig> = objMergeWithArrays(baseOptions, sidebarResult) as UserConfig;

  // Inject a Vite plugin that restarts the dev server when Markdown files
  // are added or removed inside any `documentRootPath`. This allows the
  // sidebar to refresh in dev mode without manually restarting the server.
  // The plugin list is rebuilt rather than appended to, because merging leaves
  // it as the very array the caller passed in, and appending to that would add
  // one more plugin on every evaluation of the configuration.
  const hmrPlugin = createSidebarHmrPlugin(sidebarOptions);
  const viteConfig = (result.vite ?? {}) as { plugins?: unknown[] };

  result.vite = {
    ...viteConfig,
    plugins: [...(viteConfig.plugins ?? []), hmrPlugin]
  } as UserConfig['vite'];

  // A link without its prefix points at a page that VitePress only serves
  // there once it is rewritten. Read from the options the sidebar was built
  // with, because a configuration file may be what enables the option.
  const prefixRewrites = createPrefixRewrites(resolvedOptionItems, vitePressOptions?.rewrites);

  if (prefixRewrites) {
    result.rewrites = prefixRewrites;
  }

  if (enableDebugPrint) {
    debugPrint(sidebarOptions, result);
  }

  return result;
}
