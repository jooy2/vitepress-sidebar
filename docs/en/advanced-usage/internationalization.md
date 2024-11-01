# Internationalization

This page describes how to achieve internationalization (i18n) using VitePress Sidebar.

VitePress supports multilingual documentation. If you place translated markdown files in a directory for each language and use the `locales` option in VitePress's `defineConfig`, a language selector will be displayed and will show documents in the specified directory for each language.

## Translate page layouts (manually)

First, VitePress allows you to translate various layout interface elements. By layout, we mean all the associated text for features like 'Previous', 'Next', 'Table of Contents', and 'Change Theme'. It also includes translating any text that appears in the search function.

Various interface (layout) texts on a VitePress page can provide language-specific translations for `locales`. For example

```shell
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

(The `root` language is the primary language on the page).

To learn more about translating layouts, see the following articles: https://vitepress.dev/guide/i18n

For the text that appears in the search function, you need to set it in the `themeConfig.search` option in `defineConfig`, for example

```shell
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

## Translate page layouts (automatic)

[VitePress I18n](https://vitepress-i18n.cdget.com), a family plugin of VitePress Sidebar, allows you to automate the process of translating manually like above. With a few simple settings, you can stop spending hours translating layouts!

Install the VitePress I18n module with the command below:

```shell
$ npm i -D vitepress-i18n
```

And in `defineConfig`, set the following:

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

Now leave the interface translation to the module! Of course, you can customize the detailed text as well.

For more information, read the documentation page for VitePress I18n: https://vitepress-i18n.cdget.com/guide/getting-started

## Language-specific sidebar settings

In VitePress, you can display the sidebar differently for different languages. For example, let's say you have a folder structure like this

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

In the example, `abc.md` is the same document translated into each language. If you change the language to English, Korean, and Chinese respectively, the sidebar will scan each directory `en`, `ko`, and `zhHans` to get the title for the language.

Here's an example of how to accomplish this:

```shell
const rootLocale = 'en'
const supportedLocales = [rootLocale, 'ko', 'zhHans'];

const commonSidebarConfig = {
  // Sidebar common configurations
}

export default defineConfig({
  rewrites: {
    'en/:rest*': ':rest*'
  },
  themeConfig: {
    sidebar: generateSidebar([
      ...supportedLocales.map((lang) => {
        return {
          ...commonSidebarConfig,
          ...(rootLocale === lang ? {} : { basePath: `/${lang}/` }), // If using `rewrites` option
          documentRootPath: `/docs/${lang}`,
          resolvePath: rootLocale === lang ? '/' : `/${lang}/`,
        };
      })
    ]),
  }
})
```

First, `rewrites` allows you to suppress `/en/` in the URI path when you are using English as the root language (the `en` directory). (This is optional.)

Next, the setup of `sidebar` is similar to the previous one, but you need to set up multiple sidebars with directories for each language. Here's a description of each option:

- `basePath`: When used in conjunction with the `rewrites` rule, it prevents the root locale from pointing to the `/en/` path.
- `documentRootPath`: The root path where the actual documentation files are located. For each language, look for the `en`, `ko`, and `zhHans` directories.
- `resolvePath`: `/docs` The location of the file from the directory that should actually scan the sidebar listings. Specify the directory location for each language, excluding the root locale.

This ensures that the sidebar only displays articles from the specified directory per language. The above is an example, so you may need to set the options differently depending on the size of your project or directory structure.
