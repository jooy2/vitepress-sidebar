# Configuration File

Instead of passing every option to `withSidebar` or `generateSidebar`, you can place a `sidebar.config.json` file in your project and let VitePress Sidebar pick it up automatically.

A configuration file applies to the folder it lives in **and to every subfolder below it**, so each part of your documentation can define its own rules. Options declared closer to a document always win, much like a nested `tsconfig.json`.

The file name is fixed. `sidebar.config.json` is the only name that is recognized.

## Basic usage

Create a `sidebar.config.json` next to your documents:

```json
// docs/sidebar.config.json
{
  "collapsed": true,
  "capitalizeFirst": true,
  "useTitleFromFileHeading": true
}
```

With the file above in place, this is all you need in your VitePress config:

```javascript
// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

export default defineConfig(withSidebar({ title: 'My Docs' }));
```

## Overriding options per folder

Assume a project like this:

```text
docs/
├─ sidebar.config.json        <-- applies to everything below `docs`
├─ index.md
├─ guide/
│  ├─ one.md
│  └─ two.md
└─ api/
   ├─ sidebar.config.json     <-- applies to everything below `api`
   ├─ three.md
   └─ internal/
      └─ four.md
```

```json
// docs/sidebar.config.json
{
  "collapsed": true,
  "sortMenusByName": true
}
```

```json
// docs/api/sidebar.config.json
{
  "collapsed": false,
  "sortMenusOrderByDescending": true,
  "excludeByGlobPattern": ["internal/"]
}
```

The `guide` folder is collapsed and sorted by name, while the `api` folder is expanded, sorted in reverse and hides its `internal` directory. Every option that `docs/api/sidebar.config.json` does not declare is inherited from `docs/sidebar.config.json`.

Note that paths in `excludeByGlobPattern` are relative to the folder that owns the configuration file, not to `documentRootPath`.

## Priority

Options are merged in the following order, where a later entry overrides an earlier one:

1. Options passed to `withSidebar` or `generateSidebar`
2. `sidebar.config.json` of the parent folders, from the shallowest to the deepest
3. `sidebar.config.json` of the folder itself

In other words, a configuration file always takes priority over the options you pass as an argument.

## Automatic `documentRootPath`

When you do not pass `documentRootPath`, it is derived from where the configuration files are: the closest common parent directory of every `sidebar.config.json` found in the project becomes the document root.

```text
/
├─ package.json
├─ src/
└─ docs/                      <-- `documentRootPath` becomes `/docs`
   ├─ sidebar.config.json
   ├─ .vitepress/
   └─ index.md
```

If you prefer to keep the configuration file in the project root, declare the path explicitly. `documentRootPath` is only read from a `sidebar.config.json` that sits in the directory VitePress is run from:

```json
// sidebar.config.json
{
  "documentRootPath": "docs",
  "collapsed": true
}
```

Directories such as `node_modules`, `dist`, `build`, `out`, `coverage`, `target`, `vendor` and any directory whose name starts with a dot are skipped while searching for configuration files.

## Options that cannot be used in every folder

Some options describe the sidebar as a whole rather than a single folder. They are only read from configuration files located between the directory VitePress is run from and the scan root, and are ignored (with a warning) in any file below it:

- [documentRootPath](/guide/options#documentrootpath)
- [scanStartPath](/guide/options#scanstartpath)
- [resolvePath](/guide/options#resolvepath)
- [basePath](/guide/options#basepath)
- [rootGroupText](/guide/options#rootgrouptext)
- [rootGroupLink](/guide/options#rootgrouplink)
- [rootGroupCollapsed](/guide/options#rootgroupcollapsed)
- [includeRootIndexFile](/guide/options#includerootindexfile)
- [removePrefixAfterOrdering](/guide/options#removeprefixafterordering)
- [debugPrint](/guide/options#debugprint)

Any key that is not a VitePress Sidebar option is ignored with a warning as well, and so is a value of the wrong type, so a mistake never changes the result silently:

```json
{
  "collapsed": "yes", // ignored: must be a boolean
  "excludeByGlobPattern": "*", // ignored: must be an array of strings
  "sortFolderTo": "up" // ignored: must be one of 'top', 'bottom'
}
```

A `null` value is always accepted and leaves the option unset. The `$schema` key is always allowed as well, which lets your editor attach a JSON schema.

## Multiple sidebars

Configuration files work with [multiple sidebars](/advanced-usage/multiple-sidebars-how-to) too. Each entry of the array resolves its own configuration files, and a file placed in the directory a sidebar starts scanning from acts as the root configuration for that sidebar.
