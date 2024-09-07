---
title: 'CommonJS: ERR_REQUIRE_ESM'
---

# `CommonJS: ERR_REQUIRE_ESM`

`vitepress-sidebar`是一个**ESM**模块。如果您的项目使用**CJS**,则需要将其转换为**ESM**模块。

如需了解**ESM**模块的更多信息,请参阅以下内容:https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

为解决这些问题，有以下几种解决方案：

### 解决方案 A

如果您想在 CJS 项目中使用该模块，请将文件扩展名从`.js` 改为 `.mjs`，然后再试一次。您可以为特定文件定义模块脚本。

### 解决方案 B

在`package.json`文件中，添加`"type"："module"`行。这可能需要将项目转换为 ESM 项目。

```json5
{
  name: 'docs',
  type: 'module', // <-- 添加此内容
  version: '1.0.0',
  scripts: {
    dev: 'vitepress dev src',
    build: 'vitepress build src',
    serve: 'vitepress serve src'
  }
}
```
