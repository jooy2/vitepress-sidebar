---
title: 'CommonJS: ERR_REQUIRE_ESM'
---

# `ERR_REQUIRE_ESM`

`vitepress-sidebar` is an **ESM** module. If your project is using **CJS**, you will need to convert it to an **ESM** module.

For more information about the **ESM** module, see below: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

To address these issues, there are several solutions below:

### Solution A

If you are trying to use it with a CJS project, change the file extension from `.js` to `.mjs` and try again. You can define that you want to use the module script for a specific file.

### Solution B

in the `package.json` file, add the line `"type": "module"` line. This may require the project to be converted to an ESM project.

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
