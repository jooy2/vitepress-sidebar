import assert from 'assert';
import { generateSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';

describe('Test: multiple sidebars', () => {
  it('Multiple Sidebars (A)', (done) => {
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

    done();
  });

  it('Multiple Sidebars (B)', (done) => {
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

    done();
  });

  it('Multiple Sidebars (C)', (done) => {
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

    done();
  });
});
