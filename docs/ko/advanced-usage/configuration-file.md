# 설정 파일

모든 옵션을 `withSidebar`나 `generateSidebar`에 전달하는 대신, 프로젝트에 `sidebar.config.json` 파일을 두면 VitePress Sidebar가 이를 자동으로 인식합니다.

설정 파일은 해당 파일이 위치한 폴더와 **그 하위의 모든 폴더**에 적용되므로, 문서의 영역마다 서로 다른 규칙을 정의할 수 있습니다. 중첩된 `tsconfig.json`처럼 문서에 더 가까운 곳에서 선언된 옵션이 항상 우선합니다.

파일 이름은 고정되어 있습니다. `sidebar.config.json`만 인식됩니다.

## 기본 사용법

문서가 있는 위치에 `sidebar.config.json`을 생성합니다:

```json
// docs/sidebar.config.json
{
  "collapsed": true,
  "capitalizeFirst": true,
  "useTitleFromFileHeading": true
}
```

위 파일이 있다면 VitePress 설정에는 다음 내용만 있으면 됩니다:

```javascript
// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

export default defineConfig(withSidebar({ title: 'My Docs' }));
```

## 폴더별로 옵션 재정의하기

다음과 같은 프로젝트를 가정합니다:

```text
docs/
├─ sidebar.config.json        <-- `docs` 하위 전체에 적용
├─ index.md
├─ guide/
│  ├─ one.md
│  └─ two.md
└─ api/
   ├─ sidebar.config.json     <-- `api` 하위 전체에 적용
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

`guide` 폴더는 접힌 상태로 이름순 정렬되고, `api` 폴더는 펼쳐진 상태로 역순 정렬되며 `internal` 디렉토리를 숨깁니다. `docs/api/sidebar.config.json`에 선언되지 않은 옵션은 모두 `docs/sidebar.config.json`에서 상속됩니다.

`excludeByGlobPattern`의 경로는 `documentRootPath`가 아니라 해당 설정 파일이 있는 폴더를 기준으로 합니다.

## 폴더 자신을 정의하기

지금까지의 옵션은 폴더의 **내용**을 어떻게 생성할지 결정합니다. `$folder` 키는 사이드바에 표시되는 폴더 자신을 정의하며, 해당 폴더 하나에만 적용됩니다. 하위 폴더는 이 값을 상속하지 않습니다.

```json
// docs/guide/sidebar.config.json
{
  "collapsed": true,

  "$folder": {
    "order": 1,
    "text": "Getting Started",
    "link": "/guide/install"
  }
}
```

| 키 | 타입 | 설명 |
| --- | --- | --- |
| `order` | `number` | 형제 항목들 사이에서 폴더의 위치. [sortMenusByFrontmatterOrder](/ko/guide/options#sortmenusbyfrontmatterorder)가 켜져 있을 때 읽습니다. |
| `text` | `string` | 폴더의 메뉴 제목. |
| `link` | `string` | 폴더가 연결할 페이지. |

`$folder`가 없으면 폴더의 이름과 링크, 순서는 그 안의 `index.md`를 통해서만 지정할 수 있으며, 여기에는 두 가지 제약이 따릅니다:

- 폴더 자체로 보여줄 페이지가 없어도 `index.md`를 만들어야 합니다.
- 그 `index.md`의 `order`가 형제 항목들 사이의 폴더 위치와 폴더 내부에서의 `index.md` 위치를 **동시에** 결정하므로, 두 값을 따로 정할 수 없습니다.

`$folder`는 두 제약을 모두 없앱니다:

```text
docs/
├─ guide/
│  ├─ sidebar.config.json     { "$folder": { "order": 1 } }
│  ├─ index.md                order: 1
│  └─ install.md              order: 2
└─ api/
   ├─ sidebar.config.json     { "$folder": { "order": 2, "text": "API", "link": "/api/reference" } }
   └─ reference.md
```

`guide`가 먼저, `api`가 그다음에 오면서도 `guide/index.md`는 자기 폴더 안에서 맨 위에 남습니다. `api`는 `index.md` 없이 순서와 이름, 링크가 지정됩니다.

`$folder`에 선언한 값은 폴더 이름이나 `index.md`에서 가져온 값보다 항상 우선합니다. 문서 루트와 같거나 그보다 위에 있는 폴더는 사이드바 항목이 아니므로, 그 위치의 설정 파일에서는 `$folder`가 경고와 함께 무시됩니다.

## 우선순위

옵션은 다음 순서로 병합되며, 뒤에 있는 항목이 앞의 항목을 덮어씁니다:

1. `withSidebar` 또는 `generateSidebar`에 전달한 옵션
2. 상위 폴더의 `sidebar.config.json` (얕은 곳에서 깊은 곳 순)
3. 해당 폴더 자신의 `sidebar.config.json`

즉, 설정 파일은 항상 인수로 전달한 옵션보다 우선합니다.

## `documentRootPath` 자동 인식

`documentRootPath`를 전달하지 않으면 설정 파일의 위치로부터 값을 유추합니다. 프로젝트에서 발견된 모든 `sidebar.config.json`의 가장 가까운 공통 상위 디렉토리가 문서 루트가 됩니다.

```text
/
├─ package.json
├─ src/
└─ docs/                      <-- `documentRootPath`가 `/docs`가 됩니다
   ├─ sidebar.config.json
   ├─ .vitepress/
   └─ index.md
```

설정 파일을 프로젝트 루트에 두고 싶다면 경로를 명시적으로 선언하세요. `documentRootPath`는 VitePress가 실행되는 디렉토리에 있는 `sidebar.config.json`에서만 읽습니다:

```json
// sidebar.config.json
{
  "documentRootPath": "docs",
  "collapsed": true
}
```

설정 파일을 탐색할 때 `node_modules`, `dist`, `build`, `out`, `coverage`, `target`, `vendor` 및 이름이 점으로 시작하는 디렉토리는 제외됩니다.

## 모든 폴더에서 사용할 수 없는 옵션

일부 옵션은 특정 폴더가 아니라 사이드바 전체를 정의합니다. 이러한 옵션은 VitePress가 실행되는 디렉토리부터 스캔 시작 경로 사이에 있는 설정 파일에서만 읽으며, 그보다 아래에 있는 파일에서는 경고와 함께 무시됩니다:

- [documentRootPath](/ko/guide/options#documentrootpath)
- [scanStartPath](/ko/guide/options#scanstartpath)
- [resolvePath](/ko/guide/options#resolvepath)
- [basePath](/ko/guide/options#basepath)
- [rootGroupText](/ko/guide/options#rootgrouptext)
- [rootGroupLink](/ko/guide/options#rootgrouplink)
- [rootGroupCollapsed](/ko/guide/options#rootgroupcollapsed)
- [includeRootIndexFile](/ko/guide/options#includerootindexfile)
- [removePrefixAfterOrdering](/ko/guide/options#removeprefixafterordering)
- [debugPrint](/ko/guide/options#debugprint)

VitePress Sidebar의 옵션이 아닌 키, 그리고 타입이 맞지 않는 값 역시 경고와 함께 무시되므로 실수 때문에 결과가 조용히 달라지는 일은 없습니다:

```json
{
  "collapsed": "yes", // 무시됨: boolean이어야 합니다
  "excludeByGlobPattern": "*", // 무시됨: 문자열 배열이어야 합니다
  "sortFolderTo": "up" // 무시됨: 'top' 또는 'bottom'이어야 합니다
}
```

`null` 값은 항상 허용되며 해당 옵션을 설정하지 않은 것으로 처리합니다. `$schema` 키도 항상 허용되며 편집기에서 JSON 스키마를 연결할 때 사용할 수 있습니다.

## 다중 사이드바

설정 파일은 [다중 사이드바](/ko/advanced-usage/multiple-sidebars-how-to)에서도 동작합니다. 배열의 각 항목이 자신의 설정 파일을 각각 확인하며, 사이드바의 스캔이 시작되는 디렉토리에 있는 파일이 해당 사이드바의 루트 설정이 됩니다.
