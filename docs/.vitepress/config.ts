import { generateSidebar } from '../../dist';
import { name, description, repository, homepage } from '../../package.json';
import { defineConfig } from 'vitepress';

// Ref: https://vitepress.vuejs.org/config/introduction
export default defineConfig({
  title: name,
  description,
  outDir: '../docs-dist',
  cleanUrls: true,
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
    // Single sidebar example
    sidebar: generateSidebar({
      debugPrint: true,
      documentRootPath: 'docs',
      collapsed: false,
      capitalizeFirst: true,
      useTitleFromFileHeading: true,
      useTitleFromFrontmatter: true,
      sortMenusByFrontmatterOrder: true
    }),
    search: {
      provider: 'local'
    },
    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/jooy2/vitepress-sidebar/blob/master/CHANGELOG.md'
      }
    ],
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/vitepress-sidebar' },
      { icon: 'github', link: repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://jooy2.com">Jooy2</a>'
    }
  }
});
