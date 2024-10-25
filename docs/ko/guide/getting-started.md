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
# via npm
$ npm i -D vitepress-sidebar

# via yarn
$ yarn add -D vitepress-sidebar

# via pnpm
$ pnpm i -D vitepress-sidebar
```

## 사용 방법

VitePress Sidebar의 `generateSidebar` 메서드를 사용하여 사이드바를 자동으로 생성할 수 있습니다.

지정된 루트 경로(`documentRootPath`)에 대해 폴더를 검색하고 VitePress에서 마크다운 파일을 작성하기 전에 찾은 다음 폴더 트리 구조에 따라 생성된 메뉴를 반환합니다.

먼저 아래 두 가지 방법 중 하나로 `vitepress-sidebar`를 import합니다.

### 1. named-import 사용

```javascript
// `.vitepress/config.js`
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions)
  }
});
```

### 2. default-import 사용

```javascript
// `.vitepress/config.js`
import VitePressSidebar from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default defineConfig({
  themeConfig: {
    sidebar: VitePressSidebar.generateSidebar(vitepressSidebarOptions)
  }
});
```

VitePress의 구성 파일인 `.vitepress/config.js` 파일의 `themeConfig.sidebar` 속성에서 `generateSidebar` 메서드를 사용합니다. VitePress의 구성 파일은 프로젝트 설정에 따라 파일 이름이나 확장자가 다를 수 있습니다.

이것이 어떻게 출력되는지 테스트하려면 `debugPrint` 옵션을 `true`로 설정하여 VitePress를 빌드해 보세요. 콘솔에 출력이 표시될 것입니다.

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
