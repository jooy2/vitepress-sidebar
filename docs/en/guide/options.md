---
order: 2
---

# Sidebar Options

This page describes all the options in the VitePress Sidebar.

## Overview

Every option at a glance. Click a name to jump to its full description.

<div class="options-overview">
<table>
<thead>
<tr><th>Group</th><th>Option</th><th>Type</th><th>Default</th><th><code>sidebar<wbr>.config<wbr>.json</code></th></tr>
</thead>
<tbody>
<tr><td rowspan="5">Resolving Paths</td><td><a href="#documentrootpath"><code>documentRootPath</code></a></td><td><code>string</code></td><td><code>'/'</code></td><td>⚠️</td></tr>
<tr><td><a href="#scanstartpath"><code>scanStartPath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#resolvepath"><code>resolvePath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#basepath"><code>basePath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#followsymlinks"><code>followSymlinks</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td rowspan="6">Grouping</td><td><a href="#collapsed"><code>collapsed</code></a></td><td><code>boolean|null|undefined</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#collapsedepth"><code>collapseDepth</code></a></td><td><code>number</code></td><td><code>1</code></td><td>✅</td></tr>
<tr><td><a href="#collapsefromlevel"><code>collapseFromLevel</code></a></td><td><code>number</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#rootgrouptext"><code>rootGroupText</code></a></td><td><code>string</code></td><td><code>'Table of Contents'</code></td><td>⚠️</td></tr>
<tr><td><a href="#rootgrouplink"><code>rootGroupLink</code></a></td><td><code>string</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#rootgroupcollapsed"><code>rootGroupCollapsed</code></a></td><td><code>boolean|null|undefined</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td rowspan="5">Getting Menu Title</td><td><a href="#usetitlefromfileheading"><code>useTitleFromFileHeading</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usetitlefromfrontmatter"><code>useTitleFromFrontmatter</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usefoldertitlefromindexfile"><code>useFolderTitleFromIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#frontmattertitlefieldname"><code>frontmatterTitleFieldName</code></a></td><td><code>string</code></td><td><code>'title'</code></td><td>✅</td></tr>
<tr><td><a href="#dynamicroutetitleparam"><code>dynamicRouteTitleParam</code></a></td><td><code>string</code></td><td><code>'title'</code></td><td>✅</td></tr>
<tr><td rowspan="3">Getting Menu Link</td><td><a href="#usefolderlinkfromsamenamesubfile"><code>useFolderLinkFromSameNameSubFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#folderlinknotincludesfilename"><code>folderLinkNotIncludesFileName</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usefolderlinkfromindexfile"><code>useFolderLinkFromIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td rowspan="9">Include/Exclude</td><td><a href="#excludebyglobpattern"><code>excludeByGlobPattern</code></a></td><td><code>string[]</code></td><td><code>[]</code></td><td>✅</td></tr>
<tr><td><a href="#excludefilesbyfrontmatterfieldname"><code>excludeFilesByFrontmatterFieldName</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>✅</td></tr>
<tr><td><a href="#excludebyfolderdepth"><code>excludeByFolderDepth</code></a></td><td><code>number|null</code></td><td><code>null</code></td><td>✅</td></tr>
<tr><td><a href="#includedotfiles"><code>includeDotFiles</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includeemptyfolder"><code>includeEmptyFolder</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includerootindexfile"><code>includeRootIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#includefolderindexfile"><code>includeFolderIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includedynamicroutes"><code>includeDynamicRoutes</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#vitepress-srcexclude">VitePress <code>srcExclude</code></a></td><td><code>string[]</code></td><td><code>undefined</code></td><td>❌</td></tr>
<tr><td rowspan="7">Styling Menu Title</td><td><a href="#hyphentospace"><code>hyphenToSpace</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#underscoretospace"><code>underscoreToSpace</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#capitalizefirst"><code>capitalizeFirst</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#capitalizeeachwords"><code>capitalizeEachWords</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#keepmarkdownsyntaxfromtitle"><code>keepMarkdownSyntaxFromTitle</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#removeprefixafterordering"><code>removePrefixAfterOrdering</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#prefixseparator"><code>prefixSeparator</code></a></td><td><code>string|RegExp</code></td><td><code>'.'</code></td><td>✅<sup>1</sup></td></tr>
<tr><td rowspan="13">Sorting</td><td><a href="#manualsortfilenamebypriority"><code>manualSortFileNameByPriority</code></a></td><td><code>string[]</code></td><td><code>[]</code></td><td>✅</td></tr>
<tr><td><a href="#sortfolderto"><code>sortFolderTo</code></a></td><td><code>undefined|'top'|'bottom'</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyname"><code>sortMenusByName</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfiledateprefix"><code>sortMenusByFileDatePrefix</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfrontmatterorder"><code>sortMenusByFrontmatterOrder</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#frontmatterorderdefaultvalue"><code>frontmatterOrderDefaultValue</code></a></td><td><code>number</code></td><td><code>0</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfilecreatedate"><code>sortMenusByFileCreateDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfilemodifydate"><code>sortMenusByFileModifyDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfrontmatterdate"><code>sortMenusByFrontmatterDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusorderbydescending"><code>sortMenusOrderByDescending</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusordernumericallyfromtitle"><code>sortMenusOrderNumericallyFromTitle</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusordernumericallyfromlink"><code>sortMenusOrderNumericallyFromLink</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbycustomfunction"><code>sortMenusByCustomFunction</code></a></td><td><code>(a: SidebarSortItem, b: SidebarSortItem) =&gt; number</code></td><td><code>undefined</code></td><td>❌</td></tr>
<tr><td>Misc</td><td><a href="#debugprint"><code>debugPrint</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
</tbody>
</table>
</div>

**[`sidebar.config.json`](/advanced-usage/configuration-file)** — whether the option can be declared in a configuration file:

- ✅ Can be used in a configuration file of any folder.
- ⚠️ Can only be used in a configuration file at or above the document root. It is ignored, with a warning, in a file below it.
- ❌ Cannot be used in a configuration file, and has to be passed as an argument.

<sup>1</sup> A configuration file holds JSON, so `prefixSeparator` only accepts a regular expression when it is passed as an argument.

## `documentRootPath`

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

This option can be omitted when a `sidebar.config.json` file is present. See the **[Configuration file](/advanced-usage/configuration-file)** page for details.

## `scanStartPath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

The path to the root directory to scan for document lists. Files in the path set in `documentRootPath` outside the path set in `scanStartPath` will not be scanned. It is recommended that you also set `documentRootPath` if you specify `scanStartPath` because the parent path set in `documentRootPath` should appear in the `link`.

For example, if the root path is `/docs` and the document to be scanned is `/docs/sub-dir/scan-me`, the setting would look like this:

- `documentRootPath`: `/docs`,
- `scanStartPath`: `sub-dir/scan-me` (Do not include the path to `documentRootPath`.)

## `resolvePath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

Enter the path to the section to display a different sidebar for each path. The path must contain `/` before it. Options without this value will be set to the root section (`/`).

e.g. `/`, `/path/sub-path`, `/guide/`...

## `basePath`

- Type: `string|null`
- Default: `null`

This option is used to configure multiple sidebars. You can learn more on the **[Multiple sidebars](/advanced-usage/multiple-sidebars-how-to)** page.

This option can be utilized if the path has changed due to VitePress's rewrite option. It replaces the base path in VitePress. If this value does not exist, it will use the value from `resolvePath` instead.

## `followSymlinks`

- Type: `boolean`
- Default: `false`

If the value is `true`, when scanning a directories, include any directories or files that have symbolic links set to them and add them to the menu. Be careful if you configure symbolic links incorrectly or have a complex level of links set up, as this can result in poor performance or infinite scans.

## `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title with the `h1` heading content of the `.md` file. If the file does not contain an `h1` heading, it will be replaced with the file name as before.

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `useTitleFromFrontmatter`

- Type: `boolean`
- Default: `false`

If the value is `true`, display the title based on the value of `title` in `Frontmatter` in the file. If this value cannot be parsed, it will be taken from the `h1` tag if the `useTitleFromFileHeading` option is `true`, and from the filename if that fails.

The `Frontmatter` should be located at the top of the document, and should look like this (Space is required between the `title:` value and the title.)

```markdown
---
title: Hello World
---
```

## `frontmatterTitleFieldName`

- Type: `string`
- Default: `title`

Displays the menu title based on the key name in Frontmatter specified in the file. If the specified value does not exist in Frontmatter, the default `title` will be used as a fallback.

```markdown
---
name: This is frontmatter title value.
---
```

For more information, see the following articles: https://vitepress.dev/guide/frontmatter

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `useFolderTitleFromIndexFile`

- Type: `boolean`
- Default: `false`

If this value is `true`, use the information in the current folder's `index.md` file to get the menu name. If the `index.md` file does not exist, the folder name is used. Since we typically get the name `index` from the `index.md` file, we recommend using the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options together to get the title from the Markdown header or Frontmatter of that file.

The `index.md` file is hidden from the sidebar menu, but the index file can be shown in the menu if the `includeFolderIndexFile` option is `true`.

## `useFolderLinkFromIndexFile`

- Type: `boolean`
- Default: `false`

If this value is `true`, specifies a link to the folder so that you can navigate to the `index.md` file in the current folder. If the `index.md` file does not exist, no link is created.

The `index.md` file is hidden from the sidebar menu, but the index file can be shown in the menu if the `includeFolderIndexFile` option is `true`.

## `manualSortFileNameByPriority`

- Type: `Array<string>`
- Default: `[]`

Sort by an array of file names (including extensions) in order. If there is no value in the array that matches the filename, the sort priority is sent back. This applies to both files and directories, and the same arrangement rules apply to subdirectories as well.

## `sortFolderTo`

- Type: `undefined | 'top' | 'bottom'`
- Default: `undefined`

After all the sorting is done, folders and files are placed in batches. If the value is `top`, all folders are placed above the files, and if `bottom`, they are placed below the files. Items in subfolders are also sorted together.

## `sortMenusByName`

- Type: `boolean`
- Default: `false`

Sort the items in the menu item by name. Normally, folder scans are done with an ascending name sort, so the default sort is applied without this option applied, but if you use the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options, you may need to re-sort by name because the menu name changes. This option forces sorting by name even for changed menu names.

## `sortMenusByFileDatePrefix`

- Type: `boolean`
- Default: `false`

If the value is `true`, sorts by date prefix in the name of the menu item. The date format must be in the form `YYYY-MM-DD` (e.g. `2024-01-01-menu-name`, `2024-01-02.menu-name`...)

To remove date prefixes that remain in the menu text afterward, you can utilize the `prefixSeparator` and `removePrefixAfterOrdering` options.

The default menu items are sorted in folder tree order, so set the `sortMenusByName` option to `true` if you want to re-sort by the changed menu name.

## `sortMenusByFrontmatterOrder`

- Type: `boolean`
- Default: `false`

Sorts the menu items by the `order` property of the frontmatter. For each folder, sorts the value (number) of the `order` property in ascending order, or descending order if the `sortMenusOrderByDescending` option is `true`. If the value of `order` is non-numeric or does not exist, `order` is judged to be `0`.

## `sortMenusByFileCreateDate`

- Type: `boolean`
- Default: `false`

Sort the menu items by the file's creation date. (or descending order if the `sortMenusOrderByDescending` option is `true`).

## `sortMenusByFileModifyDate`

- Type: `boolean`
- Default: `false`

Sort menu items by the file's modification date. (or descending order if the `sortMenusOrderByDescending` option is `true`).

## `sortMenusByFrontmatterDate`

- Type: `boolean`
- Default: `false`

Sorts the menu items by the `date` property of the frontmatter. It also sorts the `date` property values in ascending order by oldest date (or descending order if the `sortMenusOrderByDescending` option is `true`) The date format must match `YYYY-MM-DD` or the JavaScript Date data type.

## `sortMenusOrderByDescending`

- Type: `boolean`
- Default: `false`

If this value is `true`, sorts the items in the menu item in descending order. This option is only enabled when `sortMenusByName` or `sortMenusByFrontmatterOrder` is `true`.

## `sortMenusOrderNumericallyFromTitle`

- Type: `boolean`
- Default: `false`

If this value is `true`, If a menu name contains a number at the beginning, it is sorted by the lower number, not the name. For example, if you have files named `1-a`, `10-a`, and `2-a`, a normal sort would sort by name, `['1-a', '10-a', '2-a']`. This causes the menu to display in an unintended order because `10-a` takes precedence over `2-a`.

With this option, they are sorted as follows: `['1-a', '2-a', '10-a']`

It should be used with the `sortMenusOrderByDescending` option if you want a descending sort.

## `sortMenusOrderNumericallyFromLink`

- Type: `boolean`
- Default: `false`

If this value is `true`, If a menu name contains a number at the beginning, it is sorted by the lower number, not the name. This option is the same as `sortMenusOrderNumericallyFromTitle`, but sorts by links instead of file titles. Therefore, it cannot be used with the `sortMenusOrderNumericallyFromTitle` option.

A folder that has no link is sorted by its own path, so folders and files are ordered together by the number in their names even when the titles come from somewhere else, such as with the `useFolderTitleFromIndexFile` and `useTitleFromFileHeading` options.

It should be used with the `sortMenusOrderByDescending` option if you want a descending sort.

## `sortMenusByCustomFunction`

- Type: `(a: SidebarSortItem, b: SidebarSortItem) => number`
- Default: `undefined`

Sorts the items of every folder with a function of your own. It receives the two items being compared and returns a number, exactly like the function passed to `Array.prototype.sort`.

Use it when the order comes from something the other options never read, such as a date kept in version control or a frontmatter field of your own.

Each item describes where it comes from on disk, and not only how it is displayed:

| Property | Type | Description |
| --- | --- | --- |
| `text` | `string \| undefined` | Text the item is displayed with. |
| `link` | `string \| undefined` | Link the item points to. Absent for a folder that has none. |
| `fileName` | `string` | Name of the file or folder on disk, `.md` included. |
| `filePath` | `string` | Absolute path of the file or folder on disk. For a page generated by a dynamic route, the path of the template that generates it. |
| `isDirectory` | `boolean` | Whether the item is a folder. |
| `createDate` | `number` | Creation time in milliseconds, or `0` when it cannot be read. |
| `modifyDate` | `number` | Modification time in milliseconds, or `0` when it cannot be read. |
| `frontmatter` | `object` | Frontmatter of the file, or of the `index.md` of a folder. An empty object when there is none. |

`createDate`, `modifyDate` and `frontmatter` are only read when the function accesses them, so a function that decides from the path alone costs nothing extra.

This option decides the order of a whole folder by itself, so it cannot be used together with `sortMenusByName`, `sortMenusByFileDatePrefix`, `sortMenusByFrontmatterOrder`, `sortMenusByFrontmatterDate`, `sortMenusByFileCreateDate`, `sortMenusByFileModifyDate`, `sortMenusOrderNumericallyFromTitle`, `sortMenusOrderNumericallyFromLink` or `sortMenusOrderByDescending`. Sort in the direction you want inside the function instead of using `sortMenusOrderByDescending`.

A function cannot be written in JSON, so this option is not available in a [configuration file](../advanced-usage/configuration-file).

The example below sorts every menu by the date each file was first committed, which is what the file creation date means for a project kept in Git. The result is cached because a repository lookup runs for every item.

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
      // Fall back to `0` for a file that is not tracked yet
    }

    gitCreateDateCache.set(filePath, timestamp);
  }

  return gitCreateDateCache.get(filePath);
};

export default defineConfig(
  withSidebar(
    {
      // VitePress options...
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

Sets the default value for the `order` property of the frontmatter when not set. This option is only enabled when `sortMenusByFrontmatterOrder` is `true`.

## `collapsed`

- Type: `boolean|null|undefined`
- Default: `undefined`

If the `collapsed` option is not specified(`null` or `undefined`), group collapse/expand is not used and all menus are displayed at once. If `false`, the menu is created with all groups expanded. If `true`, the menu is created with all groups collapsed.

(Even if the value is `true`, the menu may be expanded if it is located in a document within a collapsed group.)

![Collapsed Example](/doc-collapsed-example.png)

## `collapseDepth`

- Type: `number`
- Default: `1`

At the specified depth, the menu group is made collapsed. When this option is specified, group collapsing/expanding is automatically enabled. The depth of the top-level folder is `1`.

## `collapseFromLevel`

- Type: `number`
- Default: `undefined`

Specifies the minimum depth at which the icon menu should be displayed so that groups can be collapsed or expanded. Folders at depths lower than this value will always be displayed in an expanded state without arrows, and the `collapsed` attribute will be ignored. This option must be used in conjunction with the `collapsed` option, and the actual collapsed/expanded state is determined by `collapseDepth`. The depth of the top-level folder is `1`.

For example, setting `{ collapsed: true, collapseDepth: 3, collapseFromLevel: 2 }` causes first-level folders to be displayed permanently without arrows, second-level folders to be expanded and collapsible, and third-level and deeper folders to start in a collapsed state.

## `hyphenToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `-` symbol included in the file name is converted to a space and displayed as a title. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `underscoreToSpace`

- Type: `boolean`
- Default: `false`

If the value is `true`, the `_` symbol included in the file name is converted to a space and displayed as a title. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `capitalizeFirst`

- Type: `boolean`
- Default: `false`

If the value is `true`, the first letter of the menu name is forced to uppercase. This option is also affected when the menu name is imported via a MarkDown heading or frontmatter.

## `capitalizeEachWords`

- Type: `boolean`
- Default: `false`

If the value is `true`, will capitalize all first letters of words separated by special characters. This option is also affected when menu names are imported via markdown headers or Frontmatter.

For example, `abc def ghi` and `abc-def ghi` change to `Abc Def Ghi` and `Abc-Def Ghi`, respectively.

## `excludeByGlobPattern`

- Type: `Array<string>`
- Default: `[]`

[glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) Exclude files or folders based on an array of file pattern strings.

For example, the value might look like this: `['abc/', 'def.md', 'ghi/file-**']` This would exclude the `abc` directory and subdirectories in all paths, the `def.md` file, and files starting with `file-` in the `ghi` path, respectively, and these files and folders would be excluded from the menu.

Each pattern is matched against every folder that is scanned, so a pattern that describes a path from the document root, such as `abc/def/**`, does not match anything. Use the [`srcExclude`](#vitepress-srcexclude) of VitePress for such a path.

## VitePress `srcExclude`

The [`srcExclude`](https://vitepress.dev/reference/site-config#srcexclude) of your VitePress configuration is honored automatically when the sidebar is generated with `withSidebar`. There is no option to set: a page excluded from the build is never generated, so a menu item for it would link to a page that does not exist.

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  title: 'VitePress Sidebar',
  // `drafts/private.md` and every `TODO.md` are excluded from the build,
  // and therefore from the sidebar as well.
  srcExclude: ['drafts/private.md', '**/TODO.md']
};

export default defineConfig(
  withSidebar(vitePressOptions, {
    documentRootPath: '/docs'
  })
);
```

Note the following:

- A pattern is resolved from `documentRootPath`, exactly like VitePress resolves it from its `srcDir`. It keeps that meaning even when the scan starts below the document root with [`scanStartPath`](#scanstartpath).
- It is applied in addition to [`excludeByGlobPattern`](#excludebyglobpattern) and the other exclusion options, never instead of them.
- Excluding a [dynamic route](#includedynamicroutes) template excludes every page it generates.
- [`generateSidebar`](/guide/getting-started#_2-using-generatesidebar) is not given the VitePress configuration, so it cannot read `srcExclude`. Declare the patterns in `excludeByGlobPattern` when you use it.

## `excludeFilesByFrontmatterFieldName`

- Type: `string|null`
- Default: `null`

Documents with the value of the specified frontmatter field name set to `true` are excluded from the menu.

If no option is specified or the option value is undefined, it is ignored.

For example, if the option value is `exclude`, documents whose content contains `exclude: true` are not displayed in the menu.

```markdown
---
title: This article is excluded.
exclude: true
---

# Article

Content
```

Depending on the value of this option, you can use other names like `draft`, `hide`, etc. instead of `exclude`.

## `excludeByFolderDepth`

- Type: `number|null`
- Default: `null`

When scanning a folder, when it reaches the specified number of depths, it no longer scans subfolders and files and does not display them in the menu. The topmost level is `1`.

For example, in the structure below, if the option value is `3`, the menu will be suppressed starting at the third depth.

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

What stops at the given depth is the scan, not the folder item itself. A folder whose contents are no longer scanned is removed from the menu only because nothing is left to show in it, so it can be kept as a leaf item:

- If `useFolderLinkFromIndexFile` is `true`, a folder that has an `index.md` file remains as a leaf item linked to that file. In the structure above, `bbb/` stays in the menu and links to `bbb/index.md`, while everything inside it stays hidden.
- If `includeEmptyFolder` is `true`, the folder name remains as a text item with no link, even when there is no `index.md` file.

## `includeDotFiles`

- Type: `boolean`
- Default: `false`

Normally, if file and folder names contain a dot (`.`) in front of them, they are considered hidden and not shown in the list. However, if this option is `true`, it forces all hidden files and folders to be shown in the list.

## `includeEmptyFolder`

- Type: `boolean`
- Default: `false`

If the value is `true`, also displays directories where no md file exists as a group.

## `includeRootIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the top-level path `index.md` file in the sidebar menu. Use the `includeFolderIndexFile` option to include the index file of the child items as well. (If the file does not exist, it is ignored.)

## `includeFolderIndexFile`

- Type: `boolean`
- Default: `false`

If the value is `true`, also include the folder path `index.md` file in the sidebar menu. Use the `includeRootIndexFile` option to include the index file of the root item as well. (If the file does not exist, it is ignored.)

## `includeDynamicRoutes`

- Type: `boolean`
- Default: `false`

If the value is `true`, [dynamic routes](https://vitepress.dev/guide/routing#dynamic-routes) are shown in the sidebar as the pages they generate, instead of as the template file they are generated from.

Given the following documents:

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

The sidebar shows `/packages/vitepress` and `/packages/vitepress-sidebar`, which are the pages VitePress actually serves. Without this option, only the `[pkg]` template is shown, and its link leads nowhere.

A directory name may hold a parameter as well. A `[category]/[slug].md` template becomes one folder per `category`, each holding the pages of that category.

The routes are resolved by running the `paths` file, exactly as VitePress does, so a `.paths.ts` file and an asynchronous `paths()` function both work. This happens in a separate process, which takes about 0.2 seconds, and only for a project that has at least one template. Note that anything the `paths` file does, such as calling an API, happens once more per sidebar generation.

::: tip The pages a template generates share one file, so anything read from that file, such as `useTitleFromFrontmatter` or `sortMenusByFrontmatterOrder`, is the same for all of them. To give a generated page a value of its own, put it in its parameters:

- a title, under the name [`dynamicRouteTitleParam`](#dynamicroutetitleparam) sets
- `order`, used by [`sortMenusByFrontmatterOrder`](#sortmenusbyfrontmatterorder)
- `date`, used by [`sortMenusByFrontmatterDate`](#sortmenusbyfrontmatterdate)

A title written in the template as <span v-pre>`{{ $params.pkg }}`</span> is also resolved, so `useTitleFromFileHeading` and `useTitleFromFrontmatter` can name each page after its parameters. :::

To exclude the generated pages, exclude the template they come from with [`excludeByGlobPattern`](#excludebyglobpattern).

## `dynamicRouteTitleParam`

- Type: `string`
- Default: `'title'`

The name of the parameter that holds the sidebar title of a page generated by a dynamic route. It only has an effect together with [`includeDynamicRoutes`](#includedynamicroutes).

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: 'vitepress-sidebar', title: 'VitePress Sidebar' } }];
  }
};
```

The page above is shown as `VitePress Sidebar`. A parameter title wins over every other way of naming the page, because it is the only one that can differ between the pages of a single template. Change this option when `title` is already used as a route parameter.

## `removePrefixAfterOrdering`

- Type: `boolean`
- Default: `false`

Removes a specific prefix from each menu title from the menu items that appear after everything is done. This is ideal if you want to sort by the number in the filename without using frontmatter's sorting, and you don't want that number to be visible in the menu.

For example, if `prefixSeparator` is the default (`.`), the following menus will be renamed as follows:

- File name: `1.hello` -> Menu name: `hello`
- File name: `1.1.hello` -> Menu name: `1.hello`
- File name: `1-1.hello` -> Menu name: `hello`

Removes letters only once based on the separator, so a child item like `1.1.` should be used like `1-1.`. Alternatively, you can set a regular expression on the `prefixSeparator` value to work around it.

Can be used with the `prefixSeparator` option. See that option's description for more information.

(Note A: prefix only affects the title, the link will use the file link as it is).

(Note B: This option is ignored if you use the `useTitleFromFileHeading` or `useTitleFromFrontmatter` options).

## `prefixSeparator`

- Type: `string|RegExp`
- Default: `'.'`

This option can only be used in conjunction with the `removePrefixAfterOrdering` option to remove the prefix.

Removes the first part of a specified number of characters (at least one) from the extracted menu text. For example, if the menu name is `1. Text`, and you set the `prefixSeparator` value to `. `, the result will be just `Text`.

You can also use regular expressions. Values matching the regular expression are removed. For example, to remove the date before the string in `2024-01-01-hello`, specify the `prefixSeparator` value as `/[0-9]{4}-[0-9]{2}-[0-9]{2}-/g`. The result is `hello`.

## `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

rootGroup specifies the entire group for the menu, regardless of directory structure. This uses one menu step, so you should be careful about using it, and you can disable the rootGroup option if you don't need it. If you specify this value, you specify a name for the top-level menu.

## `rootGroupLink`

- Type: `string`
- Default: `null`

For more information about rootGroup, see the `rootGroupText` option description. Specifying this value specifies a link to the rootGroup. If the value is empty, no link is added.

## `rootGroupCollapsed`

- Type: `boolean`
- Default: `null`

For more information about rootGroup, see the `rootGroupText` option description. The `rootGroupCollapsed` option sets whether child items of the root group are expanded or not. If specified with the default value of `null` or `undefined`, the expand/collapse button is not displayed. If the value is `true`, the child items are displayed collapsed, and if `false`, they are expanded.

This option only applies to top-level item. For general item collapsibility, see the `collapsed` option.

## `useFolderLinkFromSameNameSubFile`

- Type: `boolean`
- Default: `false`

If this value is `true`, then if a subfile with the same name as the folder exists, a link will be created in the folder to navigate to that file, and the file will not be displayed in the child item.

For example, if you have a folder that looks like this:

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

A link is added to the `api` folder, and the `api` page in the `api` folder is not included in the menu listing. Clicking the link in the folder displays the file in `api/api.md`.

## `folderLinkNotIncludesFileName`

- Type: `boolean`
- Default: `false`

This option is only used in special cases: when you have a [rewrite](https://vitepress.dev/guide/routing#route-rewrites) rule and a subfile with the same folder name exists, use it in parallel with the `useFolderLinkFromSameNameSubFile` option.

**Note:** If you enable this option without configuring VitePress rewrites, clicking folder links will result in a 404 error. Make sure to set up the corresponding rewrite rules in your VitePress config.

If this value is `true`, when establishing a folder link, ignore the existence of child items and specify the link only as a folder path.

For example, if you have a folder that looks like this:

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

With the `useFolderLinkFromSameNameSubFile` option, clicking on the guide/api folder menu will take you to `guide/api/api`, but if you use the `folderLinkNotIncludesFileName` option with it, the link will be `guide/api/`.

To make this work, you need to configure VitePress rewrites to map the folder path to the actual file. Add the following to your `.vitepress/config.ts`:

```typescript
export default defineConfig({
  rewrites: {
    'guide/api/api.md': 'guide/api/index.md'
  }
});
```

Or use a dynamic rewrite function for multiple folders:

```typescript
export default defineConfig({
  rewrites(id) {
    // Rewrites 'folder/folder.md' to 'folder/index.md'
    return id.replace(/([^/]+)\/\1\.md$/, '$1/index.md');
  }
});
```

## `keepMarkdownSyntaxFromTitle`

- Type: `boolean`
- Default: `false`

If this value is `true`, preserves the Markdown syntax contained in the title text without removing it. Usually retains any highlighting or inline code. Hyperlink text is removed regardless of this option.

## `debugPrint`

- Type: `boolean`
- Default: `false`

If this value is `true`, prints the objects created after execution to the console log. If you configured Multiple sidebars, it will output all sidebar results even if you only include one of the options.
