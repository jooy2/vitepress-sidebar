# vitepress-sidebar

**[Vitepress](https://vitepress.vuejs.org)** plugin to automatically create sidebars.

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-sidebar/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-sidebar) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-sidebar) ![Line Count](https://img.shields.io/tokei/lines/github/jooy2/vitepress-sidebar) [![npm downloads](https://img.shields.io/npm/dm/vitepress-sidebar.svg)](https://www.npmjs.com/package/vitepress-sidebar) [![npm latest package](https://img.shields.io/npm/v/vitepress-sidebar/latest.svg)](https://www.npmjs.com/package/vitepress-sidebar) ![npm maintenance](https://img.shields.io/npms-io/maintenance-score/vitepress-sidebar) ![npm quality](https://img.shields.io/npms-io/quality-score/vitepress-sidebar) ![minified size](https://img.shields.io/bundlephobia/min/vitepress-sidebar) ![github repo size](https://img.shields.io/github/repo-size/jooy2/vitepress-sidebar) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-sidebar?style=social)

## Installation

```shell
$ npm i vitepress-sidebar
```

## How to use

In the themeConfig setting of `.vitepress/config.js` file, execute the autoGenerate function as shown below to automatically generate the sidebar.

```javascript
import { autoGenerate } from 'vitepress-sidebar';

export default {
  themeConfig: {
    sidebar: autoGenerate({
      root: '/'
    })
  }
};
```

## Options

### `root (string) (Required) (Default: '/')`

The path to the root directory where the document is located. Pass `/` if it is located in the project top-level path, or `/docs` if it is located in the docs folder.

### `collapsible (boolean) (Default: true)`

If the value is `true`, the category will be collapsible/unfolded.

### `collapsed (boolean)`

If the value is `true`, the category is collapsed by default.

### `hyphenToSpace (boolean) (Default: true)`

If the value is `true`, the `-` symbol included in the file name is converted to a space and displayed as a title.

### `underscoreToSpace (boolean)`

If the value is `true`, the `_` symbol included in the file name is converted to a space and displayed as a title.

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-sidebar/issues). You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2022 Jooy2 Released under the MIT license.
