# 🔌 VitePress Sidebar

[![awesome-vitepress](https://awesome.re/mentioned-badge.svg)](https://github.com/logicspark/awesome-vitepress-v1) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-sidebar/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-sidebar) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-sidebar) [![npm downloads](https://img.shields.io/npm/dm/vitepress-sidebar.svg)](https://www.npmjs.com/package/vitepress-sidebar) [![npm latest package](https://img.shields.io/npm/v/vitepress-sidebar/latest.svg)](https://www.npmjs.com/package/vitepress-sidebar) ![github repo size](https://img.shields.io/github/repo-size/jooy2/vitepress-sidebar) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-sidebar?style=social)

**VitePress Sidebar** is a plugin for **[VitePress](https://vitepress.vuejs.org)** that automatically configures and manages the sidebar of your page with simple settings.

- ⚡️ Optimized for the latest version of **VitePress**
- ⚡️ Easy to use, lots of options to customize to your liking
- ⚡️ Lightweight bundle file size
- ⚡️ [Multiple Sidebars](https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars) support
- ⚡️ TypeScript support

## Demo & Real-world Uses

**VitePress Sidebar** is utilized in a variety of project environments, including my own web services. An example homepage can be found here: https://til.jooy2.com

To explore packages used other than: https://github.com/jooy2/vitepress-sidebar/network/dependents

## Installation

We recommend using **Node.js 16.x** or higher. The **VitePress Sidebar** is written in `ESM`. To use it in `CommonJS`, [see instructions here](https://github.com/jooy2/vitepress-sidebar#troubleshoot-err_require_esm).

```shell
# via npm
$ npm i -D vitepress-sidebar

# via yarn
$ yarn add -D vitepress-sidebar

# via pnpm
$ pnpm i -D vitepress-sidebar
```

## How to Use

In the `themeConfig` setting of `.vitepress/config.js` file, execute the autoGenerate function as shown below to automatically generate the sidebar.

For more information about the configuration of `generateSidebar`, see **[Options](https://github.com/jooy2/vitepress-sidebar#options)** section below.

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default {
  themeConfig: {
    sidebar: generateSidebar({
      // documentRootPath: '/',
      // scanStartPath: null,
      // resolvePath: null,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // collapsed: true,
      // collapseDepth: 2,
      // sortByFileName: ['first.md', 'second', 'third.md'],
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFolders: ['secret-folder'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      // includeEmptyFolder: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // useIndexFileForFolderMenuInfo: false,
      // folderLinkNotIncludesFileName: false
    })
  }
};
```

### Example output:

```javascript
generateSidebar({
  documentRootPath: 'test/docs',
  collapseDepth: 2,
  hyphenToSpace: true
});
```

```javascript
[
  {
    text: 'Table of Contents',
    items: [
      { text: 'a', link: '/a' },
      { text: 'b_file_name', link: '/b_file_name' },
      { text: 'c file name', link: '/c-file-name' },
      {
        text: 'folder',
        items: [
          { text: 'folder file', link: '/folder/folder-file' },
          {
            text: 'subfolder',
            items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
            collapsed: true
          }
        ],
        collapsed: false
      }
    ],
    collapsed: undefined
  }
];
```

## Troubleshoot: `ERR_REQUIRE_ESM`

`vitepress-sidebar` is an **ESM** module. If your project is using **CJS**, you will need to convert it to an **ESM** module.

For more information about the **ESM** module, see below: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

To address these issues, there are several solutions below:

### Solution A

If you are trying to use it with a CJS project, change the file extension from `.js` to `.mjs` and try again. You can define that you want to use the module script for a specific file.

### Solution B

in the package.json file, add the line `"type": "module"` line. This may require the project to be converted to an ESM project.

```json5
{
  name: 'docs',
  type: 'module', // <-- Add this
  version: '1.0.0',
  scripts: {
    dev: 'vitepress dev src',
    build: 'vitepress build src',
    serve: 'vitepress serve src'
  }
}
```

## Multiple Sidebars How-to

To learn more about multiple sidebars, see the articles below:

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

You can specify multiple configuration objects of type `Array` in the option value of the `generateSidebar` function. Each object value can have different settings. If you use the `scanStartPath` and `resolvePath` options together, you can configure multiple sidebars.

```javascript
generateSidebar([
  {
    documentRootPath: 'test/docs',
    resolvePath: '/'
  },
  {
    documentRootPath: 'test/docs',
    rootGroupText: 'Sub',
    scanStartPath: 'folder/subfolder',
    resolvePath: '/sub/path/'
  }
]);
```

The values of these options are used in the results as follows:

```text
{
  <resolvePath>: [
    {
      text: <rootGroupText>,
      items: [{ text: 'document', link: '<scanStartPath>/document' }]
    }
  ]
}
```

Here's an example of the output from the above setup:

```json5
{
  '/': [
    {
      text: 'Table of Contents',
      items: [
        { text: 'a', link: '/a' },
        { text: 'b_file_name', link: '/b_file_name' },
        { text: 'c-file-name', link: '/c-file-name' }
        // ...
      ]
    }
  ],
  '/sub/path/': [
    {
      text: 'Sub',
      items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
    }
  ]
}
```

Learn more about `scanStartPath` and `resolvePath` in the `Options` section of `README.md`.

## Options

### `documentRootPath`

- Type: `string`
- Default: `'/'`

The top-level path where documentation files are located. The default value is `/`.

This is the path where the `.vitepress` directory is located, and if the folder where the documentation is located in the project root is `/docs`, then the value of this option should be set to `docs` or `/docs`.

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/        <------ VitePress config directory
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

### `scanStartPath`

- Type: `string|null`
- Default: `null`

This option is used to configure Multiple Sidebars. See the `Multiple Sidebars How-to` section in `README.md`.

The path to the root directory to scan for document lists. Files in the path set in `documentRootPath` outside the path set in `scanStartPath` will not be scanned. It is recommended that you also set `documentRootPath` if you specify `scanStartPath` because the parent path set in `documentRootPath` should appear in the `link`.

For example, if the root path is `/docs` and the document to be scanned is `/docs/sub-dir/scan-me`, the setting would look like this

- `documentRootPath`: `/docs`,
- `scanStartPath`: `sub-dir/scan-me` (Do not include the path to `documentRootPath`.)

### `resolvePath`

- Type: `string|null`
- Default: `null`

This option is used to configure Multiple Sidebars. See the `Multiple Sidebars How-to` section in `README.md`.

Enter the path to the section to display a different sidebar for each path. The path must contain `/` before and after it. Options without this value will be set to the root section (`/`).

e.g. `/`, `/path/sub-path`, `/guide/`...

### `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

The name of a group to separate top-level documents with no separate subdirectories.

VitePress has a top-level group for every page, and that group needs a name, so you can't arbitrarily remove the top-level group name.

### `rootGroupLink`

- Type: `string`
- Default: `null`

Sets the link to go to when the top-level group is clicked. If this option is not specified, it will behave as plain text.

### `rootGroupCollapsed`

- Type: `boolean`
- Default: `null`

The `rootGroupCollapsed` option sets whether child items of the root group are expanded or not. If specified with the default value of `null` or `undefined`, the expand/collapse button is not displayed. If the value is `true`, the child items are displayed collapsed, and if `false`, they are expanded.

This option only applies to top-level item. For general item collapsibility, see the `collapsed` option.

### `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title with the `h1` heading content of the `.md` file. If the `h1` heading does not exist in the file, it displays `Unknown`.

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

### `useTitleFromFrontmatter`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title based on the value of `title` in `Frontmatter` in the file. If this value cannot be parsed, it will be taken from the `h1` tag if the `useTitleFromFileHeading` option is `true`, and from the filename if that fails.

The `Frontmatter` should be located at the top of the document, and should look like this (Space is required between the `title:` value and the title.)

```markdown
---
title: This is frontmatter title value.
---
```

For more information, see the following articles: https://vitepress.dev/guide/frontmatter

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

### `sortByFileName`

- Type: `Array<string>`
- Default: `[]`

Sort by an array of file names (including extensions) in order. If there is no value in the array that matches the filename, the sort priority is sent back. This applies to both files and directories, and the same arrangement rules apply to subdirectories as well.

### `sortMenusByName`

- Type: `boolean`
- Default: `false`

Sort the items in the menu item by name. Normally, folder scans are done with an ascending name sort, so the default sort is applied without this option applied, but if you use the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options, you may need to re-sort by name because the menu name changes. This option forces sorting by name even for changed menu names.

### `sortMenusOrderByDescending`

- Type: `boolean`
- Default: `false`

If this value is `true`, sorts the items in the menu item in descending order. This option is only enabled when `sortMenusByName` is `true`.

### `collapsed`

- Type: `boolean`
- Default: `false`

If the `collapsed` option is not specified(`null` or `undefined`), group collapse/expand is not used and all menus are displayed at once. If `false`, the menu is created with all groups expanded. If `true`, the menu is created with all groups collapsed.

### `collapseDepth`

- Type: `number`
- Default: `1`

At the specified depth, the menu group is made collapsed. When this option is specified, group collapsing/expanding is automatically enabled. The depth of the top-level folder is `1`.

### `hyphenToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `-` symbol included in the file name is converted to a space and displayed as a title.

### `underscoreToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `_` symbol included in the file name is converted to a space and displayed as a title.

### `capitalizeFirst`

- Type: `boolean`
- Default: `false`

If the value is `true`, the first letter of the menu name is forced to uppercase. The same applies if the title is specified with `useTitleFromFileHeading`.

### `excludeFiles`

- Type: `Array<string>`
- Default: `[]`

Files that correspond to an array of file names (including extensions) are not shown in the list.

### `excludeFolders`

- Type: `Array<string>`
- Default: `[]`

Folders that correspond to an array of folder names are not shown in the list, and any sub-items within a folder are also not shown.

### `includeDotFiles`

- Type: `boolean`
- Default: `false`

Normally, if file and folder names contain a dot (`.`) in front of them, they are considered hidden and not shown in the list. However, if this option is `true`, it forces all hidden files and folders to be shown in the list.

### `includeEmptyFolder`

- Type: `boolean`
- Default: `false`

If the value is `true`, also displays directories where no md file exists as a group.

### `includeRootIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the top-level path `index.md` file in the sidebar menu. Use the `includeFolderIndexFile` option to include the index file of the child items as well. (If the file does not exist, it is ignored.)

### `includeFolderIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the folder path `index.md` file in the sidebar menu. Use the `includeRootIndexFile` option to include the index file of the root item as well. (If the file does not exist, it is ignored.)

### `convertSameNameSubFileToGroupIndexPage`

- Type: `boolean`
- Default: `false`

If this value is `true`, then if a subfile with the same name as the folder exists, a link will be created in the folder to navigate to that file, and the file will not be displayed in the child item.

### `useIndexFileForFolderMenuInfo`

- Type: `boolean`
- Default: `false`

If this value is `true`, use the information set in the `index.md` file for the name and link of the folder menu when the `index.md` file contained within the folder exists. If the `index.md` file does not exist, no link is set and the menu name is displayed as the folder name.

### `folderLinkNotIncludesFileName`

- Type: `boolean`
- Default: `false`

If this value is `true`, When establishing a folder link, ignore the existence of child items and specify the link only as a folder path. This option is not commonly used and is utilized for rewrite rules. This option may need to be used in conjunction with other options where folder links are created.

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-sidebar/issues). You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2022-2023 [Jooy2](https://jooy2.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
