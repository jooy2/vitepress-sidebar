export declare interface VitePressSidebarOptions {
  documentRootPath?: string;
  scanStartPath?: string;
  resolvePath?: string;
  basePath?: string;
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
  useFolderLinkFromSameNameSubFile?: boolean;
  includeDotFiles?: boolean;
  folderLinkNotIncludesFileName?: boolean;
  includeEmptyFolder?: boolean;
  sortMenusByName?: boolean;
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
  excludePattern?: string[];
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
   * @deprecated use `excludePattern` option instead. This option will be removed in a future version.
   */
  excludeFiles?: string[];
  /**
   * @deprecated use `excludePattern` option instead. This option will be removed in a future version.
   */
  excludeFolders?: string[];
  /**
   * @deprecated use `useFolderLinkFromSameNameSubFile` instead. This option will be removed in a future version.
   */
  convertSameNameSubFileToGroupIndexPage?: boolean;
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
