# 국제화

이 페이지에서는 VitePress Sidebar를 사용하여 i18n (internationalization)을 달성하는 방법을 기술합니다.

VitePress에서는 다국어 문서를 지원합니다. 번역된 마크다운 파일을 각 언어별 디렉토리에 배치하고 VitePress의 `defineConfig`의 `locales` 옵션을 사용할 경우 언어 선택기가 표시되며 각 언어별로 지정된 디렉토리의 문서를 표시합니다.

## 페이지 레이아웃 번역 (수동)

먼저 VitePress에서는 각종 레이아웃 인터페이스 요소를 번역할 수 있습니다. 여기서 레이아웃은 '이전', '다음', '목차', '테마 변경'과 같은 기능에 대한 관련된 모든 텍스트를 의미합니다. 또한 검색 기능에 표시되는 모든 텍스트 번역을 포함합니다.

VitePress 페이지에 있는 각종 인터페이스(레이아웃) 텍스트는 `locales`에 언어별로 번역된 텍스트를 제공할 수 있습니다. 예를 들면 다음과 같습니다:

```text
"locales": {
  "root": {
    "lang": "en-US",
    "label": "English",
    "description": "VitePress Sidebar is a VitePress plugin that automatically generates sidebar menus with one setup and no hassle. Save time by easily creating taxonomies for tons of articles.",
    "themeConfig": {
      "docFooter": {
        "prev": "Previous page",
        "next": "Next page"
      },
      "outline": {
        "label": "On this page"
      },
      "lastUpdated": {
        "text": "Last updated"
      },
      "langMenuLabel": "Change language",
      "returnToTopLabel": "Return to top",
      "sidebarMenuLabel": "Menu",
      "darkModeSwitchLabel": "Appearance",
      "lightModeSwitchTitle": "Switch to light theme",
      "darkModeSwitchTitle": "Switch to dark theme"
    }
  },
  "ko": {
    "lang": "ko-KR",
    "label": "한국어",
    "description": "VitePress Sidebar는 번거로운 작업 없이 한번의 설정만으로 사이드바 메뉴를 자니다. 수많은 문서에 대한 분류를 손쉽게 만들어 시간을 절약하세요.",
    "themeConfig": {
      "docFooter": {
        "prev": "이전",
        "next": "다음"
      },
      "outline": {
        "label": "이 페이지 콘텐츠"
      },
      "lastUpdated": {
        "text": "업데이트 일자"
      },
      "langMenuLabel": "언어 변경",
      "returnToTopLabel": "맨 위로",
      "sidebarMenuLabel": "사이드바 메뉴",
      "darkModeSwitchLabel": "다크 모드",
      "lightModeSwitchTitle": "라이트 모드로 변경",
      "darkModeSwitchTitle": "다크 모드로 변경"
    }
  }
}
```

(`root` 언어는 페이지에서 주 언어를 의미합니다.)

레이아웃 번역을 자세히 알아보려면 다음 문서를 참고하세요: https://vitepress.dev/ko/guide/i18n

검색 기능에 표시되는 텍스트의 경우 `defineConfig`의 `themeConfig.search` 옵션에서 설정해야 합니다. 예를 들면 다음과 같습니다:

```text
"themeConfig": {
  "search": {
    "provider": "local",
    "options": {
      "locales": {
        "root": {
          "translations": {
            "button": {
              "buttonText": "Search",
              "buttonAriaLabel": "Search"
            },
            "modal": {
              "displayDetails": "Display detailed list",
              "resetButtonTitle": "Reset search",
              "backButtonTitle": "Close search",
              "noResultsText": "No results for",
              "footer": {
                "selectText": "to select",
                "selectKeyAriaLabel": "enter",
                "navigateText": "to navigate",
                "navigateUpKeyAriaLabel": "up arrow",
                "navigateDownKeyAriaLabel": "down arrow",
                "closeText": "to close",
                "closeKeyAriaLabel": "escape"
              }
            }
          }
        },
        "ko": {
          "translations": {
            "button": {
              "buttonText": "검색",
              "buttonAriaLabel": "검색"
            },
            "modal": {
              "displayDetails": "상세 목록 표시",
              "resetButtonTitle": "검색 초기화",
              "backButtonTitle": "검색 닫기",
              "noResultsText": "결과를 찾을 수 없음",
              "footer": {
                "selectText": "선택",
                "selectKeyAriaLabel": "선택하기",
                "navigateText": "탐색",
                "navigateUpKeyAriaLabel": "위로",
                "navigateDownKeyAriaLabel": "아래로",
                "closeText": "닫기",
                "closeKeyAriaLabel": "esc"
              }
            }
          }
        }
      }
    }
  }
}
```

## 페이지 레이아웃 번역 (자동)

VitePress Sidebar의 패밀리 플러그인인 [VitePress I18n](https://vitepress-i18n.cdget.com/ko/)을 사용하면 위와 같이 수동으로 번역하는 과정을 자동화할 수 있습니다. 몇가지 간단한 설정만으로 레이아웃 번역에 시간을 투자하지 않아도 됩니다!

아래 명령어로 VitePress I18n 모듈을 설치하세요:

```shell
$ npm i -D vitepress-i18n
```

그리고 `defineConfig`에 다음과 같이 설정합니다:

```javascript
import { withSidebar } from 'vitepress-sidebar';
import { withI18n } from 'vitepress-i18n';

const vitePressConfig = {
  // VitePress config
};

const vitePressSidebarConfig = {
  // VitePress Sidebar config
};

const vitePressI18nConfig = {
  // VitePress I18n config
  locales: ['en', 'ko'], // first locale 'en' is root locale
  searchProvider: 'local' // enable search with auto translation
};

export default defineConfig(
  withSidebar(withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig)
);
```

이제 인터페이스 번역은 모듈에게 맡기세요! 물론 세부적인 텍스트도 커스터마이징 할 수 있습니다.

자세한 내용은 VitePress I18n의 문서 페이지를 읽어주세요: https://vitepress-i18n.cdget.com/ko/guide/getting-started

## 언어별 사이드바 설정

VitePress에서 언어별로 사이드바를 다르게 표시할 수 있습니다. 예를 들면 다음과 같은 폴더 구조를 가지고 있다고 가정해보겠습니다:

```text
/
├─ package.json
├─ docs/
│  ├─ .vitepress/
│  │  └─ config.js
│  ├─ en/
│  │  └─ abc.md
│  ├─ ko/
│  │  └─ abc.md
│  └─ zhHans/
│     └─ abc.md
└─ ...
```

예시의 `abc.md`는 각 언어로 번역된 같은 문서입니다. 언어를 각각 영어, 한국어, 중국어로 변경할 경우 사이드바는 각 디렉토리 `en`, `ko`, `zhHans`를 스캔하여 언어에 맞는 제목을 가져 올 것입니다.

이를 달성하는 예시는 다음과 같습니다:

```javascript
const rootLocale = 'en'
const supportedLocales = [rootLocale, 'ko', 'zhHans'];

const vitePressConfigs = {
  rewrites: {
    'en/:rest*': ':rest*'
  }
}

const commonSidebarConfigs = {
  // Sidebar common configurations
}

const vitePressSidebarConfigs = [
  ...supportedLocales.map((lang) => {
    return {
      ...commonSidebarConfigs,
      ...(rootLocale === lang ? {} : { basePath: `/${lang}/` }), // If using `rewrites` option
      documentRootPath: `/docs/${lang}`,
      resolvePath: rootLocale === lang ? '/' : `/${lang}/`,
    };
  })
]

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarConfigs)
```

먼저 `rewrites`는 root 언어인 영어(`en` 디렉토리)를 사용 중일 때, URI 경로에 `/en/`을 표시하지 않게 해줍니다. (이는 선택사항입니다.)

다음으로 `sidebar`의 설정은 기존과 비슷하지만, 각 언어별 디렉토리로 구성된 다중 사이드바를 설정해야 합니다. 각 옵션에 대한 설명은 다음과 같습니다:

- `basePath`: `rewrites` 규칙과 함께 사용 중일 때 root 로캐일이면 `/en/` 경로를 가리키지 않도록 합니다.
- `documentRootPath`: 실제 문서 파일이 위치한 루트 경로입니다. 각 언어별로 `en`, `ko`, `zhHans` 디렉토리를 찾도록 합니다.
- `resolvePath`: `/docs` 디렉토리로부터 실제로 사이드바 목록을 스캔해야 할 파일의 위치입니다. root 로캐일을 제외하고 각 언어별로 디렉토리 위치를 지정합니다.

이렇게 하면 언어 마다 지정한 디렉토리의 문서만 사이드바에서 표시할 수 있도록 합니다. 위는 예시이므로 프로젝트의 규모나 디렉토리 구조에 따라 옵션 설정을 다르게 해야 할 수 있습니다.
