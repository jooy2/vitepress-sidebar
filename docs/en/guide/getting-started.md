---
order: 1
---

# Getting Started

This page walks you through the installation and use of the VitePress Sidebar module.

## Installation

First, you may need to pre-configure **[VitePress](https://vitepress.dev)** before using this module.

We recommend using **Node.js 18.x** or higher. The **VitePress Sidebar** is written in `ESM`. To use it in `CommonJS`, [see instructions here](/troubleshooting/err-require-esm).

You will need to install the module using [NPM](https://www.npmjs.com/package/vitepress-sidebar) or any other Node module package manager. The package should be installed in `devDependencies` as it is only used in the developer environment. Use the command below:

```shell
# via npm
$ npm i -D vitepress-sidebar

# via yarn
$ yarn add -D vitepress-sidebar

# via pnpm
$ pnpm i -D vitepress-sidebar
```

## How to Use

You can automatically generate a sidebar using the `generateSidebar` method of VitePress Sidebar.

It scans the folder against the given root path (`documentRootPath`), finds the markdown files before they were built by VitePress, and returns a menu generated based on the folder tree structure.

First, import `vitepress-sidebar` in one of the two ways below.

### 1. Using named-import

```javascript
// `.vitepress/config.js`
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions)
  }
});
```

### 2. Using default-import

```javascript
// `.vitepress/config.js`
import VitePressSidebar from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default defineConfig({
  themeConfig: {
    sidebar: VitePressSidebar.generateSidebar(vitepressSidebarOptions)
  }
});
```

Use the `generateSidebar` method in the `themeConfig.sidebar` property of the `.vitepress/config.js` file, which is VitePress's configuration file. VitePress's configuration file might have a different filename or extension depending on your project's settings.

To test how this will output, try building VitePress with the `debugPrint` option set to `true`. You should see the output in the console.

For more information about the configuration of `generateSidebar`, see **[Options](/guide/options)** section below.

## Code Example

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.cdget.com/guide/options
       */
      //
      // ============ [ RESOLVING PATHS ] ============
      // documentRootPath: '/',
      // scanStartPath: null,
      // resolvePath: null,
      // basePath: null,
      //
      // ============ [ GROUPING ] ============
      // collapsed: true,
      // collapseDepth: 2,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      //
      // ============ [ GETTING MENU TITLE ] ============
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // useFolderLinkFromIndexFile: false,
      // useFolderTitleFromIndexFile: false,
      // frontmatterTitleFieldName: 'title',
      //
      // ============ [ GETTING MENU LINK ] ============
      // useFolderLinkFromSameNameSubFile: false,
      // useFolderLinkFromIndexFile: false,
      // folderLinkNotIncludesFileName: false,
      //
      // ============ [ INCLUDE / EXCLUDE ] ============
      // excludePattern: ['README.md', 'folder/'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // includeDotFiles: false,
      // includeEmptyFolder: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      //
      // ============ [ STYLING MENU TITLE ] ============
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      // keepMarkdownSyntaxFromTitle: false,
      // removePrefixAfterOrdering: false,
      // prefixSeparator: '.',
      //
      // ============ [ SORTING ] ============
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // sortFolderTo: null,
      // sortMenusByName: false,
      // sortMenusByFileDatePrefix: false,
      // sortMenusByFrontmatterOrder: false,
      // frontmatterOrderDefaultValue: 0,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      //
      // ============ [ MISC ] ============
      // debugPrint: false,
    })
  }
});
```

## Example output

```javascript
generateSidebar({
  documentRootPath: 'example',
  scanStartPath: 'javascript',
  useTitleFromFileHeading: true,
  hyphenToSpace: true,
  excludeFolders: ['vitepress-how-to']
});

/*
[
  {
    text: 'examples',
    items: [
      {
        text: 'Examples',
        link: '/javascript/examples/examples'
      }
    ]
  },
  {
    text: 'functions',
    items: [
      {
        text: 'prototypes',
        items: [
          {
            text: 'Array',
            items: [
              {
                text: 'Array.indexOf',
                link: '/javascript/functions/prototypes/Array/Array.indexOf'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'Getting Started',
    link: '/javascript/getting_started'
  }
];
*/
```
