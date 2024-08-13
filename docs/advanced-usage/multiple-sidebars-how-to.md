# Multiple Sidebars How-to

Multiple sidebars is a feature that allows you to display different sidebar menus based on a specific URI path.

This is easily implemented in `vitepress-sidebar` with a few simple settings. In the end, **VitePress** will output the options as intended.

To learn more about Multiple sidebars first, we recommend taking a look at **VitePress'** official documentation below:

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

## Basic usage

First, let's assume you have a root project called `docs` with subdirectories called `guide` and `config`, like this:

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

When the URL is located on a `/guide` page, the user wants the menu to show only the submenu of `guide` and hide the submenu of `config`. Similarly, you want to hide the submenu of `guide` when it is located on the `/config` page.

To implement this in `vitepress-sidebar`, you need to approach it differently from the existing setup.

Use the `generateSidebar` function as before, but pass an array. The array will contain at least one option from `vitepress-sidebar`. The values in the array can be as many URLs as you want to specify. Of course, you can also configure them with different settings.

```javascript
generateSidebar([
  // <------ Must pass array arguments!!!!
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
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

The values of these options are used in the results as follows:

```text
{
  <resolvePath>: [
    {
      base: <resolvePath>,
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

Learn more about `scanStartPath` and `resolvePath` in the [API](/guide/api#scanstartpath) section.

## Displaying menus with complex paths and URIs

The above example is typically when the path is defined in steps, but when you want to show folders that are deep in steps, especially when the URI is shorter or uses different conventions than the actual folder path, you need to use additional methods. For example, you have a folder structure like this

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

This time, we want to show the menu in `docs/guide/api` when we reach the one-level URI `/api`. The expected menu is to show only `api-one.md` and `api-two.md`.

```javascript
generateSidebar([
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

Following the example above, we'll add the `rewrites` option to **VitePress'** `config.js` file, which should be located outside the `themeConfig`:

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

Now this will show a submenu of `docs/guide/api` when the URI path starts with `/api`!
