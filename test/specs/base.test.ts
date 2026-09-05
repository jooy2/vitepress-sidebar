import assert from 'assert';
import { describe, it } from 'node:test';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
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

  it('withSidebar: leaves the configuration and the options it is given alone', () => {
    const vitePressOptions = {
      title: 'VitePress Sidebar',
      vite: { plugins: [{ name: 'user-plugin' }] },
      themeConfig: {
        sidebar: [{ text: 'Not used', link: '/' }],
        footer: { message: 'Footer' }
      }
    };
    const sidebarOptions = {
      documentRootPath: `${TEST_DIR_BASE}/general`,
      debugPrint: false
    };
    const vitePressOptionsBefore = structuredClone(vitePressOptions);
    const sidebarOptionsBefore = structuredClone(sidebarOptions);

    const first = withSidebar(vitePressOptions, sidebarOptions);
    const second = withSidebar(vitePressOptions, sidebarOptions);

    assert.deepStrictEqual(
      vitePressOptions,
      vitePressOptionsBefore,
      'the VitePress configuration must not be changed'
    );
    assert.deepStrictEqual(
      sidebarOptions,
      sidebarOptionsBefore,
      'the sidebar options must not be changed'
    );

    // VitePress evaluates its configuration again on every restart of the dev
    // server, so a plugin appended to the list the caller passed in would be
    // added once more each time.
    const pluginNames = (result: Partial<typeof vitePressOptions>): (string | undefined)[] =>
      ((result.vite as { plugins?: { name?: string }[] } | undefined)?.plugins ?? []).map(
        (plugin) => plugin?.name
      );

    assert.deepStrictEqual(pluginNames(first), ['user-plugin', 'vitepress-sidebar:hmr']);
    assert.deepStrictEqual(pluginNames(second), ['user-plugin', 'vitepress-sidebar:hmr']);

    // The generated sidebar still replaces the one already in the configuration
    assert.deepStrictEqual(
      (first.themeConfig as { sidebar: { text: string }[] }).sidebar.map((item) => item.text),
      ['a', 'b', 'c', 'folder', 'folder-2', 'test']
    );
  });

  it('withSidebar: accepts a frozen configuration and frozen options', () => {
    const vitePressOptions = Object.freeze({
      title: 'VitePress Sidebar',
      themeConfig: Object.freeze({ sidebar: Object.freeze([{ text: 'Not used' }]) })
    });
    const sidebarOptions = Object.freeze({
      documentRootPath: `${TEST_DIR_BASE}/general`
    });

    assert.doesNotThrow(() => withSidebar(vitePressOptions, sidebarOptions));
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

  it('A path that holds a regular expression character is stripped from the link', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-char-path/docs (v2)`
      }),
      [
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'inner',
          items: [
            {
              text: 'b',
              link: '/inner/b'
            }
          ]
        }
      ]
    );
  });

  it('A `scanStartPath` that holds a regular expression character is stripped from the link', () => {
    const expected = [
      {
        text: 'a',
        link: 'a'
      },
      {
        text: 'inner',
        items: [
          {
            text: 'b',
            link: 'inner/b'
          }
        ]
      }
    ];

    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-char-path`,
        scanStartPath: 'docs (v2)'
      }),
      expected
    );

    // A surrounding slash describes the same path
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-char-path`,
        scanStartPath: '/docs (v2)/'
      }),
      expected
    );
  });

  it('A folder is only skipped when it is named `node_modules` or `.vitepress`', () => {
    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-char-path/node_modules-notes`
      }),
      [
        {
          text: 'c',
          link: '/c'
        }
      ]
    );

    assert.deepStrictEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-char-path/a.vitepress-notes`
      }),
      [
        {
          text: 'd',
          link: '/d'
        }
      ]
    );

    // A folder that really is called `node_modules` or `.vitepress` is still
    // skipped. Neither can be committed as a fixture, so both are created here.
    const skipDirBase = `${TEST_DIR_BASE}/special-char-path/skip-dirs`;

    try {
      for (const name of ['node_modules', '.vitepress']) {
        mkdirSync(`${skipDirBase}/${name}`, { recursive: true });
        writeFileSync(`${skipDirBase}/${name}/skipped.md`, '# Skipped\n');
      }

      writeFileSync(`${skipDirBase}/kept.md`, '# Kept\n');

      assert.deepStrictEqual(
        generateSidebar({
          documentRootPath: skipDirBase,
          includeDotFiles: true
        }),
        [
          {
            text: 'kept',
            link: '/kept'
          }
        ]
      );
    } finally {
      rmSync(skipDirBase, { recursive: true, force: true });
    }
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
