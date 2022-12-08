# 🔌 VitePress Sidebar

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-sidebar/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-sidebar) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-sidebar) ![Line Count](https://img.shields.io/tokei/lines/github/jooy2/vitepress-sidebar) [![npm downloads](https://img.shields.io/npm/dm/vitepress-sidebar.svg)](https://www.npmjs.com/package/vitepress-sidebar) [![npm latest package](https://img.shields.io/npm/v/vitepress-sidebar/latest.svg)](https://www.npmjs.com/package/vitepress-sidebar) ![npm maintenance](https://img.shields.io/npms-io/maintenance-score/vitepress-sidebar) ![npm quality](https://img.shields.io/npms-io/quality-score/vitepress-sidebar) ![minified size](https://img.shields.io/bundlephobia/min/vitepress-sidebar) ![github repo size](https://img.shields.io/github/repo-size/jooy2/vitepress-sidebar) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-sidebar?style=social)

VitePress Sidebar is a plugin for **[VitePress](https://vitepress.vuejs.org)** that automatically configures and manages the sidebar of your page with simple settings.

- ⚡️ Optimized for the latest version of VitePress
- ⚡️ Zero dependency packages
- ⚡️ Easy and versatile sidebar customization
- ⚡️ Lightweight bundle file size

## Installation

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
      root: '/',
      // rootGroupText: 'Contents',
      // useTitleFromFileHeading: true,
      hyphenToSpace: true,
      // underscoreToSpace: true,
      collapsible: true,
      collapsed: false
      // collapseDepth: 2,
      // sortByFileName: ['first.md', 'second', 'third.md'],
      // withIndex: true,
      // includeEmptyGroup: false
    })
  }
};
```

### Example output:

```json
[
  {
    "text": "Table of Contents",
    "items": [
      { "text": "A", "link": "/a" },
      { "text": "B_file_name", "link": "/b_file_name" },
      { "text": "C file name", "link": "/c-file-name" },
      {
        "text": "Folder",
        "items": [
          { "text": "Folder file", "link": "/folder/folder-file" },
          {
            "text": "Subfolder",
            "items": [{ "text": "Sub file", "link": "/folder/subfolder/sub-file" }],
            "collapsible": true,
            "collapsed": false
          }
        ],
        "collapsible": true,
        "collapsed": false
      }
    ],
    "collapsible": true,
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

### `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title with the `h1` heading content of the `.md` file. If the `h1` heading does not exist in the file, it displays `Unknown`.

### `sortByFileName`

- Type: `Array<string>`
- Default: `[]`

Sort by an array of file names (including extensions) in order. If there is no value in the array that matches the filename, the sort priority is sent back. This applies to both files and directories, and the same arrangement rules apply to subdirectories as well.

### `collapsible`

- Type: `boolean`
- Default: `true`

If the value is `true`, the category will be collapsible/unfolded.

### `collapsed`

- Type: `boolean`
- Default: `false`

If the value is `true`, the category is collapsed by default.

### `collapseDepth`

- Type: `number`
- Default: `1`

> ⚠️ NOTE: This feature will be available after adding the VitePress feature in the future: https://github.com/vuejs/vitepress/issues/1360

From a given directory depth, categories are collapsed. This option will automatically set true `collapsible`. The depth of the top-level folder is `1`.

### `hyphenToSpace`

- Type: `boolean`
- Default: `true`

If the value is `true`, the `-` symbol included in the file name is converted to a space and displayed as a title.

### `underscoreToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `_` symbol included in the file name is converted to a space and displayed as a title.

### `includeEmptyGroup`

- Type: `boolean`
- Default: `false`

If the value is `true`, also displays directories where no md file exists as a group.

### `capitalizeFirst`

- Type: `boolean`
- Default: `false`

If the value is `true`, the first letter of the menu name is forced to uppercase. The same applies if the title is specified with `useTitleFromFileHeading`.

### `withIndex`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the top-level path `index.md` file in the sidebar menu. (If the file does not exist, it is ignored.)

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-sidebar/issues). You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2022 [Jooy2](https://jooy2.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
