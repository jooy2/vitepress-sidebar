import assert from 'assert';
import { describe, it } from 'node:test';
import { generateSidebar, withSidebar } from '../../dist/index.js';

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
        excludePattern: ['a.md', 'c.md', 'folder-2/']
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
        excludePattern: ['subFolder/'],
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
        excludePattern: ['index.md'],
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
    assert.deepStrictEqual(
      withSidebar(
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
      ),
      {
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
      }
    );
  });

  it('Contains a path with the same name as `documentRootPath`', () => {
    assert.deepStrictEqual(
      generateSidebar({
        debugPrint: true,
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
        excludePattern: ['abc']
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
