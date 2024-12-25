# Changelog

## 1.31.0 (--)

- **BREAKING CHANGES**: The `excludeFiles` and `excludeFolders` options have now been completely removed and replaced with `excludePattern`.

## 1.30.2 (2024-12-07)

- Fix import of type declaration files

## 1.30.1 (2024-12-07)

NOTE: This version is broken. Please use `1.30.2` or later.

- Fix critical import issue

## 1.30.0 (2024-12-06)

NOTE: This version is broken. Please use `1.30.2` or later.

- **BREAKING CHANGES**: The type declarations have been separated into a separate file, which you may need to import from the 'vitepress-sidebar/types' file. In general, to use a type, use it like this: `import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'`. You may also need to change the value of `moduleResolution` in the `tsconfig.json` file to: `nodenext` or `node16` or `Bundler`

```typescript
// Before
import { withSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
// After
import { withSidebar } from 'vitepress-sidebar';
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types';
```

- **BREAKING CHANGES**: The functions in the source file have now been split into multiple files. If you imported the module as follows, you will need to modify your code. (`import VitePressSidebar from 'vitepress-sidebar'` -> `import * as VitePressSidebar from 'vitepress-sidebar'`) You can ignore this if you've used something like `import { withSidebar } from 'vitepress-sidebar'` or `import { generateSidebar } from 'vitepress-sidebar'`, unless it's a special case.
- Fix issues with invalid build files

## 1.29.1 (2024-12-06)

- Removes the top-level path from the link path only at the first depth. (#186)

## 1.29.0 (2024-11-01)

- Introduces the `withSidebar` function. It can be used instead of `generateSidebar` and can be declared at the `defineConfig` level instead of the `themeConfig.sidebar` level. You can still use `generateSidebar` going forward, but we recommend using `withSidebar` for easier setup.

## 1.28.0 (2024-10-25)

- Not using numbers as separators in `capitalizeEachWords` (#185)
- **BREAKING CHANGES**: `convertSameNameSubFileToGroupIndexPage` option was renamed to `useFolderLinkFromSameNameSubFile` (#184)
- **BREAKING CHANGES**: Some deprecated options have been removed entirely: `excludeFilesByFrontmatter`, `sortMenusOrderNumerically`, `sortByFileName`, `root`, `includeEmptyGroup`, `withIndex`, `useFolderLinkAsIndexPage`, `useIndexFileForFolderMenuInfo`. See the documentation page and the `CHANGELOG.md` file for replacement options.

## 1.27.1 (2024-09-26)

- Fix `sortMenusByFrontmatterOrder` not been sorted in numerical order but in string order (@Cryolitia)

## 1.27.0 (2024-09-19)

- Add `sortFolderTo` option (#173)
- Do not create an empty items array
- Now `capitalizeEachWords` separates them into words based on all special characters (#175)

## 1.26.2 (2024-09-19)

- Fix sorting by name to be case-insensitive (#177)

## 1.26.1 (2024-09-18)

- Fix failed to install node.js 18 (#180)

## 1.26.0 (2024-09-16)

- **BREAKING CHANGES**: The `excludeFiles` and `excludeFolders` options have been deprecated; use the `excludePattern` option instead, which corresponds to both custom files and folders with a glob pattern. Both options will be removed in the next major version.
- Add `excludePattern` option (Specify the files/folders to exclude with the glob file pattern) (#145)

## 1.25.4 (2024-09-16)

- Fix performing formatting on attribute text in some Markdown syntax or HTML tags (#176)

## 1.25.3 (2024-09-03)

- If `convertSameNameSubFileToGroupIndexPage` and `useFolderTitleFromIndexFile` options are defined together, try with title from index file when title is not fetched (#170)

## 1.25.2 (2024-09-03)

This version may cause unintended behavior. Please ignore this version.

- Fix `convertSameNameSubFileToGroupIndexPage` to get the name normally if subfile doesn't exist when set
- ~~Use the title of the index file if `convertSameNameSubFileToGroupIndexPage` and `useFolderTitleFromIndexFile` are defined together (#170)~~

## 1.25.1 (2024-09-03)

- **BREAKING CHANGES**: The `Options` type for TypeScript has been renamed to `VitePressSidebarOptions`.
- Fix to avoid converting non-first letter items to lowercase when using `capitalizeEachWords`
- Support for specifying sidebar option types for TypeScript
- Documentation page domain now changed to `vitepress-sidebar.cdget.com`!
- Korean documentation support

## 1.25.0 (2024-08-22)

- Add `basePath` option
- Fix incorrect directory path when using `rewrite` and `convertSameNameSubFileToGroupIndexPage` option. (#146)

## 1.24.2 (2024-08-13)

- Fix index link is blank in multiple sidebars (#167)

## 1.24.1 (2024-07-31)

- If a link exists in the directory, it will appear in the menu regardless of the option
- Fix do not include `index` link when `index.md` file is shown (#147)
- More precise argument checking

## 1.24.0 (2024-07-06)

- Add `frontmatterTitleFieldName` option. When used with `useTitleFromFrontmatter`, the `text` field of sidebar will extract from the value of `frontmatterTitleFieldName` instead of default `title` field if it exists. (@liudonghua123)

## 1.23.2 (2024-05-16)

- Revert `5ed188e`. do not warn 'use option together'

## 1.23.1 (2024-05-15)

- Warning against using the `removePrefixAfterOrdering` option and the `useTitleFrom` option together
- Fix to return full filename if separator is not present in filename when using `removePrefixAfterOrdering` option

## 1.23.0 (2024-05-13)

- **BREAKING CHANGES**: The `excludeFilesByFrontmatter` option is deprecated and replaced by the `excludeFilesByFrontmatterFieldName` option. You can now specify any field name you want, including Frontmatter's `exclude` field name, and documents will be excluded from the menu when that field value is `true`. Existing users should work fine with the following settings `excludeFilesByFrontmatterFieldName: 'exclude'`. For more information, see the documentation.
- Allow empty values or empty object options to be passed in

## 1.22.0 (2024-03-28)

- `prefixSeparator` now accepts regular expressions
- Add `sortMenusByFileDatePrefix` option

## 1.21.0 (2024-03-15)

- Add `removePrefixAfterOrdering` and `prefixSeparator` option
- Documentation enhancements

## 1.20.0 (2024-03-12)

- **BREAKING CHANGES**: The `sortMenusOrderNumerically` option has been split into the `sortMenusOrderNumericallyFromTitle` and `sortMenusOrderNumericallyFromLink` options. Therefore, the old option is deprecated. Renamed to allow you to sort by file title or link. For more information, see `README.md`.
- Add `sortMenusByFrontmatterDate` option
- Add `sortMenusOrderNumericallyFromLink` option
- In `useFolderLinkFromIndexFile`, show the path to `index.md` together
- Fix folders with only an index file are not recognized as empty

## 1.19.0 (2024-02-26)

- Add `excludeFilesByFrontmatter` option (@aslafy-z)

## 1.18.6 (2024-01-03)

- Fix typescript issue

## 1.18.5 (2023-12-11)

- Add `frontmatterOrderDefaultValue` option (@aslafy-z)
- Fix recursive sort of items (@aslafy-z)
- Retrieve ordering for top level folder indexes (@aslafy-z)

## 1.18.0 (2023-10-02)

- Add `capitalizeEachWords` option
- The option to modify menu names is also reflected correctly when pulling names from MarkDown heading, frontmatter.

## 1.17.0 (2023-09-26)

- Add `sortMenusOrderNumerically` option

## 1.16.5 (2023-09-22)

- Fix nested links being created in multiple sidebars

## 1.16.0 (2023-09-21)

- **BREAKING CHANGES**: The `useIndexFileForFolderMenuInfo` option has been split into the `useFolderTitleFromIndexFile` and `useFolderLinkFromIndexFile` options. Therefore, the old option is deprecated. You can now specify whether the folder menu should get its name and link from the `index.md` file, respectively. For more information, see `README.md`.
- Make sure the link to the index page is clearly marked (e.g., `folder/` instead of `folder/index`).

## 1.15.0 (2023-09-19)

- Fix correct base url for multiple sidebars
- The `rootGroupText`, `rootGroupLink`, and `rootGroupCollapsed` options are available again. However, these options are no longer required.

## 1.14.0 (2023-09-18)

- **NOTE**: The options `rootGroupText`, `rootGroupLink`, and `rootGroupCollapsed` are not available in this version. Please update to the latest version. These options have been restored!
- Use a better algorithm for stripping formatting from titles that contain Markdown syntax

## 1.13.0 (2023-09-13)

- **BREAKING CHANGES**: The generator normally strips some of the Markdown syntax when using `useTitleFromFileHeading`. If you do not want to remove Markdown syntax, set the `keepMarkdownSyntaxFromTitle` option to `true`.
- Add `debugPrint` option
- Add `keepMarkdownSyntaxFromTitle` option
- Improved test example files

## 1.12.0 (2023-09-12)

- Add `sortMenusByFrontmatterOrder` option

## 1.11.0 (2023-08-24)

- **BREAKING CHANGES**: `useFolderLinkAsIndexPage` option was renamed to `useIndexFileForFolderMenuInfo`
- **BREAKING CHANGES**: `sortByFileName` option was renamed to `manualSortFileNameByPriority`
- **BREAKING CHANGES**: The `useFolderLinkAsIndexPage` option now also gets the title information of the `index.md` file, so the name of the folder menu is set to the title of the `index.md` file
- The `useFolderLinkAsIndexPage` option, if the index file (`index.md`) does not exist, will display it without setting a link, replacing the name with the folder name
- Add `sortMenusByName` and `sortMenusOrderByDescending` options
- Added deprecated warning for changed option names

## 1.10.1 (2023-08-08)

- Fixed issue with `rootGroupCollapsed` option not being applied correctly

## 1.10.0 (2023-07-25)

- Add `includeFolderIndexFile` option
- Add `useFolderLinkAsIndexPage` option

## 1.9.5 (2023-07-25)

- Troubleshooting when links are not prefixed with `/`
- Allow `null` or `undefined` value for collapsed options

## 1.9.0 (2023-07-24)

- Add `rootGroupCollapsed` option. This option is separate from the `collapsed` option and allows you to set whether the RootGroup (the item displayed in the `Table of Contents`) is expanded or not. See `README.md` for more information.
- Correct behavior of `collapseDepth`

## 1.8.2 (2023-07-18)

- Remove unnecessary files
- Upgrade package dependencies
- Update `README.md`

## 1.8.1 (2023-06-15)

- Make sure to apply multi-sidebar settings for settings containing `resolvePath`

## 1.8.0 (2023-06-13)

- **BREAKING CHANGES**: The `root` option was renamed to `documentRootPath`.
- Support for multiple sidebars (Add `scanStartPath` and `resolvePath` option. Please read `README.md` file.)
- Improved multiple validation checks
- Improved Frontmatter inspections with special characters or newlines

## 1.7.5 (2023-05-28)

- Add `folderLinkNotIncludesFileName` option

## 1.7.0 (2023-05-28)

- **BREAKING CHANGES**: The `withIndex` option was renamed to `includeRootIndexFile`.
- **BREAKING CHANGES**: The `includeEmptyGroup` option was renamed to `includeEmptyFolder`.
- Add `excludeFiles` option
- Add `excludeFolders` option
- Add `includeDotFiles` option
- Parsing markdown `h1` tag and frontmatter correctly

## 1.6.5 (2023-05-27)

- Fix `convertSameNameSubFileToGroupIndexPage` and rename option not working together

## 1.6.0 (2023-05-27)

- **BREAKING CHANGES**: The default value for `hyphenToSpace` is now `false`.
- Add `convertSameNameSubFileToGroupIndexPage` option: If this value is `true`, then if a subfile with the same name as the folder exists, a link will be created in the folder to navigate to that file, and the file will not be displayed in the child item.
- Fixed issue with `hyphenToSpace` and `underscoreToSpace` options not being applied to directories
- Add `rootGroupLink` option

## 1.5.1 (2023-05-26)

- Add `.mocharc.json`, remove `tsconfig.prod.json` file in `.npmignore`

## 1.5.0 (2023-05-26)

- Add `useTitleFromFrontmatter` option. See README.md.
- `useTitleFromFileHeading`: Use only valid title values in titles that contain links

## 1.4.0 (2023-05-26)

- Fix TypeScript lint error
- Upgrade package dependencies

## 1.3.1 (2023-04-20)

- Fix build issue

## 1.3.0 (2023-04-20)

- Upgrade package dependencies
- Cleanup codes and update documentation

## 1.2.0 (2023-02-07)

- **BREAKING CHANGES**: The collapsible option has been removed by VitePress `1.0.0-alpha.44` breaking changes. See: https://vitepress.vuejs.org/config/theme-configs
  - If the `collapsed` option is not specified(`null` or `undefined`), group collapse/expand is not used and all menus are displayed at once. If `false`, the menu is created with all groups expanded. If `true`, the menu is created with all groups collapsed.
- Upgrade package dependencies

## 1.1.5 (2023-01-12)

- Remove CODE_OF_CONDUCT.md for npm release

## 1.1.4 (2023-01-12)

- Upgrade package dependencies

## 1.1.3 (2022-12-08)

- Upgrade package dependencies
- Add `includeEmptyGroup` option
- Do not include empty group by default

## 1.1.2 (2022-11-23)

- Upgrade package dependencies
- Fix README.md and codes indent

## 1.1.1 (2022-11-02)

- Fix `capitalizeFirst` bug

## 1.1.0 (2022-11-02)

- Add `capitalizeFirst` option
- Fix null check for option

## 1.0.9 (2022-11-02)

- Add `sortByFileName` option

## 1.0.8 (2022-11-02)

- Add `collapseDepth` option
- Fix correct import fs module
- Upgrade package dependencies

## 1.0.7 (2022-10-31)

- Fix execution order and cleanup codes
- Add `.editorconfig` file and reformat codes (Development only)

## 1.0.6 (2022-10-31)

- Add `useTitleFromFileHeading` option
- Upgrade package dependencies

## 1.0.5 (2022-10-27)

- Change require NodeJS version to 14
- Add mocha test (Development only)

## 1.0.4 (2022-10-25)

- First production release

## 0.1.0 ~ 1.0.3 (2022-10-25 / Alpha)

- Alpha release (Not tested. Do not use production.)
