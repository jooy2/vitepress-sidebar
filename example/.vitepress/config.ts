import { generateSidebar } from '../../dist';
import { name, description, repository } from '../../package.json';

// Ref: https://vitepress.vuejs.org/config/introduction
export default {
  title: name,
  description,
  outDir: './dist',
  themeConfig: {
    sidebar: generateSidebar({
      documentRootPath: 'example',
      rootGroupText: 'Contents',
      rootGroupLink: '/',
      collapsed: false,
      capitalizeFirst: true,
      useTitleFromFileHeading: true,
      useTitleFromFrontmatter: true,
      sortMenusByFrontmatterOrder: true,
      manualSortFileNameByPriority: ['getting_started.md', 'es-module.md', 'package.json.md']
    }),
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
  }
};
