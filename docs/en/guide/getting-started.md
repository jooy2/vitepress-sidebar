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

## How it works

VitePress Sidebar scans your folders and markdown files hierarchically based on the folder path (`documentRootPath`) you specify in your project's folders.

It will then exclude, sort, and format certain files based on your settings to read the titles of the sidebar menus, and finally output the settings data according to the sidebar specs required by VitePress.

As a result, VitePress's `config.js` file should look something like this

```javascript
export default {
  themeConfig: {
    sidebar: [
      // VitePress Sidebar's output
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ]
  }
};
```

This eliminates the need for manual creation for each menu in the `sidebar`.

## How to use

VitePress Sidebar can automatically generate sidebars with two functions: `withSidebar` and `generateSidebar`. They have the same behavior, but where to use the functions is different. In general, we recommend using `withSidebar`.

To import the modules you installed into your code, open VitePress's `config.js` file. Note that this file is located in the `.vitepress` directory and may have a different extension depending on your project.

File and use `vitepress-sidebar` in one of the two ways below:

### 1. Using `withSidebar` (recommended)

The `withSidebar` is used at the `defineConfig` level. Note that the configuration object from VitePress should be placed in the first parameter and the options from the VitePress Sidebar in the second parameter.

VitePress Sidebar will override any additional options required by the existing options in VitePress. Any manual `sidebar` options you may have set previously will be overridden by the new options.

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  // VitePress's options here...
  title: 'VitePress Sidebar',
  themeConfig: {
    // ...
  }
};

const vitePressSidebarOptions = {
  // VitePress Sidebar's options here...
  documentRootPath: '/',
  collapsed: false,
  capitalizeFirst: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

### 2. Using `generateSidebar`

`generateSidebar` is available at the `themeConfig.sidebar` level. This can be used when code separation is needed for more detailed `themeConfig` settings.

```javascript
// `.vitepress/config.js`
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      // VitePress Sidebar's options here...
    })
  }
});
```

To scan your project's documents, VitePress Sidebar needs to know the correct location by specifying the working path with the `documentRootPath` option. The default is `/`, but if your VitePress project is located in a separate folder, such as `docs`, depending on your project, you will need to specify the path yourself.

Based on the project root path, the path in `documentRootPath` will write the path where the `.vitePress` folder is located.

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

If your project is structured like the one above, you'll need to set it up like this:

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {};

const vitePressSidebarOptions = {
  documentRootPath: '/docs'
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

To test how the sidebar results are printed, try building VitePress with the `debugPrint` option set to `true`. You should see the output in the console.

For more information about the configuration of VitePress Sidebar, see **[Options](/guide/options)** section below.

## Code Example

```javascript
import { withSidebar } from 'vitepress-sidebar';

const vitePressConfigs = {
  title: 'VitePress Sidebar',
  themeConfig: {
    // ...
  }
};

export default defineConfig(
  withSidebar(vitePressConfigs, {
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
    // followSymlinks: false,
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
    // excludeByGlobPattern: ['README.md', 'folder/'],
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
);
```

## Example output

```text
{
  documentRootPath: 'javascript',
  useTitleFromFileHeading: true,
  hyphenToSpace: true,
  excludeByGlobPattern: ['vitepress-how-to']
}

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
