---
order: 2
---

# 侧边栏选项

本页介绍 VitePress 侧边栏的所有选项。

## @ 快速搜索

| 解决路径问题                          | 分组                                      |
| ------------------------------------- | ----------------------------------------- |
| [documentRootPath](#documentrootpath) | [collapsed](#collapsed)                   |
| [scanStartPath](#scanstartpath)       | [collapseDepth](#collapsedepth)           |
| [resolvePath](#resolvepath)           | [collapseFromLevel](#collapsefromlevel)   |
| [basePath](#basepath)                 | [rootGroupText](#rootgrouptext)           |
| [followSymlinks](#followsymlinks)     | [rootGroupLink](#rootgrouplink)           |
|                                       | [rootGroupCollapsed](#rootgroupcollapsed) |

| 获取菜单标题 | 获取菜单链接 |
| --- | --- |
| [useTitleFromFileHeading](#usetitlefromfileheading) | [useFolderLinkFromSameNameSubFile](#usefolderlinkfromsamenamesubfile) |
| [useTitleFromFrontmatter](#usetitlefromfrontmatter) | [folderLinkNotIncludesFileName](#folderlinknotincludesfilename) |
| [useFolderTitleFromIndexFile](#usefoldertitlefromindexfile) | [useFolderLinkFromIndexFile](#usefolderlinkfromindexfile) |
| [frontmatterTitleFieldName](#frontmattertitlefieldname) |  |
| [dynamicRouteTitleParam](#dynamicroutetitleparam) |  |

| 包括/排除 | 菜单标题样式 |
| --- | --- |
| [excludeByGlobPattern](#excludebyglobpattern) | [hyphenToSpace](#hyphentospace) |
| [excludeFilesByFrontmatterFieldName](#excludefilesbyfrontmatterfieldname) | [underscoreToSpace](#underscoretospace) |
| [excludeByFolderDepth](#excludebyfolderdepth) | [capitalizeFirst](#capitalizefirst) |
| [includeDotFiles](#includedotfiles) | [capitalizeEachWords](#capitalizeeachwords) |
| [includeEmptyFolder](#sortmenusbyfrontmatterdate) | [keepMarkdownSyntaxFromTitle](#keepmarkdownsyntaxfromtitle) |
| [includeRootIndexFile](#sortmenusbyfrontmatterdate) | [removePrefixAfterOrdering](#removeprefixafterordering) |
| [includeFolderIndexFile](#sortmenusbyfrontmatterdate) | [prefixSeparator](#prefixseparator) |
| [includeDynamicRoutes](#includedynamicroutes) |  |
| [VitePress `srcExclude`](#vitepress-srcexclude) |  |

| 分类 | 杂项 |
| --- | --- |
| [manualSortFileNameByPriority](#manualsortfilenamebypriority) | [debugPrint](#debugprint) |
| [sortFolderTo](#sortfolderto) |  |
| [sortMenusByName](#sortmenusbyname) |  |
| [sortMenusByFileDatePrefix](#sortmenusbyfiledateprefix) |  |
| [sortMenusByFrontmatterOrder](#sortmenusbyfrontmatterorder) |  |
| [frontmatterOrderDefaultValue](#frontmatterorderdefaultvalue) |  |
| [sortMenusByFileCreateDate](#sortmenusbyfilecreatedate) |  |
| [sortMenusByFileModifyDate](#sortmenusbyfilemodifydate) |  |
| [sortMenusByFrontmatterDate](#sortmenusbyfrontmatterdate) |  |
| [sortMenusOrderByDescending](#sortmenusorderbydescending) |  |
| [sortMenusOrderNumericallyFromTitle](#sortmenusordernumericallyfromtitle) |  |
| [sortMenusOrderNumericallyFromLink](#sortmenusordernumericallyfromlink) |  |
| [sortMenusByCustomFunction](#sortmenusbycustomfunction) |  |

## `documentRootPath`

- Type: `string`
- Default: `'/'`

文档文件所在的顶级路径。默认值为 `/`。

这是 `.vitepress`目录所在的路径，如果项目根目录中文档所在的文件夹是 `/docs`，则该选项的值应设为 `docs` 或 `/docs`。

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/        <------ VitePress 配置目录
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

当存在 `sidebar.config.json` 文件时，可以省略此选项。详情请参阅**[配置文件](/zhHans/advanced-usage/configuration-file)**页面。

## `scanStartPath`

- Type: `string|null`
- Default: `null`

此选项用于配置多个侧边栏。您可以在 **[多个侧边栏](/zhHans/advanced-usage/multiple-sidebars-how-to)** 页面上了解更多信息。

用于扫描文档列表的根目录路径。在`documentRootPath`中设置的路径中的文件,在`scanStartPath`中设置的路径之外,不会被扫描。如果您指定了`scanStartPath`,建议您也设置`documentRootPath`,因为`documentRootPath`中设置的父路径应该出现在`link`中。

例如,如果根路径是`/docs`,要扫描的文件是`/docs/sub-dir/scan-me`,则设置如下:

- `documentRootPath`: `/docs`,
- `scanStartPath`: `sub-dir/scan-me` (请勿包含 `documentRootPath` 的路径。)

## `resolvePath`

- Type: `string|null`
- Default: `null`

此选项用于配置多个侧边栏。您可以在 **[多个侧边栏](/zhHans/advanced-usage/multiple-sidebars-how-to)** 页面上了解更多信息。

输入路径,为每个路径显示不同的侧边栏。路径前必须包含`/`。没有此值的选项将设置为根路径(`/`)。

例如: `/`, `/path/sub-path`, `/guide/`...

## `basePath`

- Type: `string|null`
- Default: `null`

此选项用于配置多个侧边栏。您可以在 **[多个侧边栏](/zhHans/advanced-usage/multiple-sidebars-how-to)** 页面上了解更多信息。

如果路径因VitePress的重写选项而改变,则可以使用此选项。它替换VitePress中的基本路径。如果此值不存在,则将使用来自`resolvePath`的值。

## `followSymLinks`

- Type: `boolean`
- Default: `false`

如果该值为 `true`，则在扫描目录时，会包含任何已设置符号链接的目录或文件，并将其添加到菜单中。如果符号链接配置不正确或链接设置复杂，请务必小心，因为这可能导致性能低下或无限扫描。

## `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

如果值为 `true`，则显示带有 `.md` 文件中 `h1` 标题内容的标题。 如果文件中不存在 `h1` 标题，则像以前一样用文件名代替。

默认菜单项按文件夹树顺序排序,因此如果您想按更改后的菜单名称重新排序,请将`sortMenusByName`选项设置为`true`。

## `useTitleFromFrontmatter`

- Type: `boolean`
- Default: `false`

如果值为`true`,则根据文件`Frontmatter`中`title`的值显示标题。如果无法解析该值,则如果`useTitleFromFileHeading`选项为`true`,则从`h1`标签中获取该值,如果失败,则从文件名中获取该值。

`Frontmatter`应位于文档顶部,并应如下所示(在 `title:` 值和标题之间需要留出空格)。

```markdown
---
title: Hello World
---
```

## `frontmatterTitleFieldName`

- Type: `string`
- Default: `title`

根据文件中指定的Frontmatter中的键名显示菜单标题。如果指定的值在Frontmatter中不存在,将使用默认的`title`作为后备。

```markdown
---
name: This is frontmatter title value.
---
```

欲了解更多信息，请参阅以下文章： https://vitepress.dev/guide/frontmatter

默认菜单项是按文件夹树顺序排序的，因此如果想按更改后的菜单名称重新排序，请将 `sortMenusByName` 选项设置为 `true`。

## `useFolderTitleFromIndexFile`

- Type: `boolean`
- Default: `false`

如果该值为 `true`，则使用当前文件夹的 `index.md` 文件中的信息来获取菜单名称。如果不存在 `index.md` 文件，则使用文件夹名称。由于我们通常从 `index.md` 文件中获取 `index` 名称，因此建议同时使用 `useTitleFromFileHeading` 或 `useTitleFromFrontmatter` 选项，从该文件的 Markdown 标题或 Frontmatter 中获取标题。

侧边栏菜单会隐藏 `index.md` 文件，但如果 `includeFolderIndexFile` 选项为 `true`，索引文件就会显示在菜单中。

## `useFolderLinkFromIndexFile`

- Type: `boolean`
- Default: `false`

如果此值为 `true`，将指定一个指向文件夹的链接，以便您可以导航到当前文件夹中的 `index.md` 文件。如果 `index.md` 文件不存在，则不会创建链接。

侧边栏菜单会隐藏 `index.md` 文件，但如果 `includeFolderIndexFile` 选项为 `true`，则可在菜单中显示索引文件。

## `manualSortFileNameByPriority`

- Type: `Array<string>`
- Default: `[]`

按文件名（包括扩展名）数组的顺序排序。如果数组中没有与文件名匹配的值，排序优先级将被退回。这适用于文件和目录，同样的排列规则也适用于子目录。

## `sortFolderTo`

- Type: `undefined | 'top' | 'bottom'`
- Default: `undefined`

完成所有排序后，文件夹和文件将被分批放置。如果值为 `top`，则所有文件夹都放在文件上方；如果为 `bottom`，则放在文件下方。子文件夹中的项目也会一起排序。

## `sortMenusByName`

- Type: `boolean`
- Default: `false`

按名称对菜单项中的项目进行排序。通常情况下,文件夹扫描是按名称升序排序的,因此,如果不应用此选项,则应用默认排序,但如果使用`useTitleFromFileHeading`或`useTitleFromFrontmatter`选项,则可能需要按名称重新排序,因为菜单名称已更改。此选项强制按名称排序,即使菜单名称已更改也是如此。

## `sortMenusByFileDatePrefix`

- Type: `boolean`
- Default: `false`

如果值为 `true`，则按菜单项名称中的日期前缀排序。日期格式必须是 `YYYY-MM-DD` 格式（例如 `2024-01-01-menu-name`, `2024-01-02.menu-name`...）

要删除菜单文本中残留的日期前缀，可以使用 `prefixSeparator` 和 `removePrefixAfterOrdering` 选项。

默认菜单项是按文件夹树顺序排序的，因此如果想按更改后的菜单名称重新排序，请将 `sortMenusByName` 选项设置为 `true`。

## `sortMenusByFrontmatterOrder`

- Type: `boolean`
- Default: `false`

按 frontmatter 的 `order` 属性对菜单项排序。对于每个文件夹，按 `order` 属性的值（数字）升序排序，如果 `sortMenusOrderByDescending` 选项为 `true`，则按降序排序。如果 `order` 属性的值不是数字或不存在，则 `order` 会被判定为 `0`。

## `sortMenusByFileCreateDate`

- Type: `boolean`
- Default: `false`

根据文件的创建日期属性对菜单项进行排序。 (如果`sortMenusOrderByDescending`为`true`,则按日期降序).

## `sortMenusByFileModifyDate`

- Type: `boolean`
- Default: `false`

根据文件的修改日期属性对菜单项进行排序。 (如果`sortMenusOrderByDescending`为`true`,则按日期降序).

## `sortMenusByFrontmatterDate`

- Type: `boolean`
- Default: `false`

根据前端的`date`属性对菜单项进行排序。它还会按日期升序(如果`sortMenusOrderByDescending`为`true`,则按日期降序)对`date`属性值进行排序。日期格式必须符合`YYYY-MM-DD`或JavaScript Date数据类型。

## `sortMenusOrderByDescending`

- Type: `boolean`
- Default: `false`

如果此值为 `true`，则按降序排列菜单项中的项目。只有当 `sortMenusByName` 或 `sortMenusByFrontmatterOrder` 为 `true`时，才会启用此选项。

## `sortMenusOrderNumericallyFromTitle`

- Type: `boolean`
- Default: `false`

如果该值为`true`,则如果菜单名称以数字开头,则按数字而不是名称排序。例如,如果您有名为`1-a`、`10-a`和`2-a`的文件,则常规排序将按名称排序,即`['1-a', '10-a', '2-a']`。这会导致菜单以非预期的顺序显示,因为`10-a`优先于`2-a`。

使用此选项,它们按以下顺序排序:`['1-a', '2-a', '10-a']`

如果您希望按降序排序,则应与`sortMenusOrderByDescending`选项一起使用。

## `sortMenusOrderNumericallyFromLink`

- Type: `boolean`
- Default: `false`

如果此值为`true`,则如果菜单名称以数字开头,则按数字而不是名称排序。此选项与`sortMenusOrderNumericallyFromTitle`相同,但按链接而不是文件标题排序。因此,它不能与`sortMenusOrderNumericallyFromTitle`选项一起使用。

没有链接的文件夹会按其自身路径排序。因此,即使标题来自其他位置(例如使用`useFolderTitleFromIndexFile`和`useTitleFromFileHeading`选项时),文件夹和文件也会按名称中的数字一起排序。

如果您希望按降序排序,则应与`sortMenusOrderByDescending`选项一起使用。

## `sortMenusByCustomFunction`

- Type: `(a: SidebarSortItem, b: SidebarSortItem) => number`
- Default: `undefined`

使用您自己编写的函数对每个文件夹中的菜单项进行排序。该函数接收待比较的两个项目并返回一个数字,与传递给 `Array.prototype.sort` 的函数完全相同。

当排序依据是其他选项从不读取的内容时使用它,例如保存在版本控制中的日期或您自定义的 frontmatter 属性。

每个项目不仅描述它如何显示,还描述它在磁盘上的来源:

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `text` | `string \| undefined` | 项目显示的文本。 |
| `link` | `string \| undefined` | 项目指向的链接。没有链接的文件夹不包含此属性。 |
| `fileName` | `string` | 磁盘上的文件或文件夹名称,包含 `.md` 扩展名。 |
| `filePath` | `string` | 磁盘上文件或文件夹的绝对路径。对于动态路由生成的页面,则为生成它的模板的路径。 |
| `isDirectory` | `boolean` | 项目是否为文件夹。 |
| `createDate` | `number` | 创建时间(毫秒),无法读取时为 `0`。 |
| `modifyDate` | `number` | 修改时间(毫秒),无法读取时为 `0`。 |
| `frontmatter` | `object` | 文件的 frontmatter,文件夹则为其 `index.md` 的 frontmatter。不存在时为空对象。 |

`createDate`、`modifyDate` 和 `frontmatter` 仅在函数访问它们时才会读取,因此仅根据路径决定顺序的函数不会产生额外开销。

此选项独自决定整个文件夹的顺序,因此不能与 `sortMenusByName`、`sortMenusByFileDatePrefix`、`sortMenusByFrontmatterOrder`、`sortMenusByFrontmatterDate`、`sortMenusByFileCreateDate`、`sortMenusByFileModifyDate`、`sortMenusOrderNumericallyFromTitle`、`sortMenusOrderNumericallyFromLink` 或 `sortMenusOrderByDescending` 一起使用。如需降序排列,请在函数内部按所需方向排序,而不要使用 `sortMenusOrderByDescending`。

函数无法用 JSON 表示,因此该选项不能在[配置文件](../advanced-usage/configuration-file)中使用。

下面的示例按每个文件首次提交的日期对菜单进行排序,对于使用 Git 管理的项目,该日期即为文件的创建日期。由于每个项目都会查询一次仓库,因此对结果进行了缓存。

```js
import { execFileSync } from 'child_process';
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

const gitCreateDateCache = new Map();

const getGitCreateDate = (filePath) => {
  if (!gitCreateDateCache.has(filePath)) {
    let timestamp = 0;

    try {
      const output = execFileSync(
        'git',
        ['log', '--diff-filter=A', '--format=%at', '-1', '--', filePath],
        { encoding: 'utf-8' }
      ).trim();

      timestamp = output ? Number(output) * 1000 : 0;
    } catch {
      // 尚未被跟踪的文件回退为 `0`
    }

    gitCreateDateCache.set(filePath, timestamp);
  }

  return gitCreateDateCache.get(filePath);
};

export default defineConfig(
  withSidebar(
    {
      // VitePress 选项...
    },
    {
      documentRootPath: 'docs',
      sortMenusByCustomFunction: (a, b) =>
        getGitCreateDate(a.filePath) - getGitCreateDate(b.filePath)
    }
  )
);
```

## `frontmatterOrderDefaultValue`

- Type: `number`
- Default: `0`

设置 frontmatter 的 `order` 属性未设置时的默认值。该选项仅在 `sortMenusByFrontmatterOrder` 为 `true` 时启用。

## `collapsed`

- Type: `boolean`
- Default: `false`

如果未指定`collapsed`选项(`null` 或 `undefined`),则不使用分组折叠/展开,所有菜单将一次性显示。如果为`false`,则创建菜单时所有分组都处于展开状态。如果为`true`,则创建菜单时所有分组都处于折叠状态。

(即使值为`true`,如果菜单位于折叠组中的文档中,也可能被展开。)

![Collapsed Example](/doc-collapsed-example.png)

## `collapseDepth`

- Type: `number`
- Default: `1`

在指定的深度，菜单组会折叠。指定该选项后，组的折叠/展开将自动启用。顶层文件夹的深度为 `1`。

## `collapseFromLevel`

- Type: `number`
- Default: `undefined`

指定应显示图标菜单以实现折叠或展开操作的最小层级深度。深度小于此值的文件夹将始终以展开状态显示且不显示箭头，同时将忽略 `collapsed` 属性。此选项必须与 `collapsed` 选项配合使用，实际的折叠/展开状态由 `collapseDepth` 决定。顶级文件夹的层级深度为 `1`。

例如，设置 `{ collapsed: true, collapseDepth: 3, collapseFromLevel: 2 }` 会导致一级文件夹始终显示为无箭头的展开状态，二级文件夹处于展开且可折叠状态，而三级及更深层级的文件夹则初始为折叠状态。

## `hyphenToSpace`

- Type: `boolean`
- Default: `false`

如果值为 `true`，文件名中的`-`符号将转换为空格并显示为标题。通过 Markdown 标题或 frontmatter 导入菜单名称时，该选项也会受到影响。

## `underscoreToSpace`

- Type: `boolean`
- Default: `false`

如果值为 `true`，文件名中的`_`符号将转换为空格并显示为标题。通过 Markdown 标题或 frontmatter 导入菜单名称时，该选项也会受到影响。

## `capitalizeFirst`

- Type: `boolean`
- Default: `false`

如果值为 `true`，菜单名称的第一个字母将强制为大写。当菜单名称通过 Markdown 标题或 frontmatter 导入时，该选项也会受到影响。

## `capitalizeEachWords`

- Type: `boolean`
- Default: `false`

如果值为 `true`，将大写由特殊字符分隔的单词的所有首字母。当菜单名称通过 markdown 标头或 Frontmatter 导入时，该选项也会受到影响。

例如，`abc def ghi`和`abc-def ghi`将分别变为`Abc Def Ghi`和`Abc-Def Ghi`。

## `excludeByGlobPattern`

- Type: `Array<string>`
- Default: `[]`

[glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) 根据文件模式字符串数组排除文件或文件夹。

例如，该值可能如下所示`['abc/', 'def.md', 'ghi/file-**']`这将分别排除所有路径中的`abc`目录和子目录、`def.md`文件以及`ghi`路径中以`file-`开头的文件，这些文件和文件夹将被排除在菜单之外。

每个模式都会针对扫描的每个文件夹单独匹配，因此像 `abc/def/**` 这样表示从文档根目录开始的路径的模式不会匹配任何内容。对于这类路径，请使用 VitePress 的 [`srcExclude`](#vitepress-srcexclude)。

## VitePress `srcExclude`

使用 `withSidebar` 生成侧边栏时，会自动应用 VitePress 配置中的 [`srcExclude`](https://vitepress.dev/reference/site-config#srcexclude)。无需设置任何选项：被排除在构建之外的页面不会被生成，因此为其保留的菜单项只会链接到不存在的页面。

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  title: 'VitePress Sidebar',
  // `drafts/private.md` 和所有 `TODO.md` 都被排除在构建之外，
  // 因此也会从侧边栏中排除。
  srcExclude: ['drafts/private.md', '**/TODO.md']
};

export default defineConfig(
  withSidebar(vitePressOptions, {
    documentRootPath: '/docs'
  })
);
```

请注意以下几点：

- 模式以 `documentRootPath` 为基准解析，与 VitePress 以其 `srcDir` 为基准解析的方式相同。即使使用 [`scanStartPath`](#scanstartpath) 从文档根目录以下开始扫描，该基准也保持不变。
- 它是在 [`excludeByGlobPattern`](#excludebyglobpattern) 等其他排除选项之上附加应用的，而不是取代它们。
- 排除[动态路由](#includedynamicroutes)模板会同时排除它生成的所有页面。
- [`generateSidebar`](/zhHans/guide/getting-started) 不会接收 VitePress 配置，因此无法读取 `srcExclude`。使用它时请在 `excludeByGlobPattern` 中直接声明这些模式。

## `excludeFilesByFrontmatterFieldName`

- Type: `string|null`
- Default: `null`

指定前缀字段名称为`true`的文档将从菜单中排除。

如果未指定选项或选项值未定义,则忽略该选项。

例如,如果选项值为`exclude`,则菜单中不会显示内容包含`exclude: true`的文档。

```markdown
---
title: This article is excluded.
exclude: true
---

# Article

Content
```

根据选项的值,您可以使用其他名称,如`draft`、`hide`等,来代替`exclude`。

## `excludeByFolderDepth`

- Type: `number|null`
- Default: `null`

扫描文件夹时，当达到指定的深度数时，不再扫描子文件夹和文件，也不会在菜单中显示。最上层为 `1`。

例如，在下面的结构中，如果选项值为 `3`，则菜单将从第三个深度开始被抑制。

```text
root/  <---------- depth: 1 / scan: yes
├─ aaa1/  <---------- depth: 1
│  ├─ bbb/  <---------- depth: 2
│  │  ├─ b1.md  <---------- depth: 3 / scan: no
│  │  ├─ ccc/  <---------- depth: 3
│  │  │  └─ c1.md  <---------- depth: 4 / scan: no
│  │  └─ b1.md  <---------- depth: 3 / scan: no
│  └─ a1.md  <---------- depth: 2 / scan: yes
└─ aaa2/  <---------- depth: 1
   └─ aaa1.md  <---------- depth: 2 / scan: yes
```

在指定深度停止的是扫描，而不是文件夹项本身。不再扫描其内容的文件夹之所以从菜单中移除，只是因为其中没有可显示的内容，因此可以将它保留为叶子项：

- 如果 `useFolderLinkFromIndexFile` 为 `true`，含有 `index.md` 文件的文件夹会作为链接到该文件的叶子项保留。在上面的结构中，`bbb/` 会保留在菜单中并链接到 `bbb/index.md`，而其内部的内容仍不会显示。
- 如果 `includeEmptyFolder` 为 `true`，即使没有 `index.md` 文件，文件夹名称也会作为不带链接的文本项保留。

## `includeDotFiles`

- Type: `boolean`
- Default: `false`

通常情况下,如果文件和文件夹名称前有句点(`.`),它们会被视为隐藏文件,不会在列表中显示。但是,如果此选项为`true`,则强制在列表中显示所有隐藏文件和文件夹。

## `includeEmptyFolder`

- Type: `boolean`
- Default: `false`

如果值为`true`,则还会显示不存在md文件的目录。

## `includeRootIndexFile`

- Type: `boolean`
- Default: `false`

如果值为`true`,则还要在侧边栏菜单中包含顶级路径`index.md`文件。使用`includeFolderIndexFile`选项还可以包含子项目的索引文件。(如果文件不存在,则忽略它。)

## `includeFolderIndexFile`

- Type: `boolean`
- Default: `false`

如果值为`true`,则还要在侧边栏菜单中包含文件夹路径`index.md`文件。使用`includeRootIndexFile`选项还可以包含根项目的索引文件。(如果文件不存在,则忽略它。)

## `includeDynamicRoutes`

- Type: `boolean`
- Default: `false`

如果值为`true`,[动态路由](https://vitepress.dev/guide/routing#dynamic-routes)将以其生成的页面显示在侧边栏中,而不是以生成它们的模板文件显示。

假设有以下文档:

```
docs/
├─ packages/
│  ├─ [pkg].md
│  └─ [pkg].paths.js
└─ index.md
```

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: 'vitepress' } }, { params: { pkg: 'vitepress-sidebar' } }];
  }
};
```

侧边栏会显示`/packages/vitepress`和`/packages/vitepress-sidebar`,即 VitePress 实际提供的页面。如果没有此选项,则只显示`[pkg]`模板,而它的链接指向不存在的页面。

目录名也可以包含参数。`[category]/[slug].md`模板会为每个`category`值生成一个文件夹,每个文件夹包含该分类的页面。

路由的解析方式与 VitePress 完全相同,即运行`paths`文件,因此`.paths.ts`文件和异步`paths()`函数都可以使用。该过程在单独的进程中进行,约需 0.2 秒,并且只在至少有一个模板的项目中执行。请注意,`paths`文件所做的任何操作(例如调用 API)会在每次生成侧边栏时再执行一次。

::: tip一个模板生成的页面共享同一个文件,因此从该文件读取的内容(例如`useTitleFromFrontmatter`或`sortMenusByFrontmatterOrder`)对所有页面都相同。要为生成的页面指定各自的值,请将其放入参数中:

- 标题:使用 [`dynamicRouteTitleParam`](#dynamicroutetitleparam) 指定的名称
- `order`:由 [`sortMenusByFrontmatterOrder`](#sortmenusbyfrontmatterorder) 使用
- `date`:由 [`sortMenusByFrontmatterDate`](#sortmenusbyfrontmatterdate) 使用

模板中写成 <span v-pre>`{{ $params.pkg }}`</span> 的标题也会被替换,因此`useTitleFromFileHeading`和`useTitleFromFrontmatter`可以根据参数为每个页面命名。:::

要排除生成的页面,请使用 [`excludeByGlobPattern`](#excludebyglobpattern) 排除它们所属的模板。

## `dynamicRouteTitleParam`

- Type: `string`
- Default: `'title'`

保存动态路由生成页面的侧边栏标题的参数名称。仅在与 [`includeDynamicRoutes`](#includedynamicroutes) 一起使用时生效。

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: 'vitepress-sidebar', title: 'VitePress Sidebar' } }];
  }
};
```

上述页面显示为`VitePress Sidebar`。参数标题优先于所有其他命名方式,因为它是同一模板生成的各个页面之间唯一可以不同的方式。如果`title`已被用作路由参数,请更改此选项。

## `removePrefixAfterOrdering`

- Type: `boolean`
- Default: `false`

从所有操作完成后显示的菜单项的每个菜单标题中删除特定的前缀。如果您想按文件名中的数字排序,而不使用前缀的排序,并且不希望该数字在菜单中显示,这是理想的选择。

例如,如果默认使用前缀分隔符(`.`),则以下菜单将重命名为

- 文件名:`1.hello` -> 菜单名:`hello`
- 文件名:`1.1.hello` -> 菜单名:`1.hello`
- 文件名:`1-1.hello` -> 菜单名:`hello`

根据分隔符仅删除一次字母,因此子项(如`1.1.`)应使用`1-1`.。或者,您可以在前缀分隔符值上设置正则表达式来绕过它。

可与`prefixSeparator`选项一起使用。更多信息请参阅该选项的描述。

(注A:前缀仅影响标题,链接将使用文件链接的原始形式)。

(备注B:如果您使用`useTitleFromFileHeading`或`useTitleFromFrontmatter`选项,则忽略此选项)。

## `prefixSeparator`

- Type: `string|RegExp`
- Default: `'.'`

此选项只能与 `removePrefixAfterOrdering` 选项结合使用以删除前缀。

从提取的菜单文本中删除指定数量字符（至少一个）的第一部分。例如，如果菜单名称为 `1. Text`，并且您将 `prefixSeparator` 值设置为 `. `，则结果将仅为 `Text`。

您还可以使用正则表达式。与正则表达式匹配的值将被删除。例如，要删除 `2024-01-01-hello` 中字符串之前的日期，请将 `prefixSeparator` 值指定为 `/[0-9]{4}-[0-9]{2}-[0-9]{2}-/g`。结果为 `hello`。

## `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

rootGroup 指定整个菜单组,而与目录结构无关。这将使用一个菜单步骤,因此您在使用时应格外小心。如果您不需要 rootGroup 选项,可以将其禁用。如果指定此值,则指定顶级菜单的名称。

## `rootGroupLink`

- Type: `string`
- Default: `null`

有关 rootGroup 的更多信息，请参阅 `rootGroupText` 选项说明。指定此值可指定指向 rootGroup 的链接。如果值为空，则不添加链接。

## `rootGroupCollapsed`

- Type: `boolean`
- Default: `null`

有关 rootGroup 的更多信息，请参阅 `rootGroupText` 选项说明。`rootGroupCollapsed`选项设置是否展开根组的子项。如果指定的默认值为 `null` 或 `undefined`，则不显示展开/折叠按钮。如果该值为 `true`，子项将以折叠方式显示；如果为 `false`，子项将以展开方式显示。

此选项仅适用于顶层项目。有关一般项目的折叠性，请参阅 `collapsed` 选项。

## `useFolderLinkFromSameNameSubFile`

- Type: `boolean`
- Default: `false`

如果此值为`true`,则当存在与文件夹同名的子文件时,将在文件夹中创建一个链接,用于导航至该文件,而该文件不会显示在子项中。

例如,如果您有一个文件夹,如下所示:

```
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

在 `api` 文件夹中添加了一个链接，而 `api` 文件夹中的 `api` 页面不包含在菜单列表中。点击文件夹中的链接会显示 `api/api.md`中的文件。

## `folderLinkNotIncludesFileName`

- Type: `boolean`
- Default: `false`

此选项仅在特殊情况下使用：当您有 [rewrite](https://vitepress.dev/guide/routing#route-rewrites) 规则并且存在具有相同文件夹名称的子文件时，请将其与 `useFolderLinkFromSameNameSubFile` 选项并行使用。

**注意：** 如果您在未配置 VitePress rewrites 的情况下启用此选项，点击文件夹链接将导致 404 错误。请确保在您的 VitePress 配置中设置相应的 rewrite 规则。

如果此值为 `true`，则在建立文件夹链接时，忽略子项的存在，并仅将链接指定为文件夹路径。

例如，如果您有一个如下所示的文件夹：

```
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

使用 `useFolderLinkFromSameNameSubFile` 选项，单击 guide/api 文件夹菜单将带您进入 `guide/api/api`，但如果您使用 `folderLinkNotIncludesFileName` 选项，则链接将为 `guide/api/`。

要使此功能正常工作，您需要配置 VitePress rewrites 将文件夹路径映射到实际文件。在您的 `.vitepress/config.ts` 中添加以下内容：

```typescript
export default defineConfig({
  rewrites: {
    'guide/api/api.md': 'guide/api/index.md'
  }
});
```

或者使用动态 rewrite 函数来处理多个文件夹：

```typescript
export default defineConfig({
  rewrites(id) {
    // 将 'folder/folder.md' 重写为 'folder/index.md'
    return id.replace(/([^/]+)\/\1\.md$/, '$1/index.md');
  }
});
```

## `keepMarkdownSyntaxFromTitle`

- Type: `boolean`
- Default: `false`

如果此值为 `true`，则保留标题文本中包含的 Markdown 语法，而不删除它。通常会保留任何高亮或内联代码。无论是否使用此选项，超链接文本都会被移除。

## `debugPrint`

- Type: `boolean`
- Default: `false`

如果该值为`true`,则会将执行后创建的对象打印到控制台日志中。如果您配置了多个侧边栏,即使只包含其中一个选项,它也会输出所有侧边栏的结果。
