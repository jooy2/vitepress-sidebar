import { generateSidebar } from '../../../dist';
import { name, description, repository } from '../../../package.json';

// Ref: https://vitepress.vuejs.org/config/introduction
export default {
  title: name,
  description,
  outDir: '../dist',
  themeConfig: {
    sidebar: generateSidebar({
      documentRootPath: 'test/docs',
      collapseDepth: 2,
      capitalizeFirst: true,
      useTitleFromFileHeading: true
    }),
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
  }
};
