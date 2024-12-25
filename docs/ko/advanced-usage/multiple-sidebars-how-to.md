# 다중 사이드바

다중 사이드바는 특정 URI 경로에 따라 서로 다른 사이드바 메뉴를 표시할 수 있는 기능입니다.

이것은 몇 가지 간단한 설정으로 `vitepress-sidebar`에서 쉽게 구현할 수 있습니다. 결국 **VitePress**는 의도한 대로 옵션을 출력합니다.

다중 사이드바에 대해 자세히 알아보려면 먼저 아래의 **VitePress** 공식 문서를 살펴보는 것이 좋습니다:

https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars

## 기본 사용법

먼저, 다음과 같이 `docs`라는 루트 프로젝트와 `guide` 및 `config`라는 하위 디렉터리가 있다고 가정해 보겠습니다:

```text
docs/
├─ guide/
│  ├─ index.md
│  ├─ one.md
│  ├─ two.md
│  └─ do-not-include.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

URL이 `/guide` 페이지에 있는 경우 사용자는 메뉴에 `guide`의 하위 메뉴만 표시하고 `config`의 하위 메뉴는 숨기기를 원합니다. 마찬가지로 `/config` 페이지에 `guide`의 하위 메뉴가 있을 때 하위 메뉴를 숨기려고 합니다.

이를 `vitepress-sidebar`에서 구현하려면 기존 설정과 다르게 접근해야 합니다.

이전과 같이 `withSidebar` 함수를 사용하되 배열을 전달합니다. 배열에는 `vitepress-sidebar`의 옵션이 하나 이상 포함됩니다. 배열의 값은 원하는 만큼의 URL을 지정할 수 있습니다. 물론 다른 설정으로 구성할 수도 있습니다.

```javascript
// 배열 인수를 전달해야 함!!!!
const vitePressConfigs = {
  /* ... */
};

export default defineConfig(
  withSidebar(vitePressConfigs, [
    {
      documentRootPath: 'docs',
      scanStartPath: 'guide',
      basePath: '/guide/',
      resolvePath: '/guide/',
      useTitleFromFileHeading: true
    },
    {
      documentRootPath: 'docs',
      scanStartPath: 'config',
      resolvePath: '/config/',
      useTitleFromFrontmatter: true
    }
  ])
);
```

이러한 옵션의 값은 다음과 같이 결과에 사용됩니다:

```text
{
  <resolvePath>: [
    {
      base: <basePath or resolvePath>,
      items: [...] // `<scanStartPath>/path/to/items`
    }
  ]
}
```

다음은 위 설정의 출력 예시입니다:

```json5
{
  '/guide/': {
    base: '/guide/',
    items: [
      {
        text: 'One',
        link: 'one'
      },
      {
        text: 'Two',
        link: 'two'
      }
    ]
  },
  '/config/': {
    base: '/config/',
    items: [
      {
        text: 'Three',
        link: 'three'
      },
      {
        text: 'Four',
        link: 'four'
      }
    ]
  }
}
```

## 다중 사이드바 설정

다중 사이드바에서 사용할 수 있는 옵션은 다음과 같습니다: `scanStartPath`, `basePath` 및 `resolvePath`. 각 옵션은 선택 사항이지만 상황에 따라 올바르게 사용할 수 있어야 합니다.

각 옵션은 아래에 설명되어 있습니다. 그러나 먼저 [옵션](/ko/guide/options) 페이지에서 각 옵션에 대한 설명을 참조하는 것이 좋습니다.

아래 설명은 다음 예시를 기반으로 합니다:

```text
docs/
├─ .vitepress/
├─ guide/
│  ├─ api/
│  │  ├─ api-one.md
│  │  └─ api-two.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

### `scanStartPath`

이 옵션은 다른 라우팅 규칙의 루트 경로로 다른 디렉터리를 지정하는 데 사용됩니다. `documenRootPath`는 실제로 스캔할 루트 경로(`.vitepress` 디렉터리가 있는 위치)이고 `scanStartPath`는 이 경로 규칙에서 실제로 표시되어야 하는 루트 경로입니다.

예를 들어 `/guide` 디렉터리에 있는 파일만 포함하려면 `scanStartPath`의 값을 `guide`로 지정합니다. 단, `documentRootPath`의 경로는 포함되지 않아야 합니다.

### `resolvePath`

이 옵션은 특정 URI를 발견했을 때 관련 메뉴를 표시하기 위해 VitePress에서 사용합니다. 예를 들어 `example.com/guide/api`에 도달할 때 `guide/api` 디렉토리의 내용만 표시하려면 `resolvePath`의 값은 `/guide/api`가 됩니다. 경로 앞에 `/`를 포함하는 것이 좋습니다.

이 값은 일반적으로 `scanStartPath`와 비슷한 값을 갖지만, **i18n** 라우팅을 위해 다르게 지정해야 하는 경우도 있습니다.

### `basePath`

이 옵션은 주로 VitePress의 `rewrite` 규칙으로 작업할 때 사용되며, 그 외에는 선택 사항입니다.

VitePress에서 `base` 경로의 값을 대체합니다. 이 값을 지정하지 않으면 `resolvePath` 값 또는 루트 경로(`/`)가 지정됩니다.

디렉토리의 실제 경로가 URI의 경로 구조와 다른 경우 다시 쓰기를 통해 제공된 페이지로 이동할 수 있어야 합니다. 일반적으로 사이드바는 루트 디렉터리를 기반으로 경로를 생성하며 VitePress의 다시 쓰기 경로를 참조하지 않습니다.

예를 들어 다음과 같은 재작성 규칙이 있다고 가정해 보겠습니다:

```javascript
const vitePressConfigs = {
  rewrites: {
    'guide/:page': 'help/:page'
  }
};

const vitePressSidebarConfigs = [
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
    resolvePath: '/guide/'
  }
];

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

`guide/one.md` 문서가 `help/one` 경로에 표시됩니다. 그러나 이렇게 하면 사이드바가 경로인 `help/one`을 그대로 찾으려고 하기 때문에 메뉴가 표시되지 않습니다.

이 문제를 해결하려면 `basePath`의 경로를 `help`로 변경하세요:

```javascript
const vitePressConfigs = {
  rewrites: {
    'guide/:page': 'help/:page'
  }
};

const vitePressSidebarConfigs = [
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide',
    basePath: 'help', // <---------------------- 이 라인을 추가합니다.
    resolvePath: '/guide/'
  }
];

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

## 복잡한 경로 및 URI가 있는 메뉴 표시하기

위의 예는 일반적으로 경로가 단계로 정의된 경우이지만, 단계가 깊은 폴더를 표시하려는 경우, 특히 URI가 더 짧거나 실제 폴더 경로와 다른 규칙을 사용하는 경우에는 추가 방법을 사용해야 합니다. 예를 들어 다음과 같은 폴더 구조가 있습니다:

```text
docs/
├─ guide/
│  ├─ api/
│  │  ├─ api-one.md
│  │  └─ api-two.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

이번에는 `/api`라는 한 단계 URI에 도달했을 때 `docs/guide/api`의 메뉴를 표시하고 싶습니다. 예상되는 메뉴는 `api-one.md`와 `api-two.md`만 표시하는 것입니다.

```javascript
withSidebar([
  {
    documentRootPath: 'docs',
    scanStartPath: 'guide/api',
    resolvePath: '/api/'
  }
]);
```

하지만 이렇게 옵션을 구성하면 `api` 디렉터리가 `guide`의 하위 디렉터리이기 때문에 메뉴를 표시할 수 없습니다. **VitePress**는 이를 감지하지 못하고 존재하지 않는 문서로 이동합니다.

이를 해결하려면 **VitePress**의 라우팅 기능을 병행해서 사용해야 합니다. 관련 내용은 아래 글을 참고하세요:

https://vitepress.dev/guide/routing#route-rewrites

위의 예에 따라 `defineConfig`의 VitePress 설정에 `rewrites` 옵션을 추가합니다:

```javascript
const vitePressConfigs = {
  /* [START] Add This */
  rewrites: {
    'guide/api/:page': 'api/:page'
  }
  /* [END] Add This */
};

const vitePressSidebarConfigs = {
  documentRootPath: 'docs',
  scanStartPath: 'guide/api',
  resolvePath: '/api/'
};

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs));
```

이제 URI 경로가 `/api`로 시작하면 `docs/guide/api`의 하위 메뉴가 표시됩니다!
