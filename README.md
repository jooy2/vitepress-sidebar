# 🔌 VitePress Sidebar

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-sidebar/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-sidebar) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-sidebar) [![npm downloads](https://img.shields.io/npm/dm/vitepress-sidebar.svg)](https://www.npmjs.com/package/vitepress-sidebar) [![npm latest package](https://img.shields.io/npm/v/vitepress-sidebar/latest.svg)](https://www.npmjs.com/package/vitepress-sidebar) ![github repo size](https://img.shields.io/github/repo-size/jooy2/vitepress-sidebar) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-sidebar?style=social)

**VitePress Sidebar** is a plugin for **[VitePress](https://vitepress.vuejs.org)** that automatically configures and manages the sidebar of your page with simple settings.

- ⚡️ Optimized for the latest version of **VitePress**
- ⚡️ Zero dependency packages
- ⚡️ Easy and versatile sidebar customization
- ⚡️ Lightweight bundle file size
- ⚡️ TypeScript support

## Demo & Real-world Uses

VitePress Sidebar is utilized in a variety of project environments, including my own web services. An example homepage can be found here: https://til.jooy2.com

To explore packages used other than: https://github.com/jooy2/vitepress-sidebar/network/dependents

## Installation

We recommend using **NodeJS 16.x** or higher. The **VitePress Sidebar** is written in `ESM`, for `CommonJS` the module is available by referring to the issue comment below: https://github.com/jooy2/vitepress-sidebar/issues/49#issuecomment-1532310510

```shell
# via npm
$ npm i -D vitepress-sidebar

# via yarn
$ yarn add -D vitepress-sidebar

# via pnpm
$ pnpm i -D vitepress-sidebar
```

## How to use

In the `themeConfig` setting of `.vitepress/config.js` file, execute the autoGenerate function as shown below to automatically generate the sidebar.

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default {
  themeConfig: {
    sidebar: generateSidebar({
      // root: '/',
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
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
      // includeRootIndexFile: true,
      // includeEmptyFolder: false,
      // convertSameNameSubFileToGroupIndexPage: false
    })
  }
};
```

### Example output:

```javascript
generateSidebar({
  root: 'test/docs',
  collapseDepth: 2,
  hyphenToSpace: true
});
```

```json
[
  {
    "text": "Table of Contents",
    "items": [
      { "text": "a", "link": "/a" },
      { "text": "b_file_name", "link": "/b_file_name" },
      { "text": "c file name", "link": "/c-file-name" },
      {
        "text": "folder",
        "items": [
          { "text": "folder file", "link": "/folder/folder-file" },
          {
            "text": "subfolder",
            "items": [{ "text": "sub file", "link": "/folder/subfolder/sub-file" }],
            "collapsed": true
          }
        ],
        "collapsed": false
      }
    ],
    "collapsed": false
  }
]
```

## Options

### `root`

- Type: `string`
- Default: `'/'`

The path to the root directory where the document is located. Pass `/` if it is located in the project top-level path, or `/docs` if it is located in the docs folder.

### `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

The name of a group to separate top-level documents with no separate subdirectories.

VitePress has a top-level group for every page, and that group needs a name, so you can't arbitrarily remove the top-level group name.

### `rootGroupLink`

- Type: `string`
- Default: null

Sets the link to go to when the top-level group is clicked. If this option is not specified, it will behave as plain text.

### `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title with the `h1` heading content of the `.md` file. If the `h1` heading does not exist in the file, it displays `Unknown`.

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

### `sortByFileName`

- Type: `Array<string>`
- Default: `[]`

Sort by an array of file names (including extensions) in order. If there is no value in the array that matches the filename, the sort priority is sent back. This applies to both files and directories, and the same arrangement rules apply to subdirectories as well.

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

If the value is `true`, also include the top-level path `index.md` file in the sidebar menu. (If the file does not exist, it is ignored.)

### `convertSameNameSubFileToGroupIndexPage`

- Type: `boolean`
- Default: `false`

If this value is `true`, then if a subfile with the same name as the folder exists, a link will be created in the folder to navigate to that file, and the file will not be displayed in the child item.

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-sidebar/issues). You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2022-2023 [Jooy2](https://jooy2.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
