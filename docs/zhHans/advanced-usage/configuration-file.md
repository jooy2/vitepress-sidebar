# 配置文件

您无需将所有选项都传递给 `withSidebar` 或 `generateSidebar`，只需在项目中放置一个 `sidebar.config.json` 文件，VitePress Sidebar 就会自动识别它。

配置文件会应用于其所在的文件夹**以及该文件夹下的所有子文件夹**，因此文档的每个部分都可以定义自己的规则。与嵌套的 `tsconfig.json` 类似，离文档更近的位置声明的选项始终优先。

文件名是固定的，只有 `sidebar.config.json` 会被识别。

## 基本用法

在文档所在的位置创建 `sidebar.config.json`：

```json
// docs/sidebar.config.json
{
  "collapsed": true,
  "capitalizeFirst": true,
  "useTitleFromFileHeading": true
}
```

有了上面的文件后，VitePress 配置中只需要这些内容：

```javascript
// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

export default defineConfig(withSidebar({ title: 'My Docs' }));
```

## 按文件夹覆盖选项

假设有这样一个项目：

```text
docs/
├─ sidebar.config.json        <-- 应用于 `docs` 下的所有内容
├─ index.md
├─ guide/
│  ├─ one.md
│  └─ two.md
└─ api/
   ├─ sidebar.config.json     <-- 应用于 `api` 下的所有内容
   ├─ three.md
   └─ internal/
      └─ four.md
```

```json
// docs/sidebar.config.json
{
  "collapsed": true,
  "sortMenusByName": true
}
```

```json
// docs/api/sidebar.config.json
{
  "collapsed": false,
  "sortMenusOrderByDescending": true,
  "excludeByGlobPattern": ["internal/"]
}
```

`guide` 文件夹处于折叠状态并按名称排序，而 `api` 文件夹处于展开状态、按倒序排序并隐藏其 `internal` 目录。`docs/api/sidebar.config.json` 中未声明的选项都会从 `docs/sidebar.config.json` 继承。

请注意，`excludeByGlobPattern` 中的路径是相对于拥有该配置文件的文件夹，而不是 `documentRootPath`。

## 优先级

选项按以下顺序合并，靠后的会覆盖靠前的：

1. 传递给 `withSidebar` 或 `generateSidebar` 的选项
2. 上级文件夹的 `sidebar.config.json`（从最浅到最深）
3. 该文件夹自身的 `sidebar.config.json`

换句话说，配置文件始终优先于作为参数传递的选项。

## 自动识别 `documentRootPath`

如果您没有传递 `documentRootPath`，其值会根据配置文件的位置推断：项目中找到的所有 `sidebar.config.json` 的最近公共父目录将成为文档根目录。

```text
/
├─ package.json
├─ src/
└─ docs/                      <-- `documentRootPath` 变为 `/docs`
   ├─ sidebar.config.json
   ├─ .vitepress/
   └─ index.md
```

如果您希望将配置文件放在项目根目录，请显式声明该路径。`documentRootPath` 只会从运行 VitePress 的目录中的 `sidebar.config.json` 读取：

```json
// sidebar.config.json
{
  "documentRootPath": "docs",
  "collapsed": true
}
```

搜索配置文件时会跳过 `node_modules`、`dist`、`build`、`out`、`coverage`、`target`、`vendor` 以及名称以点开头的目录。

## 并非所有文件夹都能使用的选项

有些选项描述的是整个侧边栏，而不是单个文件夹。它们只会从运行 VitePress 的目录与扫描起始目录之间的配置文件中读取，在更下层的文件中会被忽略并给出警告：

- [documentRootPath](/zhHans/guide/options#documentrootpath)
- [scanStartPath](/zhHans/guide/options#scanstartpath)
- [resolvePath](/zhHans/guide/options#resolvepath)
- [basePath](/zhHans/guide/options#basepath)
- [rootGroupText](/zhHans/guide/options#rootgrouptext)
- [rootGroupLink](/zhHans/guide/options#rootgrouplink)
- [rootGroupCollapsed](/zhHans/guide/options#rootgroupcollapsed)
- [includeRootIndexFile](/zhHans/guide/options#includerootindexfile)
- [removePrefixAfterOrdering](/zhHans/guide/options#removeprefixafterordering)
- [debugPrint](/zhHans/guide/options#debugprint)

不属于 VitePress Sidebar 选项的键，以及类型不正确的值，同样会被忽略并给出警告，因此失误不会悄悄改变结果：

```json
{
  "collapsed": "yes", // 被忽略：必须是布尔值
  "excludeByGlobPattern": "*", // 被忽略：必须是字符串数组
  "sortFolderTo": "up" // 被忽略：必须是 'top' 或 'bottom'
}
```

`null` 值始终被接受，表示未设置该选项。`$schema` 键同样始终被允许，可用于让编辑器关联 JSON 架构。

## 多侧边栏

配置文件同样适用于[多侧边栏](/zhHans/advanced-usage/multiple-sidebars-how-to)。数组中的每一项都会各自解析自己的配置文件，位于某个侧边栏扫描起始目录中的文件将作为该侧边栏的根配置。
