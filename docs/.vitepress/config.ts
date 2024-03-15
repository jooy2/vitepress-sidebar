import { generateSidebar } from '../../dist';
import { name, description, repository, homepage } from '../../package.json';
import { defineConfig } from 'vitepress';

// Ref: https://vitepress.vuejs.org/config/introduction
export default defineConfig({
  title: name,
  description,
  outDir: '../docs-dist',
  cleanUrls: true,
  sitemap: {
    hostname: homepage
  },
  themeConfig: {
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
