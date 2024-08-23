import { generateSidebar, VitePressSidebarOptions } from '../../dist';
import { repository, homepage } from '../../package.json';
import { defineConfig } from 'vitepress';

const defaultLocale: string = 'en';
const editLinkPattern = 'https://github.com/jooy2/vitepress-sidebar/edit/master/docs/:path';

const commonSidebarConfig: VitePressSidebarOptions = {
  debugPrint: true,
  manualSortFileNameByPriority: ['introduction.md', 'guide', 'advanced-usage'],
  excludeFiles: ['changelog.md'],
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  convertSameNameSubFileToGroupIndexPage: true,
  frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
  sortMenusByFrontmatterOrder: true
};

// Ref: https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VitePress Sidebar',
  lastUpdated: true,
  outDir: '../docs-dist',
  cleanUrls: true,
  metaChunk: true,
  rewrites: {
    'en/:rest*': ':rest*'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],
  sitemap: {
    hostname: homepage
  },
  themeConfig: {
    logo: { src: '/logo-32.png', width: 24, height: 24 },
    sidebar: generateSidebar([
      ...[defaultLocale, 'ko'].map((lang) => {
        return {
          ...commonSidebarConfig,
          documentRootPath: `/docs/${lang}`,
          resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
          ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
        };
      })
    ]),
    search: {
      provider: 'local',
      options: {
        locales: {
          ko: {
            translations: {
              button: {
                buttonText: '검색',
                buttonAriaLabel: '검색'
              },
              modal: {
                displayDetails: '상세 목록 표시',
                resetButtonTitle: '검색 초기화',
                backButtonTitle: '검색 닫기',
                noResultsText: '결과를 찾을 수 없음',
                footer: {
                  selectText: '선택',
                  selectKeyAriaLabel: '선택하기',
                  navigateText: '탐색',
                  navigateUpKeyAriaLabel: '위로',
                  navigateDownKeyAriaLabel: '아래로',
                  closeText: '닫기',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/vitepress-sidebar' },
      { icon: 'github', link: repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://jooy2.com">Jooy2</a>'
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description:
        'VitePress Sidebar is a VitePress plugin that automatically generates sidebar menus with one setup and no hassle. Save time by easily creating taxonomies for tons of articles.',
      themeConfig: {
        nav: [
          {
            text: 'Installation',
            link: '/guide/getting-started'
          },
          {
            text: 'API Reference',
            link: '/guide/api'
          },
          {
            text: 'Changelog',
            link: 'changelog'
          }
        ]
      }
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      description:
        'VitePress Sidebar는 번거로운 작업 없이 한번의 설정만으로 사이드바 메뉴를 자동으로 생성하는 VitePress 플러그인입니다. 수많은 문서에 대한 분류를 손쉽게 만들어 시간을 절약하세요.',
      themeConfig: {
        nav: [
          {
            text: '설치',
            link: '/ko/guide/getting-started'
          },
          {
            text: 'API',
            link: '/ko/guide/api'
          },
          {
            text: '변경사항',
            link: '/ko/changelog'
          }
        ],
        editLink: {
          pattern: editLinkPattern,
          text: '이 페이지 편집 제안'
        },
        docFooter: {
          prev: '이전',
          next: '다음'
        },
        outline: {
          label: '이 페이지 콘텐츠'
        },
        lastUpdated: {
          text: '업데이트 일자'
        },
        langMenuLabel: '언어 변경',
        returnToTopLabel: '맨 위로',
        sidebarMenuLabel: '사이드바 메뉴',
        darkModeSwitchLabel: '다크 모드',
        lightModeSwitchTitle: '라이트 모드로 변경',
        darkModeSwitchTitle: '다크 모드로 변경'
      }
    }
  }
});
