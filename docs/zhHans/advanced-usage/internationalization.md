# 国际化

本页介绍如何使用 VitePress Sidebar 实现国际化（i18n）。

VitePress 支持多语言文档。如果您将翻译好的标记文件放在每种语言的目录中，并在 VitePress 的 `defineConfig` 中使用 `locales` 选项，就会显示语言选择器，并显示指定目录中每种语言的文档。

## 翻译页面布局（手动）

首先，VitePress 允许您翻译各种布局界面元素。所谓布局，是指 “上一页”、“下一页”、“目录”、“更改主题 ”等功能的所有相关文本。 它还包括翻译搜索功能中出现的所有文本。

VitePress 页面上的各种界面（布局）文本可提供特定语言的 `locales` 翻译。例如:

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

(`root` "语言指页面上的主要语言）。

要了解有关翻译布局的更多信息，请参阅以下文章: https://vitepress.dev/guide/i18n

对于搜索功能中出现的文本，需要在 `defineConfig` 中的 `themeConfig.search` 选项中进行设置，例如:

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

## 翻译页面布局（自动）

[VitePress I18n](https://vitepress-i18n.cdget.com)是VitePress侧边栏的一个家族插件，可让您自动完成上述手动翻译过程。只需进行一些简单的设置，您就不必花费数小时来翻译布局！

使用以下命令安装 VitePress I18n 模块:

```shell
$ npm i -D vitepress-i18n
```

在 `defineConfig` 中，将其设置为.

```javascript
const vitePressConfig = {
  // VitePress config
};

const vitePressI18nConfig = {
  // VitePress I18n config
  locales: ['en', 'ko'], // first locale 'en' is root locale
  searchProvider: 'local' // enable search with auto translation
};

export default defineConfig(withI18n(vitePressConfig, vitePressI18nConfig));
```

现在，您可以将界面翻译工作交给模块来完成！当然，您也可以自定义详细文本。

更多信息，请阅读 VitePress I18n 文档页面: https://vitepress-i18n.cdget.com/guide/getting-started

## 特定语言侧边栏设置

在 VitePress 中，您可以根据不同的语言显示不同的侧边栏。例如，假设您的文件夹结构如下:

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

在示例中，`abc.md` 是翻译成每种语言的同一文档。如果将语言分别改为英文、韩文和中文，侧边栏将扫描每个目录`en`、`ko`和`zhHans`，以获取该语言的标题。

下面举例说明如何做到这一点:

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

首先，`rewrites` 允许您在使用英语作为根语言（`en` 目录）时抑制 URI 路径中的 `/en/`（这是可选的）。

下一步，`sidebar` 的设置与上一步类似，但需要为每种语言设置多个侧边栏和目录。 下文将解释每个选项：

- `basePath`: 与 `rewrites` 规则一起使用时，可防止根本地化指向 `/en/` 路径。
- `documentRootPath`: 实际文档文件所在的根路径。 对于每种语言，查找 `en`、`ko` 和 `zhHans` 目录。
- `resolvePath`: `/docs` 实际扫描侧边栏列表的目录中文件的位置。 为每种语言指定目录位置，不包括根本地语言。

这样可以确保侧边栏只显示指定目录下每种语言的文档。以上只是一个示例，您可能需要根据项目规模或目录结构设置不同的选项。
