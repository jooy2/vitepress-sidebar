# Changelog

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
