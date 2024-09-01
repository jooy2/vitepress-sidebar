# 🔌 VitePress Sidebar

[![awesome-vitepress](https://awesome.re/mentioned-badge.svg)](https://github.com/logicspark/awesome-vitepress-v1) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-sidebar/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-sidebar) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-sidebar) [![npm downloads](https://img.shields.io/npm/dm/vitepress-sidebar.svg)](https://www.npmjs.com/package/vitepress-sidebar) [![npm latest package](https://img.shields.io/npm/v/vitepress-sidebar/latest.svg)](https://www.npmjs.com/package/vitepress-sidebar) ![npm bundle size](https://img.shields.io/bundlephobia/min/vitepress-sidebar) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-sidebar?style=social)

**VitePress Sidebar** is a plugin for **[VitePress](https://vitepress.dev)** that automatically configures and manages the sidebar of your page with simple settings.

- ⚡️ Optimized for the latest version of **VitePress**
- ⚡️ Easy to use, lots of options to customize to your liking
- ⚡️ Lightweight bundle file size, zero dependencies
- ⚡️ [Multiple Sidebars](https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars) support
- ⚡️ [Frontmatter](https://vitepress.dev/guide/frontmatter) support
- ⚡️ [TypeScript](https://www.typescriptlang.org) support
- ⚡️ Customize menus for sorting, special character conversion, file and folder filters, and more!

## [Documentation (Getting Started & All option lists)](https://vitepress-sidebar.cdget.com/guide/getting-started)

Installing and using the package and defining all the utility methods can be found on the documentation page below: https://vitepress-sidebar.cdget.com/guide/getting-started

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default {
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.cdget.com/guide/api
       */
      // documentRootPath: '/',
      // scanStartPath: null,
      // basePath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // frontmatterTitleFieldName: 'title',
      // useFolderTitleFromIndexFile: false,
      // useFolderLinkFromIndexFile: false,
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      // collapsed: true,
      // collapseDepth: 2,
      // sortMenusByName: false,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // removePrefixAfterOrdering: false,
      // prefixSeparator: '.',
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // excludeFolders: ['secret-folder'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
    })
  }
};
```

## Real-world Uses

**VitePress Sidebar** is utilized in a variety of project environments, including my own web services.

- To explore packages used other than: https://github.com/jooy2/vitepress-sidebar/network/dependents

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-sidebar/issues).

You can also request a pull to fix bugs and add frequently used features. To contribute to a project, follow these steps

1. Clone the project.
2. Create changes (features, bugfixes) in a new branch.
3. Write a test (`test/specs/apis.spec.ts`) if a new option has been added.
4. Create a documentation (`docs/`) if a new option is added.
5. Request a pull request. Include any changes or considerations in the description for a quick code review.

## License

Copyright © 2022-2024 [CDGet](https://cdget.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
