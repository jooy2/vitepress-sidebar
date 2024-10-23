---
order: 1
---

# 入门

本页面将指导您安装和使用"VitePress Sidebar"模块。

## 安装

首先，在使用本模块之前，您可能需要预先配置 **[VitePress](https://vitepress.dev)**。

我们建议使用 **Node.js 18.x** 或更高版本。**VitePress Sidebar**是用`ESM`编写的。要在 "CommonJS" 中使用它，[请参见此处的说明](/zhHans/troubleshooting/err-require-esm)。

您需要使用 [NPM](https://www.npmjs.com/package/vitepress-sidebar) 或任何其他 Node 模块包管理器安装该模块。该软件包应安装在 `devDependencies` 中，因为它仅在开发人员环境中使用。使用下面的命令：

```shell
# via npm
$ npm i -D vitepress-sidebar

# via yarn
$ yarn add -D vitepress-sidebar

# via pnpm
$ pnpm i -D vitepress-sidebar
```

## 如何使用

您可以使用 VitePress Sidebar 的 `generateSidebar` 方法自动生成侧边栏。

该方法会根据给定的根路径（`documentRootPath`）扫描文件夹，在 VitePress 构建之前找到标记文件，并返回根据文件夹树结构生成的菜单。

首先，用以下两种方法之一导入 `vitepress-sidebar` 。

### 1. 使用命名导入

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

### 2. 使用默认导入

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

使用`.vitepress/config.js`文件中`themeConfig.sidebar`属性中的`generateSidebar`方法，该文件是VitePress的配置文件。VitePress 的配置文件可能有不同的文件名或扩展名，这取决于您的项目设置。

要测试输出结果如何，请尝试在将 `debugPrint` 选项设置为 `true`的情况下构建 VitePress。你应该能在控制台中看到输出结果。

有关`generateSidebar`配置的更多信息,请参阅下面的 **[API](/zhHans/guide/api)** 部分。

## 代码示例

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * 有关详细说明，请参阅下面的链接：
       * https://vitepress-sidebar.cdget.com/zhHans/guide/api
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
      // sortFolderTo: null,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // removePrefixAfterOrdering: false,
      // prefixSeparator: '.',
      // excludeFilesByFrontmatterFieldName: 'exclude',
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
});
```

## 输出示例

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
