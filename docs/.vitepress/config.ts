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
    socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
  }
});
