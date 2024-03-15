---
order: 3
---

# Multiple Sidebars How-to

To learn more about multiple sidebars, see the articles below:

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

You can specify multiple configuration objects of type `Array` in the option value of the `generateSidebar` function. Each object value can have different settings. If you use the `scanStartPath` and `resolvePath` options together, you can configure multiple sidebars.

```javascript
generateSidebar([
  {
    documentRootPath: 'example',
    scanStartPath: 'css',
    resolvePath: '/css/',
    useTitleFromFileHeading: true,
    excludeFiles: ['c-css.md']
  },
  {
    documentRootPath: 'example',
    scanStartPath: 'javascript',
    resolvePath: '/javascript/',
    useTitleFromFrontmatter: true,
    excludeFiles: ['package.json.md', 'helpful-links.md'],
    excludeFolders: ['examples', 'vitepress-how-to']
  }
]);
```

The values of these options are used in the results as follows:

```text
{
  <resolvePath>: [
    {
      base: <resolvePath>,
      items: [{ text: 'My Document', link: 'document/hello' }] // `<scanStartPath>/document/hello`
    }
  ]
}
```

Here's an example of the output from the above setup:

```json5
{
  '/css/': {
    base: '/css/',
    items: [
      {
        text: 'A',
        link: 'a-css'
      },
      {
        text: 'B',
        link: 'b-css'
      }
    ]
  },
  '/javascript/': {
    base: '/javascript/',
    items: [
      {
        text: 'es-module',
        link: 'es-module'
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
                    link: 'functions/prototypes/Array/Array.indexOf'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        text: 'getting_started',
        link: 'getting_started'
      }
    ]
  }
}
```

Learn more about `scanStartPath` and `resolvePath` in the `Options` section of `README.md`.
