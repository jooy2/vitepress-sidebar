import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { withSidebar } from '../../dist/index.js';
import packageJson from '../../package.json' with { type: 'json' };
import { defineConfig, UserConfig } from 'vitepress';
import type { HeadConfig } from 'vitepress';
import { withI18n } from 'vitepress-i18n';
import type { VitePressI18nOptions } from 'vitepress-i18n/types';
import type { VitePressSidebarOptions } from '../../dist/types.js';

const defaultLocale: string = 'en';
const supportLocales: string[] = [defaultLocale, 'ko', 'zhHans'];
const editLinkPattern = `${packageJson.repository.url}/edit/main/docs/:path`;
const siteUrl: string = packageJson.homepage;
const siteName: string = 'VitePress Sidebar';
const docsDir: string = fileURLToPath(new URL('..', import.meta.url));

// Open Graph writes a locale with an underscore, unlike the `lang` of a page.
const openGraphLocales: Record<string, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  zhHans: 'zh_CN'
};

// The changelog is copied from `CHANGELOG.md` when the site is published, so
// it has no frontmatter to hold a description of its own.
const changelogDescriptions: Record<string, string> = {
  en: 'Release history of VitePress Sidebar, listing the new options, fixes, and breaking changes of every version.',
  ko: 'VitePress Sidebar의 버전별 변경 사항입니다. 새 옵션, 버그 수정, 호환성이 깨지는 변경을 버전마다 정리했습니다.',
  zhHans: 'VitePress Sidebar 的版本更新记录，按版本列出新增选项、问题修复和不兼容的变更。'
};

/**
 * Splits the path of a page into its locale and the path inside that locale.
 * `relativePath` is read after `rewrites`, so a page of the default locale has
 * no locale directory: `guide/options.md` is English, `ko/guide/options.md` is
 * Korean.
 */
const splitLocale = (relativePath: string): { locale: string; path: string } => {
  const [firstSegment, ...restSegments] = relativePath.split('/');

  if (restSegments.length > 0 && supportLocales.includes(firstSegment)) {
    return { locale: firstSegment, path: restSegments.join('/') };
  }

  return { locale: defaultLocale, path: relativePath };
};

/** The address a page is served at, written the way the sitemap writes it. */
const toPageUrl = (relativePath: string): string => {
  const route = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');

  return `${siteUrl}/${route}`;
};

/** Whether the `head` of a frontmatter asks search engines not to index the page. */
const isNoIndex = (head: unknown): boolean =>
  Array.isArray(head) &&
  head.some(
    ([tag, attrs]) =>
      tag === 'meta' && attrs?.name === 'robots' && /\bnoindex\b/.test(attrs.content ?? '')
  );

/**
 * Whether the page a sitemap entry points to asks not to be indexed. The entry
 * only carries the address, so the page is read back from its source file.
 */
const isNoIndexUrl = (url: string): boolean => {
  const { locale, path } = splitLocale(`${url.replace(/(^|\/)$/, '$1index')}.md`);
  const filePath = join(docsDir, locale, path);

  return existsSync(filePath) && isNoIndex(matter.read(filePath).data.head);
};

const commonSidebarConfig: VitePressSidebarOptions = {
  debugPrint: true,
  manualSortFileNameByPriority: ['introduction.md', 'guide', 'advanced-usage'],
  excludeByGlobPattern: ['changelog.md'],
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
  sortMenusByFrontmatterOrder: true
};

const vitePressSidebarConfig = [
  ...supportLocales.map((lang) => {
    return {
      ...commonSidebarConfig,
      documentRootPath: `/docs/${lang}`,
      resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
      ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
    };
  })
];

const vitePressI18nConfig: VitePressI18nOptions = {
  locales: supportLocales,
  debugPrint: true,
  rootLocale: defaultLocale,
  searchProvider: 'local',
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
          text: 'Options',
          link: '/guide/options'
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
          text: '옵션',
          link: '/ko/guide/options'
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
          text: '选项',
          link: '/zhHans/guide/options'
        },
        {
          text: '变化',
          link: '/zhHans/changelog'
        }
      ]
    }
  }
};

// Ref: https://vitepress.dev/reference/site-config
const vitePressConfig: UserConfig = {
  title: siteName,
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
    hostname: packageJson.homepage,
    // A page kept out of search results is kept out of the sitemap as well, so
    // the two never ask search engines for opposite things.
    transformItems: (items) => items.filter((item) => !isNoIndexUrl(item.url))
  },
  transformPageData(pageData) {
    const { locale, path } = splitLocale(pageData.relativePath);

    if (path === 'changelog.md' && !pageData.frontmatter.description) {
      pageData.description = changelogDescriptions[locale];
    }
  },
  // The alternate language versions of a page are already listed in the
  // sitemap, so they are not repeated here.
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) {
      return [];
    }

    const { locale } = splitLocale(pageData.relativePath);
    const pageUrl = toPageUrl(pageData.relativePath);
    const head: HeadConfig[] = [
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:locale', content: openGraphLocales[locale] }],
      ['meta', { property: 'og:image', content: `${siteUrl}/sidebar.png` }],
      ['meta', { property: 'og:image:width', content: '512' }],
      ['meta', { property: 'og:image:height', content: '512' }],
      ['meta', { property: 'og:image:alt', content: `${siteName} logo` }],
      ['meta', { name: 'twitter:card', content: 'summary' }]
    ];

    // A canonical link names the address a page should be indexed under, which
    // means nothing for a page that asks not to be indexed at all.
    if (!isNoIndex(pageData.frontmatter.head)) {
      head.unshift(['link', { rel: 'canonical', href: pageUrl }]);
    }

    return head;
  },
  themeConfig: {
    logo: { src: '/logo-32.png', width: 24, height: 24 },
    // Show `h3` headings nested under their `h2` in the right outline
    outline: { level: [2, 3] },
    editLink: {
      pattern: editLinkPattern
    },
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/vitepress-sidebar' },
      { icon: 'github', link: packageJson.repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://cdget.com">CDGet</a>'
    }
  }
};

export default defineConfig(
  withSidebar(withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig)
);
