---
order: 2
---

# API

This page describes all the options in the VitePress Sidebar.

## @ Quick search

| Resolving Paths                       | Grouping                                  |
| ------------------------------------- | ----------------------------------------- |
| [documentRootPath](#documentrootpath) | [collapsed](#collapsed)                   |
| [scanStartPath](#scanstartpath)       | [collapseDepth](#collapsedepth)           |
| [resolvePath](#resolvepath)           | [rootGroupText](#rootgrouptext)           |
| [basePath](#basepath)                 | [rootGroupLink](#rootgrouplink)           |
|                                       | [rootGroupCollapsed](#rootgroupcollapsed) |

| Getting Menu Title | Getting Menu Link |
| --- | --- |
| [useTitleFromFileHeading](#usetitlefromfileheading) | [convertSameNameSubFileToGroupIndexPage](#convertsamenamesubfiletogroupindexpage) |
| [useTitleFromFrontmatter](#usetitlefromfrontmatter) | [folderLinkNotIncludesFileName](#folderlinknotincludesfilename) |
| [useFolderTitleFromIndexFile](#usefoldertitlefromindexfile) | [useFolderLinkFromIndexFile](#usefolderlinkfromindexfile) |
| [frontmatterTitleFieldName](#frontmattertitlefieldname) |  |

| Include/Exclude | Styling Menu Title |
| --- | --- |
| [excludePattern](#excludepattern) | [hyphenToSpace](#hyphentospace) |
| [excludeFiles](#excludefiles) | [underscoreToSpace](#underscoretospace) |
| [excludeFilesByFrontmatterFieldName](#excludefilesbyfrontmatterfieldname) | [capitalizeFirst](#capitalizefirst) |
| [excludeFolders](#excludefolders) | [capitalizeEachWords](#capitalizeeachwords) |
| [includeDotFiles](#includedotfiles) | [keepMarkdownSyntaxFromTitle](#keepmarkdownsyntaxfromtitle) |
| [includeEmptyFolder](#sortmenusbyfrontmatterdate) | [removePrefixAfterOrdering](#removeprefixafterordering) |
| [includeRootIndexFile](#sortmenusbyfrontmatterdate) | [prefixSeparator](#prefixseparator) |
| [includeFolderIndexFile](#sortmenusbyfrontmatterdate) |  |

| Sorting | Misc |
| --- | --- |
| [manualSortFileNameByPriority](#manualsortfilenamebypriority) | [debugPrint](#debugprint) |
| [sortMenusByName](#sortmenusbyname) |  |
| [sortMenusByFileDatePrefix](#sortmenusbyfiledateprefix) |  |
| [sortMenusByFrontmatterOrder](#sortmenusbyfrontmatterorder) |  |
| [frontmatterOrderDefaultValue](#frontmatterorderdefaultvalue) |  |
| [sortMenusByFrontmatterDate](#sortmenusbyfrontmatterdate) |  |
| [sortMenusOrderByDescending](#sortmenusorderbydescending) |  |
| [sortMenusOrderNumericallyFromTitle](#sortmenusordernumericallyfromtitle) |  |
| [sortMenusOrderNumericallyFromLink](#sortmenusordernumericallyfromlink) |  |

## `documentRootPath`

- Type: `string`
- Default: `'/'`

The top-level path where documentation files are located. The default value is `/`.

This is the path where the `.vitepress` directory is located, and if the folder where the documentation is located in the project root is `/docs`, then the value of this option should be set to `docs` or `/docs`.

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/        <------ VitePress config directory
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

## `scanStartPath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

The path to the root directory to scan for document lists. Files in the path set in `documentRootPath` outside the path set in `scanStartPath` will not be scanned. It is recommended that you also set `documentRootPath` if you specify `scanStartPath` because the parent path set in `documentRootPath` should appear in the `link`.

For example, if the root path is `/docs` and the document to be scanned is `/docs/sub-dir/scan-me`, the setting would look like this:

- `documentRootPath`: `/docs`,
- `scanStartPath`: `sub-dir/scan-me` (Do not include the path to `documentRootPath`.)

## `resolvePath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

Enter the path to the section to display a different sidebar for each path. The path must contain `/` before it. Options without this value will be set to the root section (`/`).

e.g. `/`, `/path/sub-path`, `/guide/`...

## `basePath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

This option can be utilized if the path has changed due to VitePress's rewrite option. It replaces the base path in VitePress. If this value does not exist, it will use the value from `resolvePath` instead.

## `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title with the `h1` heading content of the `.md` file. If the `h1` heading does not exist in the file, it displays `Unknown`.

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `useTitleFromFrontmatter`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title based on the value of `title` in `Frontmatter` in the file. If this value cannot be parsed, it will be taken from the `h1` tag if the `useTitleFromFileHeading` option is `true`, and from the filename if that fails.

The `Frontmatter` should be located at the top of the document, and should look like this (Space is required between the `title:` value and the title.)

```markdown
---
title: Hello World
---
```

## `frontmatterTitleFieldName`

- Type: `string`
- Default: `title`

Displays the menu title based on the key name in Frontmatter specified in the file. If the specified value does not exist in Frontmatter, the default `title` will be used as a fallback.

```markdown
---
name: This is frontmatter title value.
---
```

For more information, see the following articles: https://vitepress.dev/guide/frontmatter

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `useFolderTitleFromIndexFile`

- Type: `boolean`
- Default: `false`

If this value is `true`, use the information in the current folder's `index.md` file to get the menu name. If the `index.md` file does not exist, the folder name is used. Since we typically get the name `index` from the `index.md` file, we recommend using the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options together to get the title from the Markdown header or Frontmatter of that file.

The `index.md` file is hidden from the sidebar menu, but the index file can be shown in the menu if the `includeFolderIndexFile` option is `true`.

## `useFolderLinkFromIndexFile`

- Type: `boolean`
- Default: `false`

If this value is `true`, specifies a link to the folder so that you can navigate to the `index.md` file in the current folder. If the `index.md` file does not exist, no link is created.

The `index.md` file is hidden from the sidebar menu, but the index file can be shown in the menu if the `includeFolderIndexFile` option is `true`.

## `manualSortFileNameByPriority`

- Type: `Array<string>`
- Default: `[]`

Sort by an array of file names (including extensions) in order. If there is no value in the array that matches the filename, the sort priority is sent back. This applies to both files and directories, and the same arrangement rules apply to subdirectories as well.

## `sortMenusByName`

- Type: `boolean`
- Default: `false`

Sort the items in the menu item by name. Normally, folder scans are done with an ascending name sort, so the default sort is applied without this option applied, but if you use the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options, you may need to re-sort by name because the menu name changes. This option forces sorting by name even for changed menu names.

## `sortMenusByFileDatePrefix`

- Type: `boolean`
- Default: `false`

If the value is `true`, sorts by date prefix in the name of the menu item. The date format must be in the form `YYYY-MM-DD` (e.g. `2024-01-01-menu-name`, `2024-01-02.menu-name`...)

To remove date prefixes that remain in the menu text afterward, you can utilize the `prefixSeparator` and `removePrefixAfterOrdering` options.

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `sortMenusByFrontmatterOrder`

- Type: `boolean`
- Default: `false`

Sorts the menu items by the `order` property of the frontmatter. For each folder, sorts the value (number) of the `order` property in ascending order, or descending order if the `sortMenusOrderByDescending` option is `true`. If the value of `order` is non-numeric or does not exist, `order` is judged to be `0`.

## `sortMenusByFrontmatterDate`

- Type: `boolean`
- Default: `false`

Sorts the menu items by the `date` property of the frontmatter. It also sorts the `date` property values in ascending order by oldest date (or descending order if the `sortMenusOrderByDescending` option is `true`) The date format must match `YYYY-MM-DD` or the JavaScript Date data type.

## `sortMenusOrderByDescending`

- Type: `boolean`
- Default: `false`

If this value is `true`, sorts the items in the menu item in descending order. This option is only enabled when `sortMenusByName` or `sortMenusByFrontmatterOrder` is `true`.

## `sortMenusOrderNumericallyFromTitle`

- Type: `boolean`
- Default: `false`

If this value is `true`, If a menu name contains a number at the beginning, it is sorted by the lower number, not the name. For example, if you have files named `1-a`, `10-a`, and `2-a`, a normal sort would sort by name, `['1-a', '10-a', '2-a']`. This causes the menu to display in an unintended order because `10-a` takes precedence over `2-a`.

With this option, they are sorted as follows: `['1-a', '2-a', '10-a']`

It should be used with the `sortMenusOrderByDescending` option if you want a descending sort.

## `sortMenusOrderNumericallyFromLink`

- Type: `boolean`
- Default: `false`

If this value is `true`, If a menu name contains a number at the beginning, it is sorted by the lower number, not the name. This option is the same as `sortMenusOrderNumericallyFromTitle`, but sorts by links instead of file titles. Therefore, it cannot be used with the `sortMenusOrderNumericallyFromTitle` option.

It should be used with the `sortMenusOrderByDescending` option if you want a descending sort.

## `frontmatterOrderDefaultValue`

- Type: `number`
- Default: `0`

Sets the default value for the `order` property of the frontmatter when not set. This option is only enabled when `sortMenusByFrontmatterOrder` is `true`.

## `collapsed`

- Type: `boolean`
- Default: `false`

If the `collapsed` option is not specified(`null` or `undefined`), group collapse/expand is not used and all menus are displayed at once. If `false`, the menu is created with all groups expanded. If `true`, the menu is created with all groups collapsed.

(Even if the value is `true`, the menu may be expanded if it is located in a document within a collapsed group.)

![Collapsed Example](/doc-collapsed-example.png)

## `collapseDepth`

- Type: `number`
- Default: `1`

At the specified depth, the menu group is made collapsed. When this option is specified, group collapsing/expanding is automatically enabled. The depth of the top-level folder is `1`.

## `hyphenToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `-` symbol included in the file name is converted to a space and displayed as a title. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `underscoreToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `_` symbol included in the file name is converted to a space and displayed as a title. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `capitalizeFirst`

- Type: `boolean`
- Default: `false`

If the value is `true`, the first letter of the menu name is forced to uppercase. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `capitalizeEachWords`

- Type: `boolean`
- Default: `false`

If the value is `true`, Capitalize all first letters of words separated by spaces. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `excludePattern`

- Type: `Array<string>`
- Default: `[]`

[glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) Exclude files or folders based on an array of file pattern strings.

For example, the value might look like this: `['abc/', 'def.md', 'ghi/file-**']` This would exclude the `abc` directory and subdirectories in all paths, the `def.md` file, and files starting with `file-` in the `ghi` path, respectively, and these files and folders would be excluded from the menu.

## `excludeFiles` (deprecated)

- Type: `Array<string>`
- Default: `[]`

### This option is deprecated and will be removed in the next major version. Use the `excludePattern` option instead.

Files that correspond to an array of file names (including extensions) are not shown in the list.

## `excludeFilesByFrontmatterFieldName`

- Type: `string|null`
- Default: `null`

Documents with the value of the specified frontmatter field name set to `true` are excluded from the menu.

If no option is specified or the option value is undefined, it is ignored.

For example, if the option value is `exclude`, documents whose content contains `exclude: true` are not displayed in the menu.

```markdown
---
title: This article is excluded.
exclude: true
---

# Article

Content
```

Depending on the value of this option, you can use other names like `draft`, `hide`, etc. instead of `exclude`.

## `excludeFolders` (deprecated)

- Type: `Array<string>`
- Default: `[]`

### This option is deprecated and will be removed in the next major version. Use the `excludePattern` option instead.

Folders that correspond to an array of folder names are not shown in the list, and any sub-items within a folder are also not shown.

## `includeDotFiles`

- Type: `boolean`
- Default: `false`

Normally, if file and folder names contain a dot (`.`) in front of them, they are considered hidden and not shown in the list. However, if this option is `true`, it forces all hidden files and folders to be shown in the list.

## `includeEmptyFolder`

- Type: `boolean`
- Default: `false`

If the value is `true`, also displays directories where no md file exists as a group.

## `includeRootIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the top-level path `index.md` file in the sidebar menu. Use the `includeFolderIndexFile` option to include the index file of the child items as well. (If the file does not exist, it is ignored.)

## `includeFolderIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the folder path `index.md` file in the sidebar menu. Use the `includeRootIndexFile` option to include the index file of the root item as well. (If the file does not exist, it is ignored.)

## `removePrefixAfterOrdering`

- Type: `boolean`
- Default: `false`

Removes a specific prefix from each menu title from the menu items that appear after everything is done. This is ideal if you want to sort by the number in the filename without using frontmatter's sorting, and you don't want that number to be visible in the menu.

For example, if `prefixSeparator` is the default (`.`), the following menus will be renamed as follows:

- File name: `1.hello` -> Menu name: `hello`
- File name: `1.1.hello` -> Menu name: `1.hello`
- File name: `1-1.hello` -> Menu name: `hello`

Removes letters only once based on the separator, so a child item like `1.1.` should be used like `1-1.`. Alternatively, you can set a regular expression on the `prefixSeparator` value to work around it.

Can be used with the `prefixSeparator` option. See that option's description for more information.

(Note A: prefix only affects the title, the link will use the file link as it is).

(Note B: This option is ignored if you use the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options).

## `prefixSeparator`

- Type: `string|RegExp`
- Default: `'.'`

This option can only be used in conjunction with the `removePrefixAfterOrdering` option to remove the prefix.

Removes the first part of a specified number of characters (at least one) from the extracted menu text. For example, if the menu name is `1. Text`, and you set the `prefixSeparator` value to `. `, the result will be just `Text`.

You can also use regular expressions. Values matching the regular expression are removed. For example, to remove the date before the string in `2024-01-01-hello`, specify the `prefixSeparator` value as `/[0-9]{4}-[0-9]{2}-[0-9]{2}-/g`. The result is `hello`.

## `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

rootGroup specifies the entire group for the menu, regardless of directory structure. This uses one menu step, so you should be careful about using it, and you can disable the rootGroup option if you don't need it. If you specify this value, you specify a name for the top-level menu.

## `rootGroupLink`

- Type: `string`
- Default: `null`

For more information about rootGroup, see the `rootGroupText` option description. Specifying this value specifies a link to the rootGroup. If the value is empty, no link is added.

## `rootGroupCollapsed`

- Type: `boolean`
- Default: `null`

For more information about rootGroup, see the `rootGroupText` option description. The `rootGroupCollapsed` option sets whether child items of the root group are expanded or not. If specified with the default value of `null` or `undefined`, the expand/collapse button is not displayed. If the value is `true`, the child items are displayed collapsed, and if `false`, they are expanded.

This option only applies to top-level item. For general item collapsibility, see the `collapsed` option.

## `convertSameNameSubFileToGroupIndexPage`

- Type: `boolean`
- Default: `false`

If this value is `true`, then if a subfile with the same name as the folder exists, a link will be created in the folder to navigate to that file, and the file will not be displayed in the child item.

For example, if you have a folder that looks like this:

```
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

A link is added to the `api` folder, and the `api` page in the `api` folder is not included in the menu listing. Clicking the link in the folder displays the file in `api/api.md`.

## `folderLinkNotIncludesFileName`

- Type: `boolean`
- Default: `false`

This option is only used in special cases: when you have a rewrite rule and a subfile with the same folder name exists, use it in parallel with the `convertSameNameSubFileToGroupIndexPage` option.

If this value is `true`, when establishing a folder link, ignore the existence of child items and specify the link only as a folder path.

For example, if you have a folder that looks like this:

```
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

With the `convertSameNameSubFileToGroupIndexPage` option, clicking on the guide/api folder menu will take you to `guide/api/api`, but if you use the `folderLinkNotIncludesFileName` option with it, the link will be `guide/api/`.

## `keepMarkdownSyntaxFromTitle`

- Type: `boolean`
- Default: `false`

If this value is `true`, preserves the Markdown syntax contained in the title text without removing it. Usually retains any highlighting or inline code. Hyperlink text is removed regardless of this option.

## `debugPrint`

- Type: `boolean`
- Default: `false`

If this value is `true`, prints the objects created after execution to the console log. If you configured Multiple sidebars, it will output all sidebar results even if you only include one of the options.
