import { generateSidebar } from '../../dist';
import { name, description, repository } from '../../package.json';

// Ref: https://vitepress.vuejs.org/config/introduction
export default {
  title: name,
  description,
  outDir: '../docs-dist',
  themeConfig: {
    // Single sidebar example
    sidebar: generateSidebar({
      debugPrint: true,
      documentRootPath: 'example',
      collapsed: false,
      capitalizeFirst: true,
      useTitleFromFileHeading: true,
      useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: true,
      sortMenusByFrontmatterOrder: true,
      manualSortFileNameByPriority: ['getting_started.md', 'es-module.md', 'package.json.md']
    }),
    /*
    // Multiple sidebar example
    sidebar: generateSidebar([
      {
        documentRootPath: 'example',
        scanStartPath: 'css',
        resolvePath: '/css/',
        useTitleFromFileHeading: true,
        excludeFiles: ['c-css.md']
      },
      {
        documentRootPath: 'example',
        scanStartPath: 'javascript',
        resolvePath: '/javascript/',
        useTitleFromFrontmatter: true,
        excludeFiles: ['package.json.md', 'helpful-links.md'],
        excludeFolders: ['examples', 'vitepress-how-to']
      },
      {
        documentRootPath: 'example'
      }
    ]),
     */
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
  }
};
