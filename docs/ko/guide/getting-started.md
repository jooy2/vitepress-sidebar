---
order: 1
---

# 시작하기

이 페이지에서는 VitePress Sidebar 모듈의 설치 및 사용 방법을 안내합니다.

## 설치

먼저 이 모듈을 사용하기 전에 **[VitePress](https://vitepress.dev)** 모듈을 사전 구성해야 할 수 있습니다.

Node.js 버전은 18.x 이상을 사용하는 것이 좋습니다. **VitePress Sidebar**는 `ESM`으로 작성되었습니다. CommonJS 환경에서 사용하려면 [여기 지침을 참조하세요](/ko/troubleshooting/err-require-esm).

[NPM](https://www.npmjs.com/package/vitepress-sidebar) 또는 다른 노드 모듈 패키지 관리자를 사용하여 모듈을 설치할 수 있습니다. 이 패키지는 개발자 환경에서만 사용되므로 `devDependencies`에 설치해야 합니다. 아래 명령어로 설치하세요:

```shell
# `npm`으로 설치
$ npm i -D vitepress-sidebar

# `yarn`으로 설치
$ yarn add -D vitepress-sidebar

# `pnpm`으로 설치
$ pnpm i -D vitepress-sidebar
```

## 동작 과정

VitePress Sidebar는 귀하의 프로젝트의 폴더에서 지정한 폴더 경로(`documentRootPath`)를 기준으로 폴더와 마크다운 파일을 계층별로 스캔합니다.

이후 설정에 따라 특정 파일을 제외, 정렬, 포맷팅하여 사이드바 메뉴의 제목을 읽어온 후 VitePress에서 요구하는 사이드바 스펙에 따라 설정 데이터를 최종적으로 출력하게 됩니다.

결과적으로는 VitePress의 `config.js` 파일은 다음과 같이 변환 될 것입니다.

```javascript
export default {
  themeConfig: {
    sidebar: [
      // VitePress Sidebar의 출력 결과
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ]
  }
};
```

이로 인해 `sidebar`의 각 메뉴에 대한 수동 작성이 필요하지 않습니다.

## 사용 방법

VitePress Sidebar는 `withSidebar`와 `generateSidebar` 두가지 함수로 사이드 바를 자동으로 생성할 수 있습니다. 이 둘의 동작은 같지만 함수를 사용하는 위치가 다릅니다. 일반적으로는 `withSidebar`를 사용하는 것을 권장합니다.

설치한 모듈을 코드에 가져오려면 VitePress의 `config.js` 파일을 엽니다. 이 파일은 `.vitepress` 디렉토리에 위치하며 프로젝트에 따라 다른 확장자의 이름일 수 있으니 유의하시기 바랍니다.

파일을 열고 아래 두가지 방법 중 하나를 사용하여 `vitepress-sidebar`를 사용할 수 있습니다:

### 1. `withSidebar` 사용 (권장)

`withSidebar`는 `defineConfig`레벨에서 사용합니다. 이 때 주의할 점은 VitePress의 설정 객체가 첫번째 파라미터에, 이후 VitePress Sidebar의 옵션이 두번째 파라미터에 위치해야 합니다.

VitePress Sidebar는 기존 VitePress의 옵션에 필요한 추가 옵션을 오버라이딩 할 것입니다. 기존에 설정한 수동 `sidebar` 옵션은 새 옵션에 의해 무시됩니다.

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  // VitePress의 옵션
  title: 'VitePress Sidebar',
  themeConfig: {
    // ...
  }
};

const vitePressSidebarOptions = {
  // VitePress Sidebar의 옵션
  documentRootPath: '/',
  collapsed: false,
  capitalizeFirst: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

### 2. `generateSidebar` 사용

`generateSidebar`는 `themeConfig.sidebar` 레벨에서 사용할 수 있습니다. 이는 좀 더 세부적인 `themeConfig` 설정을 위해 코드 분리가 필요할 때 사용할 수 있습니다.

```javascript
// `.vitepress/config.js`
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      // VitePress Sidebar의 옵션
    })
  }
});
```

VitePress Sidebar는 프로젝트의 문서를 스캔하기 위해 `documentRootPath` 옵션으로 작업 경로를 지정하여 올바른 위치를 알려주어야 합니다. 기본값은 `/`이지만 프로젝트에 따라 `docs`와 같이 별도의 폴더에 VitePress 프로젝트가 위치하는 경우에는 직접 경로를 지정해야 합니다.

프로젝트 루트 경로를 기준으로, `documentRootPath`의 경로는 `.vitePress` 폴더가 위치한 경로를 작성합니다.

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

위와 같은 구조의 프로젝트인 경우 아래와 같이 설정해야 합니다:

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {};

const vitePressSidebarOptions = {
  documentRootPath: '/docs'
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

사이드바 결과가 어떻게 출력되는지 테스트하려면 `debugPrint` 옵션을 `true`로 설정하여 VitePress를 빌드해 보세요. 콘솔에 출력이 표시될 것입니다.

`generateSidebar`의 설정에 대한 자세한 내용은 아래 **[옵션](/ko/guide/options)** 섹션을 참조하세요.

## 코드 예시

```javascript
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * 자세한 지침은 아래 링크를 참조하세요:
       * https://vitepress-sidebar.cdget.com/ko/guide/options
       */
      //
      // ============ [ RESOLVING PATHS ] ============
      // documentRootPath: '/',
      // scanStartPath: null,
      // resolvePath: null,
      // basePath: null,
      //
      // ============ [ GROUPING ] ============
      // collapsed: true,
      // collapseDepth: 2,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      //
      // ============ [ GETTING MENU TITLE ] ============
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // useFolderLinkFromIndexFile: false,
      // useFolderTitleFromIndexFile: false,
      // frontmatterTitleFieldName: 'title',
      //
      // ============ [ GETTING MENU LINK ] ============
      // useFolderLinkFromSameNameSubFile: false,
      // useFolderLinkFromIndexFile: false,
      // folderLinkNotIncludesFileName: false,
      //
      // ============ [ INCLUDE / EXCLUDE ] ============
      // excludePattern: ['README.md', 'folder/'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // includeDotFiles: false,
      // includeEmptyFolder: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      //
      // ============ [ STYLING MENU TITLE ] ============
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      // keepMarkdownSyntaxFromTitle: false,
      // removePrefixAfterOrdering: false,
      // prefixSeparator: '.',
      //
      // ============ [ SORTING ] ============
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // sortFolderTo: null,
      // sortMenusByName: false,
      // sortMenusByFileDatePrefix: false,
      // sortMenusByFrontmatterOrder: false,
      // frontmatterOrderDefaultValue: 0,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      //
      // ============ [ MISC ] ============
      // debugPrint: false,
    })
  }
});
```

## 출력 예시

```javascript
generateSidebar({
  documentRootPath: 'example',
  scanStartPath: 'javascript',
  useTitleFromFileHeading: true,
  hyphenToSpace: true,
  excludeFolders: ['vitepress-how-to']
});

/*
[
  {
    text: 'examples',
    items: [
      {
        text: 'Examples',
        link: '/javascript/examples/examples'
      }
    ]
  },
  {
    text: 'functions',
    items: [
      {
        text: 'prototypes',
        items: [
          {
            text: 'Array',
            items: [
              {
                text: 'Array.indexOf',
                link: '/javascript/functions/prototypes/Array/Array.indexOf'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'Getting Started',
    link: '/javascript/getting_started'
  }
];
*/
```
