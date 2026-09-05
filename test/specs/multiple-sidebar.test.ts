import assert from 'assert';
import { describe, it } from 'node:test';
import { generateSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';

describe('Test: multiple sidebars', () => {
  it('Multiple Sidebars (A)', () => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          resolvePath: '/'
        },
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder',
          resolvePath: '/folder/'
        },
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder-2',
          resolvePath: '/folder-2'
        }
      ]),
      {
        '/': {
          base: '/',
          items: [
            {
              text: 'a',
              link: 'a'
            },
            {
              text: 'b',
              link: 'b'
            },
            {
              text: 'c',
              link: 'c'
            },
            {
              text: 'folder',
              items: [
                {
                  text: 'folder-test-2',
                  link: 'folder/folder-test-2'
                },
                {
                  text: 'folder-test',
                  link: 'folder/folder-test'
                },
                {
                  text: 'subFolder',
                  items: [
                    {
                      text: 'sub-folder-test',
                      link: 'folder/subFolder/sub-folder-test'
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
                  link: 'folder-2/folder2'
                }
              ]
            },
            {
              text: 'test',
              link: 'test'
            }
          ]
        },
        '/folder/': {
          base: '/folder/',
          items: [
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
          ]
        },
        '/folder-2': {
          base: '/folder-2',
          items: [
            {
              text: 'folder2',
              link: 'folder2'
            }
          ]
        }
      }
    );
  });

  it('Multiple Sidebars (B)', () => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder/subFolder',
          resolvePath: '/folder'
        }
      ]),
      {
        '/folder': {
          base: '/folder',
          items: [
            {
              text: 'sub-folder-test',
              link: 'sub-folder-test'
            }
          ]
        }
      }
    );
  });

  it('Multiple Sidebars (C)', () => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder',
          resolvePath: '/folder/',
          includeRootIndexFile: true,
          includeFolderIndexFile: true
        },
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder-2',
          resolvePath: '/folder-2/',
          includeRootIndexFile: true,
          includeFolderIndexFile: true,
          useFolderLinkFromIndexFile: true
        }
      ]),
      {
        '/folder/': {
          base: '/folder/',
          items: [
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
          ]
        },
        '/folder-2/': {
          base: '/folder-2/',
          items: [
            {
              text: 'folder2',
              link: 'folder2'
            },
            {
              text: 'index',
              link: 'index.md'
            }
          ]
        }
      }
    );
  });

  it('Multiple Sidebars (D)', () => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder/subFolder',
          basePath: 'page',
          resolvePath: 'folder'
        }
      ]),
      {
        folder: {
          base: 'page',
          items: [
            {
              text: 'sub-folder-test',
              link: 'sub-folder-test'
            }
          ]
        }
      }
    );
  });

  it('`basePath` and the `rootGroup` options describe one sidebar of many', () => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general/folder/subFolder`,
          resolvePath: '/guide/',
          basePath: '/base/',
          rootGroupText: 'Guide',
          rootGroupLink: '/guide/start',
          rootGroupCollapsed: false
        }
      ]),
      {
        '/guide/': {
          // `basePath` is what the links are resolved against, and is the
          // `resolvePath` only when it does not name one of its own
          base: '/base/',
          items: [
            {
              text: 'Guide',
              link: '/guide/start',
              items: [
                {
                  text: 'sub-folder-test',
                  link: 'sub-folder-test'
                }
              ],
              collapsed: false
            }
          ]
        }
      }
    );

    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general/folder/subFolder`,
          resolvePath: '/guide/'
        }
      ]),
      {
        '/guide/': {
          base: '/guide/',
          items: [
            {
              text: 'sub-folder-test',
              link: 'sub-folder-test'
            }
          ]
        }
      }
    );
  });

  it('Two sidebars resolving to the same path are reported', () => {
    const warnings: string[] = [];
    const write = process.stderr.write;

    process.stderr.write = ((chunk: string) => {
      warnings.push(String(chunk));
      return true;
    }) as typeof process.stderr.write;

    let result;

    try {
      result = generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder/subFolder',
          resolvePath: '/shared/'
        },
        {
          documentRootPath: `${TEST_DIR_BASE}/general`,
          scanStartPath: 'folder-2',
          resolvePath: '/shared/'
        }
      ]);
    } finally {
      process.stderr.write = write;
    }

    assert.ok(
      warnings.some((message) => message.includes(`More than one sidebar resolves to '/shared/'`)),
      'expected a warning about the duplicated resolve path'
    );

    // The last one is what is left, which is what the warning says
    assert.deepEqual(result, {
      '/shared/': {
        base: '/shared/',
        items: [
          {
            text: 'folder2',
            link: 'folder2'
          }
        ]
      }
    });
  });
});
