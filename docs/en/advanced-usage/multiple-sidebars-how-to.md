# Multiple Sidebars How-to

Multiple sidebars is a feature that allows you to display different sidebar menus based on a specific URI path.

This is easily implemented in `vitepress-sidebar` with a few simple settings. In the end, **VitePress** will output the options as intended.

To learn more about Multiple sidebars first, we recommend taking a look at **VitePress'** official documentation below:

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

## Basic usage

First, let's assume you have a root project called `docs` with subdirectories called `guide` and `config`, like this:

```text
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

When the URL is located on a `/guide` page, the user wants the menu to show only the submenu of `guide` and hide the submenu of `config`. Similarly, you want to hide the submenu of `guide` when it is located on the `/config` page.

To implement this in `vitepress-sidebar`, you need to approach it differently from the existing setup.

Use the `withSidebar` function as before, but pass an array. The array will contain at least one option from `vitepress-sidebar`. The values in the array can be as many URLs as you want to specify. Of course, you can also configure them with different settings.

```javascript
// Must pass array arguments!!!!
const vitePressConfigs = {
  /* ... */
};

export default defineConfig(
  withSidebar(vitePressConfigs, [
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
  ])
);
```

The values of these options are used in the results as follows:

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

Here's an example of the output from the above setup:

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

## Multiple sidebar options

The following options are available in Multiple sidebars: `scanStartPath`, `basePath`, and `resolvePath`. Each option is optional, but should be able to be used correctly depending on the situation.

Each option is described below. However, we recommend that you first refer to the descriptions of each option on the [Options](/guide/options) page.

The descriptions below are based on the following examples:

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

This option is used to specify different directories as root paths for different routing rules. While `documentRootPath` is the root path that will actually be scanned (where the `.vitepress` directory is located), `scanStartPath` is the root path that should actually be seen in this route rule.

For example, to include only files in the `/guide` directory, specify the value of `scanStartPath` as `guide`. However, the path in `documentRootPath` should not be included.

### `resolvePath`

This option is used by VitePress to display the relevant menu when it encounters a specific URI. For example, if you want to display only the contents of the `guide/api` directory when reaching `example.com/guide/api`, the value of `resolvePath` would be `/guide/api`. It is recommended that you include `/` in front of the path.

This will usually have a similar value to `scanStartPath`, but sometimes you may need to specify it differently for **i18n** routing.

### `basePath`

This option is primarily utilized when working with VitePress' rewrite rules, and is optional otherwise.

It replaces the value of the `base` path in VitePress. If this value is not specified, the value of `resolvePath` or the root path (`/`) is specified.

If the actual path to the directory is different from the path structure in the URI, you should be able to navigate to the page provided by rewrite. Typically, the sidebar will generate a path based on the root directory and will not reference the rewrite path in VitePress.

For example, suppose you have a rewrite rule that looks like this:

```javascript
const vitePressConfigs = {
  rewrites: {
    'guide/:page': 'help/:page'
  }
};

const vitePressSidebarConfigs = [
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
    resolvePath: '/guide/'
  }
];

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

The `guide/one.md` document is displayed in the path to `help/one`. However, if you do this, the sidebar will not display the menu because it will try to find `help/one`, which is the path as it is.

To fix this, change the path in `basePath` to `help`:

```javascript
const vitePressConfigs = {
  rewrites: {
    'guide/:page': 'help/:page'
  }
};

const vitePressSidebarConfigs = [
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
    basePath: 'help', // <---------------------- Add this
    resolvePath: '/guide/'
  }
];

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

## Displaying menus with complex paths and URIs

The above example is typically when the path is defined in steps, but when you want to show folders that are deep in steps, especially when the URI is shorter or uses different conventions than the actual folder path, you need to use additional methods. For example, you have a folder structure like this:

```text
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

This time, we want to show the menu in `docs/guide/api` when we reach the one-level URI `/api`. The expected menu is to show only `api-one.md` and `api-two.md`.

```javascript
withSidebar([
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide/api',
    resolvePath: '/api/'
  }
]);
```

However, if you configure the options like this, you won't be able to display the menu, because the `api` directory is a subdirectory of `guide`. **VitePress** won't detect this and will navigate to a non-existent document.

To solve this, you need to use **VitePress'** Routing feature in parallel, see the article below for an explanation:

https://vitepress.dev/guide/routing#route-rewrites

Add the `rewrites` option to the VitePress settings in `defineConfig` following the example above:

```javascript
const vitePressConfigs = {
  /* [START] Add This */
  rewrites: {
    'guide/api/:page': 'api/:page'
  }
  /* [END] Add This */
};

const vitePressSidebarConfigs = {
  documentRootPath: 'docs',
  scanStartPath: 'guide/api',
  resolvePath: '/api/'
};

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

Now this will show a submenu of `docs/guide/api` when the URI path starts with `/api`!
