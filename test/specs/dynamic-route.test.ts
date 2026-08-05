import assert from 'assert';
import { describe, it } from 'node:test';
import { generateSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';
const TEST_DIR = `${TEST_DIR_BASE}/dynamic-routes`;

describe('Test: dynamic routes', () => {
  it('Dynamic routes are not expanded unless asked for', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR
      }),
      [
        {
          text: '[cat]',
          items: [
            {
              text: '[slug]',
              link: '/[cat]/[slug]'
            }
          ]
        },
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'packages',
          items: [
            {
              text: '[pkg]',
              link: '/packages/[pkg]'
            }
          ]
        }
      ]
    );
  });

  it('API: includeDynamicRoutes', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        includeDynamicRoutes: true
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        // A template inside a static folder is replaced by the pages it
        // generates, and never appears under its own name.
        {
          text: 'packages',
          items: [
            {
              text: 'alpha',
              link: '/packages/alpha'
            },
            {
              text: 'beta',
              link: '/packages/beta'
            },
            {
              text: 'Gamma Package',
              link: '/packages/gamma'
            }
          ]
        },
        // A folder whose name is a parameter becomes one folder per value.
        {
          text: 'news',
          items: [
            {
              text: 'hello',
              link: '/news/hello'
            },
            {
              text: 'world',
              link: '/news/world'
            }
          ]
        },
        {
          text: 'blog',
          items: [
            {
              text: 'first',
              link: '/blog/first'
            }
          ]
        }
      ]
    );
  });

  it('API: includeDynamicRoutes with useTitleFromFileHeading', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        scanStartPath: 'packages',
        resolvePath: '/packages/',
        includeDynamicRoutes: true,
        useTitleFromFileHeading: true,
        capitalizeFirst: true
      }),
      [
        // The heading of the template holds `{{ $params.pkg }}`, which is
        // resolved before the title is formatted.
        {
          text: 'Alpha package',
          link: 'alpha'
        },
        {
          text: 'Beta package',
          link: 'beta'
        },
        {
          text: 'Gamma Package',
          link: 'gamma'
        }
      ]
    );
  });

  it('API: includeDynamicRoutes with useTitleFromFrontmatter', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        scanStartPath: 'packages',
        resolvePath: '/packages/',
        includeDynamicRoutes: true,
        useTitleFromFrontmatter: true
      }),
      [
        // Every generated page shares the frontmatter of the one template, so
        // only a parameter can give a page a title of its own.
        {
          text: 'Package template',
          link: 'alpha'
        },
        {
          text: 'Package template',
          link: 'beta'
        },
        {
          text: 'Gamma Package',
          link: 'gamma'
        }
      ]
    );
  });

  it('API: dynamicRouteTitleParam', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        scanStartPath: 'packages',
        resolvePath: '/packages/',
        includeDynamicRoutes: true,
        dynamicRouteTitleParam: 'label'
      }),
      [
        {
          text: 'Alpha Label',
          link: 'alpha'
        },
        {
          text: 'beta',
          link: 'beta'
        },
        {
          text: 'gamma',
          link: 'gamma'
        }
      ]
    );
  });

  it('API: includeDynamicRoutes with sortMenusByFrontmatterOrder', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        scanStartPath: 'packages',
        resolvePath: '/packages/',
        includeDynamicRoutes: true,
        sortMenusByFrontmatterOrder: true
      }),
      [
        // An `order` parameter orders the generated pages, which the frontmatter
        // of the shared template cannot do.
        {
          text: 'Gamma Package',
          link: 'gamma'
        },
        {
          text: 'beta',
          link: 'beta'
        },
        {
          text: 'alpha',
          link: 'alpha'
        }
      ]
    );
  });

  it('API: includeDynamicRoutes with sortMenusByName', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        includeDynamicRoutes: true,
        sortMenusByName: true
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'blog',
          items: [
            {
              text: 'first',
              link: '/blog/first'
            }
          ]
        },
        {
          text: 'news',
          items: [
            {
              text: 'hello',
              link: '/news/hello'
            },
            {
              text: 'world',
              link: '/news/world'
            }
          ]
        },
        {
          text: 'packages',
          items: [
            {
              text: 'alpha',
              link: '/packages/alpha'
            },
            {
              text: 'beta',
              link: '/packages/beta'
            },
            {
              text: 'Gamma Package',
              link: '/packages/gamma'
            }
          ]
        }
      ]
    );
  });

  it('API: includeDynamicRoutes with excludeByGlobPattern', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: TEST_DIR,
        includeDynamicRoutes: true,
        // Excluding a template excludes every page it generates.
        excludeByGlobPattern: ['**/*[[]pkg[]]*']
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'news',
          items: [
            {
              text: 'hello',
              link: '/news/hello'
            },
            {
              text: 'world',
              link: '/news/world'
            }
          ]
        },
        {
          text: 'blog',
          items: [
            {
              text: 'first',
              link: '/blog/first'
            }
          ]
        }
      ]
    );
  });
});
