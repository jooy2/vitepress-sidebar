import assert from 'assert';
import { describe, it } from 'node:test';
import { generateSidebar, withSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';

describe('Test: base test', () => {
  it('Without configurations', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'c',
          link: '/c'
        },
        {
          text: 'folder',
          items: [
            {
              text: 'folder-test-2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'folder-test',
              link: '/folder/folder-test'
            },
            {
              text: 'subFolder',
              items: [
                {
                  text: 'sub-folder-test',
                  link: '/folder/subFolder/sub-folder-test'
                }
              ]
            }
          ]
        },
        {
          text: 'folder-2',
          items: [
            {
              text: 'folder2',
              link: '/folder-2/folder2'
            }
          ]
        },
        {
          text: 'test',
          link: '/test'
        }
      ]
    );
  });

  it('With complex configurations (A)', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        collapsed: false,
        hyphenToSpace: true,
        underscoreToSpace: true,
        includeRootIndexFile: true,
        useTitleFromFrontmatter: true,
        excludeByGlobPattern: ['a.md', 'c.md', 'folder-2/']
      }),
      [
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'folder',
          items: [
            {
              text: 'folder test 2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'folder test',
              link: '/folder/folder-test'
            },
            {
              text: 'subFolder',
              items: [
                {
                  text: 'sub folder test',
                  link: '/folder/subFolder/sub-folder-test'
                }
              ],
              collapsed: false
            }
          ],
          collapsed: false
        },
        {
          text: 'test',
          link: '/test'
        }
      ]
    );
  });

  it('With complex configurations (B)', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        includeEmptyFolder: true,
        includeDotFiles: true,
        excludeByGlobPattern: ['subFolder/'],
        hyphenToSpace: true,
        underscoreToSpace: true,
        capitalizeFirst: true,
        useTitleFromFrontmatter: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'A',
          link: '/a'
        },
        {
          text: 'B',
          link: '/b'
        },
        {
          text: 'C',
          link: '/c'
        },
        {
          text: 'Folder',
          items: [
            {
              text: 'Folder test 2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'FolderTestFile',
              link: '/folder/folder-test'
            }
          ]
        },
        {
          text: 'Folder 2',
          items: [
            {
              text: 'Folder2 File',
              link: '/folder-2/folder2'
            }
          ]
        },
        {
          text: 'TestFile',
          link: '/test'
        }
      ]
    );
  });

  it('API: With complex configurations (C)', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/number-title-and-filename`,
        excludeByGlobPattern: ['index.md'],
        capitalizeFirst: true,
        collapsed: true,
        sortMenusOrderNumericallyFromTitle: true,
        useFolderTitleFromIndexFile: true,
        useFolderLinkFromSameNameSubFile: true,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true
      }),
      [
        {
          link: '/1-introduction',
          text: '1. Introduction'
        },
        {
          link: '/2-how-to-use',
          text: '2. How to use'
        }
      ]
    );
  });

  it('withSidebar: basic', () => {
    const result = withSidebar(
      {
        title: 'VitePress Sidebar',
        themeConfig: {
          sidebar: [
            {
              text: 'Not used',
              link: '/'
            }
          ],
          logo: { src: '/logo.png' },
          footer: {
            message: 'Footer'
          }
        }
      },
      {
        documentRootPath: `${TEST_DIR_BASE}/general`
      }
    );

    // `withSidebar` injects a Vite plugin for dev-server HMR; verify it's
    // present and then strip it so the rest of the config can be compared
    // by structural equality.
    const vitePlugins = (result.vite as { plugins?: { name?: string }[] } | undefined)?.plugins;
    assert.ok(
      vitePlugins?.some((p) => p?.name === 'vitepress-sidebar:hmr'),
      'expected hmr plugin to be injected into vite.plugins'
    );
    delete (result as { vite?: unknown }).vite;

    assert.deepStrictEqual(result, {
      title: 'VitePress Sidebar',
      themeConfig: {
        sidebar: [
          {
            text: 'a',
            link: '/a'
          },
          {
            text: 'b',
            link: '/b'
          },
          {
            text: 'c',
            link: '/c'
          },
          {
            text: 'folder',
            items: [
              {
                text: 'folder-test-2',
                link: '/folder/folder-test-2'
              },
              {
                text: 'folder-test',
                link: '/folder/folder-test'
              },
              {
                text: 'subFolder',
                items: [
                  {
                    text: 'sub-folder-test',
                    link: '/folder/subFolder/sub-folder-test'
                  }
                ]
              }
            ]
          },
          {
            text: 'folder-2',
            items: [
              {
                text: 'folder2',
                link: '/folder-2/folder2'
              }
            ]
          },
          {
            text: 'test',
            link: '/test'
          }
        ],
        logo: {
          src: '/logo.png'
        },
        footer: {
          message: 'Footer'
        }
      }
    });
  });

  it('withSidebar: inherits `srcExclude` from the VitePress configuration', () => {
    const result = withSidebar(
      {
        // `folder/**` is relative to the document root, which is how VitePress
        // resolves it, and excludes the folder together with everything below
        // it.
        srcExclude: ['folder/**', '**/test.md']
      },
      {
        documentRootPath: `${TEST_DIR_BASE}/general`
      }
    );

    assert.deepStrictEqual(result.themeConfig?.sidebar, [
      {
        text: 'a',
        link: '/a'
      },
      {
        text: 'b',
        link: '/b'
      },
      {
        text: 'c',
        link: '/c'
      },
      {
        text: 'folder-2',
        items: [
          {
            text: 'folder2',
            link: '/folder-2/folder2'
          }
        ]
      }
    ]);
  });

  it('withSidebar: `srcExclude` is applied on top of `excludeByGlobPattern`', () => {
    const result = withSidebar(
      {
        srcExclude: ['**/test.md']
      },
      {
        documentRootPath: `${TEST_DIR_BASE}/general`,
        excludeByGlobPattern: ['folder-2/']
      }
    );

    assert.deepStrictEqual(result.themeConfig?.sidebar, [
      {
        text: 'a',
        link: '/a'
      },
      {
        text: 'b',
        link: '/b'
      },
      {
        text: 'c',
        link: '/c'
      },
      {
        text: 'folder',
        items: [
          {
            text: 'folder-test-2',
            link: '/folder/folder-test-2'
          },
          {
            text: 'folder-test',
            link: '/folder/folder-test'
          },
          {
            text: 'subFolder',
            items: [
              {
                text: 'sub-folder-test',
                link: '/folder/subFolder/sub-folder-test'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('withSidebar: `srcExclude` stays relative to `documentRootPath` with `scanStartPath`', () => {
    const result = withSidebar(
      {
        srcExclude: ['folder/subFolder/**']
      },
      {
        documentRootPath: `${TEST_DIR_BASE}/general`,
        scanStartPath: 'folder'
      }
    );

    assert.deepStrictEqual(result.themeConfig?.sidebar, [
      {
        text: 'folder-test-2',
        link: 'folder-test-2'
      },
      {
        text: 'folder-test',
        link: 'folder-test'
      }
    ]);
  });

  it('withSidebar: without `srcExclude` nothing is excluded', () => {
    const result = withSidebar(
      {},
      {
        documentRootPath: `${TEST_DIR_BASE}/general`,
        scanStartPath: 'folder'
      }
    );

    assert.deepStrictEqual(result.themeConfig?.sidebar, [
      {
        text: 'folder-test-2',
        link: 'folder-test-2'
      },
      {
        text: 'folder-test',
        link: 'folder-test'
      },
      {
        text: 'subFolder',
        items: [
          {
            text: 'sub-folder-test',
            link: 'subFolder/sub-folder-test'
          }
        ]
      }
    ]);
  });

  it('Contains a path with the same name as `documentRootPath`', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/same-name-path`
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'test',
          items: [
            {
              text: 'resources',
              items: [
                {
                  text: 'same-name-path',
                  items: [
                    {
                      text: 'b',
                      link: '/test/resources/same-name-path/b'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
  });

  it('`index.md` file must be used correctly according to the situation.', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/index-files`,
        useTitleFromFileHeading: true,
        excludeByGlobPattern: ['abc']
      }),
      [
        {
          text: 'a',
          items: [
            {
              text: 'Test Index',
              link: '/a/testindex'
            }
          ]
        },
        {
          text: 'index',
          items: [
            {
              text: 'B',
              link: '/index/b'
            }
          ]
        }
      ]
    );
  });
});
