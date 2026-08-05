// Every option below can also be used in a `sidebar.config.json` file, so
// adding or removing one here requires updating `OPTION_SPECS` in
// `config-file.ts`. The compiler reports it when the two go out of sync.
export declare interface VitePressSidebarOptions {
  documentRootPath?: string;
  scanStartPath?: string;
  resolvePath?: string;
  basePath?: string;
  collapsed?: boolean | null | undefined;
  collapseDepth?: number;
  collapseFromLevel?: number;
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
  useFolderLinkFromSameNameSubFile?: boolean;
  includeDotFiles?: boolean;
  folderLinkNotIncludesFileName?: boolean;
  includeEmptyFolder?: boolean;
  sortMenusByName?: boolean;
  sortMenusByFileCreateDate?: boolean;
  sortMenusByFileModifyDate?: boolean;
  sortMenusByFrontmatterOrder?: boolean;
  sortMenusByFrontmatterDate?: boolean;
  sortMenusByFileDatePrefix?: boolean;
  sortMenusOrderByDescending?: boolean;
  sortMenusOrderNumericallyFromTitle?: boolean;
  sortMenusOrderNumericallyFromLink?: boolean;
  sortFolderTo?: null | undefined | 'top' | 'bottom';
  keepMarkdownSyntaxFromTitle?: boolean;
  debugPrint?: boolean;
  manualSortFileNameByPriority?: string[];
  excludeByFolderDepth?: number;
  excludeByGlobPattern?: string[];
  excludeFilesByFrontmatterFieldName?: string;
  followSymlinks?: boolean;
  removePrefixAfterOrdering?: boolean;
  prefixSeparator?: string | RegExp;
  rootGroupText?: string;
  rootGroupLink?: string;
  rootGroupCollapsed?: boolean | null | undefined;
  frontmatterOrderDefaultValue?: number;
  frontmatterTitleFieldName?: string;
  /**
   * @deprecated `excludePattern` has renamed `excludeByGlobPattern`. This option will be removed in a future version.
   */
  excludePattern?: string[];
}

// Every key below can be used under the `$folder` key of a
// `sidebar.config.json`, so adding or removing one here requires updating
// `FOLDER_META_SPECS` in `config-file.ts`. The compiler reports it when the
// two go out of sync.
export declare interface VitePressSidebarFolderMeta {
  order?: number;
  text?: string;
  link?: string;
}

export declare interface SidebarListItem {
  [key: string]: any;
}

export declare interface SortByObjectKeyOptions {
  arr: SidebarListItem;
  key: string;
  desc?: boolean;
  numerically?: boolean;
  datePrefixSeparator?: string | RegExp;
  dateSortFromFrontmatter?: boolean;
  dateSortFromTextWithPrefix?: boolean;
}

export declare type AnyValueObject = { [key: string]: any };

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
 * END
 */
