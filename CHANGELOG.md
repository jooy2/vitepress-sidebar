# Changelog

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
