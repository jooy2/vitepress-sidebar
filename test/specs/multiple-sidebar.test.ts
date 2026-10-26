import assert from 'assert';
import { describe, it } from 'node:test';
import { mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { platform } from 'node:os';
import { generateSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';
const SPLIT_DIR = `${TEST_DIR_BASE}/split-by-folder`;
// Titles from the headings, so that a folder and the `index.md` it opens on
// are told apart from the file names in the expectations below
const TITLE_OPTIONS = { useTitleFromFileHeading: true, useFolderTitleFromIndexFile: true };

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
          rootGroupLink: 'start',
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
              link: 'start',
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

  it('A link that is not relative to the base is kept as it is written', () => {
    // VitePress puts the base in front of every link of a sidebar, so the
    // sidebar is given none and the links relative to it are resolved instead
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/general/folder/subFolder`,
          resolvePath: '/guide/',
          basePath: '/base/',
          rootGroupText: 'Guide',
          rootGroupLink: '/'
        },
        {
          documentRootPath: `${TEST_DIR_BASE}/general/folder/subFolder`,
          resolvePath: '/external/',
          rootGroupText: 'External',
          rootGroupLink: 'https://example.com/'
        }
      ]),
      {
        '/guide/': {
          base: '',
          items: [
            {
              text: 'Guide',
              link: '/',
              items: [
                {
                  text: 'sub-folder-test',
                  link: '/base/sub-folder-test'
                }
              ],
              collapsed: undefined
            }
          ]
        },
        '/external/': {
          base: '',
          items: [
            {
              text: 'External',
              link: 'https://example.com/',
              items: [
                {
                  text: 'sub-folder-test',
                  link: '/external/sub-folder-test'
                }
              ],
              collapsed: undefined
            }
          ]
        }
      }
    );

    // A `$folder.link` is used as written as well, however deep it is
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: `${TEST_DIR_BASE}/folder-meta`,
          resolvePath: '/',
          excludeByGlobPattern: ['a', 'b', 'd']
        }
      ]),
      {
        '/': {
          base: '',
          items: [
            {
              text: 'c',
              link: '/c/c1',
              items: [
                {
                  text: 'c1',
                  link: '/c/c1'
                }
              ]
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

  it('API: splitSidebarByFolder', () => {
    // A single set of options still returns a sidebar for each path
    assert.deepEqual(
      generateSidebar({
        documentRootPath: SPLIT_DIR,
        splitSidebarByFolder: true,
        ...TITLE_OPTIONS
      }),
      {
        '/': {
          base: '/',
          items: [
            { text: 'API', link: 'api/index.md' },
            { text: 'Guide', link: 'guide/index.md' },
            { text: 'Intro', link: 'intro' },
            // No `index.md`, so it opens on the first page of its sidebar
            { text: 'notes', link: 'notes/draft' }
          ]
        },
        '/api/': {
          base: '',
          items: [
            {
              text: 'API',
              link: '/',
              items: [
                { text: 'Client', link: '/api/client' },
                { text: 'API', link: '/api/index.md' }
              ],
              collapsed: undefined
            }
          ]
        },
        '/guide/': {
          base: '',
          items: [
            {
              text: 'Guide',
              link: '/',
              items: [
                { text: 'Advanced', link: '/guide/advanced/index.md' },
                { text: 'Guide', link: '/guide/index.md' },
                { text: 'Setup', link: '/guide/setup' }
              ],
              collapsed: undefined
            }
          ]
        },
        '/notes/': {
          base: '',
          items: [
            {
              text: 'notes',
              link: '/',
              items: [{ text: 'Draft', link: '/notes/draft' }],
              collapsed: undefined
            }
          ]
        },
        '/guide/advanced/': {
          base: '',
          items: [
            {
              // Links back to the folder the sidebar above opens on
              text: 'Advanced',
              link: '/guide/index.md',
              items: [
                { text: 'Advanced', link: '/guide/advanced/index.md' },
                { text: 'Tuning', link: '/guide/advanced/tuning' }
              ],
              collapsed: undefined
            }
          ]
        }
      }
    );
  });

  it('API: splitSidebarByFolder (`excludeByFolderDepth` decides where a sidebar ends)', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: SPLIT_DIR,
        splitSidebarByFolder: true,
        excludeByFolderDepth: 3,
        ...TITLE_OPTIONS
      }),
      {
        '/': {
          base: '/',
          items: [
            {
              text: 'API',
              link: 'api/index.md',
              items: [{ text: 'Client', link: 'api/client' }]
            },
            {
              text: 'Guide',
              link: 'guide/index.md',
              items: [
                { text: 'Advanced', link: 'guide/advanced/index.md' },
                { text: 'Setup', link: 'guide/setup' }
              ]
            },
            { text: 'Intro', link: 'intro' },
            {
              text: 'notes',
              items: [{ text: 'Draft', link: 'notes/draft' }]
            }
          ]
        },
        '/guide/advanced/': {
          base: '',
          items: [
            {
              text: 'Advanced',
              link: '/',
              items: [
                { text: 'Advanced', link: '/guide/advanced/index.md' },
                { text: 'Tuning', link: '/guide/advanced/tuning' }
              ],
              collapsed: undefined
            }
          ]
        }
      }
    );
  });

  it('API: splitSidebarByFolder (below `scanStartPath`)', () => {
    // Resolved to the folder it scans when `resolvePath` is not given
    assert.deepEqual(
      generateSidebar({
        documentRootPath: SPLIT_DIR,
        scanStartPath: 'guide',
        splitSidebarByFolder: true,
        ...TITLE_OPTIONS
      }),
      {
        '/guide/': {
          base: '/guide/',
          items: [
            { text: 'Advanced', link: 'advanced/index.md' },
            { text: 'Setup', link: 'setup' }
          ]
        },
        '/guide/advanced/': {
          base: '',
          items: [
            {
              text: 'Advanced',
              link: '/guide/',
              items: [
                { text: 'Advanced', link: '/guide/advanced/index.md' },
                { text: 'Tuning', link: '/guide/advanced/tuning' }
              ],
              collapsed: undefined
            }
          ]
        }
      }
    );
  });

  it('API: splitSidebarByFolder (a sidebar passed for the same path is kept)', () => {
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
          documentRootPath: SPLIT_DIR,
          splitSidebarByFolder: true,
          ...TITLE_OPTIONS
        },
        {
          documentRootPath: SPLIT_DIR,
          scanStartPath: 'api',
          // Written without the closing `/`, and still the path of `api`
          resolvePath: '/api',
          rootGroupText: 'Reference'
        }
      ]) as { [path: string]: unknown };
    } finally {
      process.stderr.write = write;
    }

    assert.deepEqual(result['/api'], {
      base: '/api',
      items: [
        {
          text: 'Reference',
          items: [{ text: 'client', link: 'client' }],
          collapsed: undefined
        }
      ]
    });
    assert.deepEqual(Object.keys(result).sort(), [
      '/',
      '/api',
      '/guide/',
      '/guide/advanced/',
      '/notes/'
    ]);
    assert.ok(
      !warnings.some((message) => message.includes('More than one sidebar resolves')),
      'expected the split to leave the passed sidebar alone without a warning'
    );
  });

  it('API: splitSidebarByFolder (a folder without a link opens on its first page)', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/split-by-folder-without-index`,
        splitSidebarByFolder: true,
        useTitleFromFileHeading: true
      }),
      {
        '/': {
          base: '/',
          items: [
            // The first page of `archive` is in `2024`, which is opened
            // directly. `assets` holds no page, so it is left out.
            { text: 'archive', link: 'archive/2024/report' },
            { text: 'notes', link: 'notes/draft' }
          ]
        },
        '/archive/': {
          base: '',
          items: [
            {
              text: 'archive',
              link: '/',
              items: [{ text: '2024', link: '/archive/2024/report' }],
              collapsed: undefined
            }
          ]
        },
        '/notes/': {
          base: '',
          items: [
            {
              text: 'notes',
              link: '/',
              items: [
                { text: 'Draft', link: '/notes/draft' },
                { text: 'Review', link: '/notes/review' }
              ],
              collapsed: undefined
            }
          ]
        },
        '/archive/2024/': {
          base: '',
          items: [
            {
              // No page shows the sidebar of `archive`, so the link goes on to
              // the sidebar above it
              text: '2024',
              link: '/',
              items: [{ text: 'Report', link: '/archive/2024/report' }],
              collapsed: undefined
            }
          ]
        }
      }
    );
  });

  it('API: splitSidebarByFolder (with `removePrefixFromLink`)', () => {
    // A folder sidebar is resolved to the path its pages are rewritten to, and
    // the `$folder.link` of `3.reference` is kept as it was written
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/prefix-link`,
        splitSidebarByFolder: true,
        removePrefixAfterOrdering: true,
        removePrefixFromLink: true,
        useTitleFromFileHeading: true
      }),
      {
        '/': {
          base: '',
          items: [
            { text: 'Intro', link: '/intro' },
            { text: 'guide', link: '/guide/index.md' },
            { text: 'reference', link: '/api/' }
          ]
        },
        '/guide/': {
          base: '',
          items: [
            {
              text: 'guide',
              link: '/',
              items: [
                { text: 'Setup', link: '/guide/setup' },
                { text: 'Usage', link: '/guide/usage' },
                { text: 'Guide', link: '/guide/index.md' }
              ],
              collapsed: undefined
            }
          ]
        },
        '/reference/': {
          base: '',
          items: [
            {
              text: 'reference',
              link: '/',
              items: [{ text: 'Overview', link: '/reference/overview' }],
              collapsed: undefined
            }
          ]
        }
      }
    );
  });

  it('API: splitSidebarByFolder (a link that leads back into the scan)', () => {
    // A directory symbolic link needs a privilege of its own on Windows, so
    // this is only run where one can be made without asking for it.
    if (platform() === 'win32') {
      return;
    }

    const targetDir = `${TEST_DIR_BASE}/split-symlink-loop`;

    rmSync(targetDir, { recursive: true, force: true });
    mkdirSync(`${targetDir}/sub`, { recursive: true });
    writeFileSync(`${targetDir}/index.md`, '# Home\n');
    writeFileSync(`${targetDir}/sub/index.md`, '# Sub\n');

    try {
      // Points at the folder that already has the first sidebar, so giving
      // it a sidebar of its own would start the split over without end.
      symlinkSync('..', `${targetDir}/sub/loop`, 'dir');

      const result = generateSidebar({
        documentRootPath: targetDir,
        splitSidebarByFolder: true,
        followSymlinks: true
      });

      assert.deepEqual(Object.keys(result).sort(), ['/', '/sub/']);
    } finally {
      rmSync(targetDir, { recursive: true, force: true });
    }
  });
});
