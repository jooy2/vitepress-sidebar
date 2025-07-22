---
order: 1
---

# 入门

本页面将指导您安装和使用"VitePress Sidebar"模块。

## 安装

首先，在使用本模块之前，您可能需要预先配置 **[VitePress](https://vitepress.dev/zh/)**。

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

## 工作原理

VitePress Sidebar 会根据您在项目文件夹中指定的文件夹路径（`documentRootPath`），分层扫描您的文件夹和标记文件。

然后，它会根据您的设置对某些文件进行排除、排序和格式化，读取侧边栏菜单的标题，最后根据 VitePress 要求的侧边栏规范输出设置数据。

因此，VitePress 的 `config.js` 文件应如下所示

```javascript
export default {
  themeConfig: {
    sidebar: [
      // VitePress Sidebar 的输出
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

这样就无需在 “边栏 ”中手动创建每个菜单。

## 如何使用

VitePress Sidebar 可通过两个函数自动生成侧边栏：`withSidebar` 和 `generateSidebar`。它们的行为相同，但在何处使用这两个函数却不同。一般来说，我们建议使用`withSidebar`。

要将安装的模块导入代码，请打开VitePress的`config.js`文件。请注意，该文件位于`.vitepress`目录下，扩展名可能有所不同，具体取决于您的项目。

文件，并以以下两种方式之一使用 `vitepress-sidebar`.

### 1. 使用 `withSidebar`（推荐）

`withSidebar` 用于 `defineConfig` 级别。请注意，VitePress 的配置对象应放在第一个参数中，VitePress 侧边栏的选项应放在第二个参数中。

VitePress 侧边栏将覆盖 VitePress 中现有选项所需的任何附加选项。 您已手动设置的任何 `sidebar` 选项都将被新选项覆盖。

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

### 2. 使用 `generateSidebar`

`generateSidebar` 在`themeConfig.sidebar`级别可用。当需要对更详细的 `themeConfig` 设置进行代码分离时，可以使用此功能。

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

要扫描您的项目文档，VitePress Sidebar需要通过 `documentRootPath` 选项指定工作路径来了解正确的位置。默认是`/`，但如果你的VitePress项目位于一个单独的文件夹中，如`docs`，根据你的项目，你将需要自己指定路径。

根据项目根路径，`documentRootPath` 中的路径将写入 `.vitePress` 文件夹所在的路径。

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

如果您的项目结构如上，则需要这样设置:

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {};

const vitePressSidebarOptions = {
  documentRootPath: '/docs'
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

要测试侧边栏结果如何打印，请在构建 VitePress 时将 `debugPrint` 选项设置为 `true`。你应该能在控制台中看到输出结果。

有关 VitePress Sidebar 配置的更多信息,请参阅下面的 **[选项](/zhHans/guide/options)** 部分。

## 代码示例

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
     * 有关详细说明，请参阅下面的链接：
     * https://vitepress-sidebar.cdget.com/zhHans/guide/options
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
);
```

## 输出示例

```text
{
  documentRootPath: 'javascript',
  useTitleFromFileHeading: true,
  hyphenToSpace: true,
  excludePattern: ['vitepress-how-to']
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
