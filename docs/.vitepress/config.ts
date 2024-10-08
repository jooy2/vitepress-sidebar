import { generateSidebar, VitePressSidebarOptions } from '../../dist';
import { repository, homepage } from '../../package.json';
import { defineConfig } from 'vitepress';
import { generateI18nLocale, generateI18nSearch } from 'vitepress-i18n';

const defaultLocale: string = 'en';
const editLinkPattern = `${repository.url}/edit/master/docs/:path`;

const commonSidebarConfig: VitePressSidebarOptions = {
  debugPrint: true,
  manualSortFileNameByPriority: ['introduction.md', 'guide', 'advanced-usage'],
  excludeFiles: ['changelog.md'],
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
  sortMenusByFrontmatterOrder: true
};

const defineSupportLocales = [
  { label: defaultLocale, translateLocale: defaultLocale },
  { label: 'ko', translateLocale: 'ko' },
  { label: 'zhHans', translateLocale: 'zhHans' }
];

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
      ...[defaultLocale, 'ko', 'zhHans'].map((lang) => {
        return {
          ...commonSidebarConfig,
          documentRootPath: `/docs/${lang}`,
          resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
          ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
        };
      })
    ]),
    search: generateI18nSearch({
      defineLocales: defineSupportLocales,
      rootLocale: defaultLocale,
      provider: 'local'
    }),
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/vitepress-sidebar' },
      { icon: 'github', link: repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://cdget.com">CDGet</a>'
    }
  },
  locales: generateI18nLocale({
    defineLocales: defineSupportLocales,
    rootLocale: defaultLocale,
    editLinkPattern: editLinkPattern,
    description: {
      en: 'VitePress Sidebar is a VitePress plugin that automatically generates sidebar menus with one setup and no hassle. Save time by easily creating taxonomies for tons of articles.',
      ko: 'VitePress Sidebar는 번거로운 작업 없이 한번의 설정만으로 사이드바 메뉴를 자동으로 생성하는 VitePress 플러그인입니다. 수많은 문서에 대한 분류를 손쉽게 만들어 시간을 절약하세요.',
      zhHans:
        'VitePress Sidebar是一款VitePress插件,只需一次设置即可自动生成侧边栏菜单,无需任何麻烦。轻松为大量文章创建分类,节省时间。'
    },
    themeConfig: {
      en: {
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
      },
      ko: {
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
        ]
      },
      zhHans: {
        nav: [
          {
            text: '安装',
            link: '/zhHans/guide/getting-started'
          },
          {
            text: 'API',
            link: '/zhHans/guide/api'
          },
          {
            text: '变化',
            link: '/zhHans/changelog'
          }
        ]
      }
    }
  })
});
