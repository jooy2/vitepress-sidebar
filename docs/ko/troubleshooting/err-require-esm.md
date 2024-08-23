---
title: 'CommonJS: ERR_REQUIRE_ESM'
---

# `CommonJS: ERR_REQUIRE_ESM`

`vitepress-sidebar`는 **ESM** 모듈입니다. 프로젝트에서 **CJS**를 사용하는 경우 **ESM** 모듈로 변환해야 합니다.

**ESM** 모듈에 대한 자세한 내용은 아래를 참조하세요: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

이러한 문제를 해결하기 위한 몇 가지 해결책이 아래에 나와 있습니다:

### 해결책 A

CJS 프로젝트에 사용하려는 경우 파일 확장자를 `.js`에서 `.mjs`로 변경한 후 다시 시도하세요. 특정 파일에 모듈 스크립트를 사용하도록 정의할 수 있습니다.

### 해결책 B

`package.json` 파일에 `"type": "module"` 줄을 추가합니다. 이 경우 프로젝트를 ESM 프로젝트로 변환해야 할 수도 있습니다.

```json5
{
  name: 'docs',
  type: 'module', // <-- 이 부분을 추가하세요.
  version: '1.0.0',
  scripts: {
    dev: 'vitepress dev src',
    build: 'vitepress build src',
    serve: 'vitepress serve src'
  }
}
```
