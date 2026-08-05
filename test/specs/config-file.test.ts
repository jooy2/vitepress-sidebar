import assert from 'assert';
import { describe, it } from 'node:test';
import { generateSidebar } from '../../dist';
import { resolve } from 'node:path';

const TEST_DIR_BASE = 'test/resources';

// `generateSidebar` resolves every path from the current working directory, so
// the tests that rely on an implicit document root have to move into a fixture
// directory first.
function withCwd<T>(dirPath: string, callback: () => T): T {
  const previousCwd = process.cwd();

  process.chdir(resolve(previousCwd, dirPath));

  try {
    return callback();
  } finally {
    process.chdir(previousCwd);
  }
}

describe('Test: `sidebar.config.json`', () => {
  it('Options of a folder apply to the folder itself and to its subfolders', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/config-file`
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
          // Inherits `capitalizeFirst` and `collapsed` from the document root
          text: 'Folder-a',
          items: [
            {
              text: 'A1',
              link: '/folder-a/a1'
            },
            {
              text: 'A2',
              link: '/folder-a/a2'
            }
          ],
          collapsed: true
        },
        {
          // `folder-b/sidebar.config.json` turns `capitalizeFirst` and
          // `collapsed` off, excludes a file and reverses the sort order
          text: 'folder-b',
          items: [
            {
              text: 'nested',
              items: [
                {
                  text: 'n1',
                  link: '/folder-b/nested/n1'
                }
              ],
              collapsed: false
            },
            {
              text: 'b2',
              link: '/folder-b/b2'
            },
            {
              text: 'b1',
              link: '/folder-b/b1'
            }
          ],
          collapsed: false
        }
      ]
    );
  });

  it('Options passed as an argument are overridden by a configuration file', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/config-file`,
        scanStartPath: 'folder-a',
        capitalizeFirst: false,
        sortMenusByName: true,
        sortMenusOrderByDescending: true
      }),
      [
        {
          // `capitalizeFirst` comes from `config-file/sidebar.config.json`,
          // `sortMenusOrderByDescending` is only set as an argument
          text: 'A2',
          link: 'a2'
        },
        {
          text: 'A1',
          link: 'a1'
        }
      ]
    );
  });

  it('A configuration file at the scan root is used as the root configuration', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/config-file`,
        scanStartPath: 'folder-b'
      }),
      [
        {
          text: 'nested',
          items: [
            {
              text: 'n1',
              link: 'nested/n1'
            }
          ],
          collapsed: false
        },
        {
          text: 'b2',
          link: 'b2'
        },
        {
          text: 'b1',
          link: 'b1'
        }
      ]
    );
  });

  it('Root-only options, unknown options and invalid values are ignored', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/config-file-root-only`
      }),
      [
        {
          text: 'Root Group',
          items: [
            {
              // No `collapsed` key, because `"collapsed": "yes"` is not a boolean
              text: 'Sub',
              items: [
                {
                  // `underscoreToSpace` is not a root-only option, so it applies.
                  // The file survives because `"excludeByGlobPattern": "*.md"`
                  // is not an array of strings.
                  text: 'Hello world',
                  link: '/sub/hello_world'
                }
              ]
            }
          ],
          collapsed: false
        }
      ]
    );
  });

  it('`$folder` describes the folder itself', () => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-meta`,
        sortMenusByFrontmatterOrder: true,
        includeFolderIndexFile: true
      }),
      [
        {
          // `$folder.link` points the folder at one of its own files, so no
          // `index.md` is needed to make the folder clickable
          text: 'c',
          link: '/c/c1',
          items: [
            {
              text: 'c1',
              link: '/c/c1'
            }
          ]
        },
        {
          // `"text": 123` and an unknown key are ignored, `order` still applies
          text: 'd',
          items: [
            {
              text: 'd1',
              link: '/d/d1'
            }
          ]
        },
        {
          // Ordered and named without any `index.md`
          text: 'B Folder',
          items: [
            {
              text: 'b1',
              link: '/b/b1'
            }
          ]
        },
        {
          // The folder is last, while its `index.md` stays first inside it:
          // `$folder.order` and the frontmatter `order` no longer share a scale
          text: 'a',
          items: [
            {
              text: 'index',
              link: '/a/'
            },
            {
              text: 'about',
              link: '/a/about'
            }
          ]
        }
      ]
    );
  });

  it('`documentRootPath` is detected from the location of the configuration files', () => {
    assert.deepEqual(
      withCwd(`${TEST_DIR_BASE}/infer-root`, () => generateSidebar()),
      [
        {
          text: 'Hello',
          link: '/hello'
        },
        {
          text: 'World',
          link: '/world'
        }
      ]
    );
  });

  it('`documentRootPath` can be declared in the configuration file of the project root', () => {
    assert.deepEqual(
      withCwd(`${TEST_DIR_BASE}/root-config`, () => generateSidebar()),
      [
        {
          text: 'One',
          link: '/one'
        },
        {
          text: 'Two',
          link: '/two'
        }
      ]
    );
  });
});
