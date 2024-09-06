# 多侧边栏操作方法

多侧边栏是一项允许根据特定 URI 路径显示不同侧边栏菜单的功能。

只需在 `vitepress-sidebar` 中进行一些简单设置，就能轻松实现这一功能。最终，**VitePress**将按照预期输出选项。

要先了解有关多侧边栏的更多信息，我们建议您查看下面**VitePress 的**官方文档：

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

## 基本用法

首先，假设你有一个名为 `docs` 的根项目，其中有名为 `guide` 和 `config` 的子目录，就像这样：

```
docs/
├─ guide/
│  ├─ index.md
│  ├─ one.md
│  ├─ two.md
│  └─ do-not-include.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

当URL位于`/guide`页面时,用户希望菜单仅显示`guide`的子菜单,隐藏`config`的子菜单。同样,当`guide`位于`/config`页面时,您希望隐藏`guide`的子菜单。

要在 `vitepress-sidebar` 中实现此功能,您需要采用与现有设置不同的方法。

像以前一样使用`generateSidebar`函数,但传递一个数组。该数组至少包含一个来自`vitepress-sidebar`的选项。数组中的值可以是任意数量的URL。当然,您也可以使用不同的设置进行配置。

```javascript
// 必须传递数组参数!!!!
generateSidebar([
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
    basePath: '/guide/',
    resolvePath: '/guide/',
    useTitleFromFileHeading: true,
    excludeFiles: ['do-not-include.md']
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'config',
    resolvePath: '/config/',
    useTitleFromFrontmatter: true
  }
]);
```

这些选项的值在结果中的使用情况如下：

```text
{
  <resolvePath>: [
    {
      base: <basePath or resolvePath>,
      items: [...] // `<scanStartPath>/path/to/items`
    }
  ]
}
```

下面是上述设置的输出示例：

```json5
{
  '/guide/': {
    base: '/guide/',
    items: [
      {
        text: 'One',
        link: 'one'
      },
      {
        text: 'Two',
        link: 'two'
      }
    ]
  },
  '/config/': {
    base: '/config/',
    items: [
      {
        text: 'Three',
        link: 'three'
      },
      {
        text: 'Four',
        link: 'four'
      }
    ]
  }
}
```

## 多个侧边栏选项

以下选项可用于多个侧边栏:`scanStartPath`、`basePath`和`resolvePath`。每个选项都是可选的,但应根据具体情况正确使用。

下文将对每个选项进行说明。但我们建议您首先参考[API](/zhHans/guide/api)页面上对每个选项的描述。

以下描述基于以下示例：

```text
docs/
├─ .vitepress/
├─ guide/
│  ├─ api/
│  │  ├─ api-one.md
│  │  └─ api-two.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

### `scanStartPath`

此选项用于为不同的路由规则指定不同的根目录。`documentRootPath`是实际要扫描的根目录(即`.vitepress`目录所在的位置),而`scanStartPath`是此路由规则中实际要显示的根目录。

例如,若要仅包含`/guide`目录中的文件,请将`scanStartPath`的值指定为`guide`。但是,`documentRootPath`中的路径不应包含在内。

### `resolvePath`

VitePress使用此选项在遇到特定URI时显示相关菜单。例如,如果您想在到达`example.com/guide/api`时仅显示`guide/api`目录的内容,则`resolvePath`的值为`/guide/api`。建议您在路径前添加`/`。

通常,它的值与 `scanStartPath` 类似,但有时您可能需要为 **i18n** 路由指定不同的值。

### `basePath`

此选项主要用于VitePress的重写规则,否则为可选。

它取代了VitePress中`base`路径的值。如果未指定该值,则指定`resolvePath`的值或根路径(`/`)。

如果目录的实际路径与URI中的路径结构不同,您应该能够通过重写功能导航到页面。通常情况下,侧边栏会根据根目录生成路径,而不会引用VitePress中的重写路径。

例如,假设您有一个重写规则,如下所示:

```javascript
export default defineConfig({
  rewrites: {
    'guide/:page': 'help/:page'
  },
  themeConfig: {
    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'guide',
        resolvePath: '/guide/'
      }
    ])
  }
});
```

`guide/one.md` 文档显示在 `help/one` 的路径中。但是,如果您这样做,侧边栏将不会显示菜单,因为它会尝试找到 `help/one`,而这是路径本身。

要解决这个问题,请将`basePath`中的路径改为`help`:

```javascript
export default defineConfig({
  rewrites: {
    'guide/:page': 'help/:page'
  },
  themeConfig: {
    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'guide',
        basePath: 'help', // <---------------------- Add this
        resolvePath: '/guide/'
      }
    ])
  }
});
```

## 显示带有复杂路径和 URI 的菜单

上面的例子通常是在路径按步骤定义的情况下，但当你想显示按步骤深入的文件夹时，特别是当 URI 较短或使用与实际文件夹路径不同的约定时，你需要使用额外的方法。例如，你有一个这样的文件夹结构：

```
docs/
├─ guide/
│  ├─ api/
│  │  ├─ api-one.md
│  │  └─ api-two.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

这次,我们希望当到达单级 URI `/api` 时,在 `docs/guide/api` 中显示菜单。预期的菜单仅显示 `api-one.md` 和 `api-two.md`。

```javascript
generateSidebar([
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide/api',
    resolvePath: '/api/'
  }
]);
```

但是,如果您这样配置选项,将无法显示菜单,因为`api`目录是`guide`的子目录。**VitePress**无法检测到这一点,并会导航到一个不存在的文档。

要解决这个问题,您需要同时使用**VitePress的**路由功能,请参阅以下文章以获取说明:

https://vitepress.dev/guide/routing#route-rewrites

按照上面的示例,我们将把“重写`rewrites`**VitePress的**`config.js`文件中,该文件应位于`themeConfig`之外:

```javascript
export default defineConfig({
  /* [START] Add This */
  rewrites: {
    'guide/api/:page': 'api/:page'
  },
  /* [END] Add This */
  themeConfig: {
    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'guide/api',
        resolvePath: '/api/'
      }
    ])
  }
});
```

现在，当 URI 路径以 `/api` 开头时，将显示 `docs/guide/api` 的子菜单！
