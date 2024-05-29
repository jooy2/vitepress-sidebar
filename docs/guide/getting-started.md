---
order: 1
---

# Getting Started

**VitePress Sidebar** is a sidebar auto-generation plugin compatible with **[VitePress](https://vitepress.dev)**.

This page walks you through the installation and use of the VitePress Sidebar module.

## Installation

First, you may need to pre-configure **[VitePress](https://vitepress.dev)** before using this module.

We recommend using **Node.js 18.x** or higher. The **VitePress Sidebar** is written in `ESM`. To use it in `CommonJS`, [see instructions here](/troubleshooting/err-require-esm.md).

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
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default {
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions)
  }
};
```

### 2. Using default-import

```javascript
import VitePressSidebar from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default {
  themeConfig: {
    sidebar: VitePressSidebar.generateSidebar(vitepressSidebarOptions)
  }
};
```

Use the `generateSidebar` method in the `themeConfig.sidebar` property of the `.vitepress/config.js` file, which is VitePress's configuration file. VitePress's configuration file might have a different filename or extension depending on your project's settings.

To test how this will output, try building VitePress with the `debugPrint` option set to `true`. You should see the output in the console.

For more information about the configuration of `generateSidebar`, see **[API](/guide/api)** section below.

## Code Example

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default {
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://github.com/jooy2/vitepress-sidebar#options
       */
      // documentRootPath: '/',
      // scanStartPath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
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
