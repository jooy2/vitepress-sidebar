import assert from 'assert';
import { generateSidebar } from '../dist';

describe('VitePress Sidebar Test Case', () => {
  it('Basic configurations', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs'
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('With complex configurations (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        rootGroupText: 'RootGroup',
        collapsed: false,
        hyphenToSpace: true,
        underscoreToSpace: true,
        includeRootIndexFile: true
      }),
      [
        {
          text: 'RootGroup',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b file name', link: '/b_file_name' },
            { text: 'c file name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder file', link: '/folder/folder-file' },
                {
                  text: 'folder index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder index', link: '/folder/folder-index/folder-index' }
                  ],
                  collapsed: false
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
                  collapsed: false
                }
              ],
              collapsed: false
            },
            { text: 'index', link: '/index' }
          ]
        }
      ]
    );
    done();
  });

  it('With complex configurations (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        includeEmptyFolder: true,
        includeDotFiles: true,
        excludeFiles: ['c-file-name.md', 'sub-file.md'],
        excludeFolders: ['empty', 'folder-index'],
        hyphenToSpace: true,
        underscoreToSpace: true,
        capitalizeFirst: true,
        useTitleFromFrontmatter: true,
        useTitleFromFileHeading: true,
        rootGroupText: 'Hello',
        rootGroupLink: 'https://github.com'
      }),
      [
        {
          text: 'Hello',
          link: 'https://github.com',
          items: [
            { text: 'A Title from Frontmatter', link: '/a' },
            { text: 'B Title from Frontmatter', link: '/b_file_name' },
            {
              text: 'Folder',
              items: [
                {
                  text: '.secret folder',
                  items: [{ text: 'Hello', link: '/folder/.secret-folder/hello' }]
                },
                { text: 'Folder File', link: '/folder/folder-file' },
                {
                  text: 'Subfolder',
                  items: [{ text: 'Secret Dot File', link: '/folder/subfolder/.secret-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: useTitleFromFileHeading', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'A', link: '/a' },
            { text: 'B File Name', link: '/b_file_name' },
            { text: 'C File Name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'Folder File', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'Another', link: '/folder/folder-index/another' },
                    { text: 'Folder Index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [
                    {
                      text: 'Sub Folder - Sub File',
                      link: '/folder/subfolder/sub-file'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: useTitleFromFrontmatter', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'A Title from Frontmatter', link: '/a' },
            { text: 'B Title from Frontmatter', link: '/b_file_name' },
            { text: 'C Title from Frontmatter', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'Folder File', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'Another', link: '/folder/folder-index/another' },
                    { text: 'Folder Index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [
                    {
                      text: 'Sub Folder - Sub File',
                      link: '/folder/subfolder/sub-file'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: convertSameNameSubFileToGroupIndexPage (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  link: '/folder/folder-index/folder-index',
                  items: [{ text: 'another', link: '/folder/folder-index/another' }]
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: convertSameNameSubFileToGroupIndexPage (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        useTitleFromFileHeading: true,
        rootGroupText: '',
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: '',
          items: [
            { text: 'A Title from Frontmatter', link: '/a' },
            { text: 'B Title from Frontmatter', link: '/b_file_name' },
            { text: 'C Title from Frontmatter', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'Folder File', link: '/folder/folder-file' },
                {
                  text: 'Folder Index',
                  link: '/folder/folder-index/folder-index',
                  items: [{ text: 'Another', link: '/folder/folder-index/another' }]
                },
                {
                  text: 'subfolder',
                  items: [
                    {
                      text: 'Sub Folder - Sub File',
                      link: '/folder/subfolder/sub-file'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: convertSameNameSubFileToGroupIndexPage (C)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        useTitleFromFileHeading: true,
        rootGroupText: '',
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true,
        folderLinkNotIncludesFileName: true
      }),
      [
        {
          text: '',
          items: [
            { text: 'A Title from Frontmatter', link: '/a' },
            { text: 'B Title from Frontmatter', link: '/b_file_name' },
            { text: 'C Title from Frontmatter', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'Folder File', link: '/folder/folder-file' },
                {
                  text: 'Folder Index',
                  link: '/folder/folder-index',
                  items: [{ text: 'Another', link: '/folder/folder-index/another' }]
                },
                {
                  text: 'subfolder',
                  items: [
                    {
                      text: 'Sub Folder - Sub File',
                      link: '/folder/subfolder/sub-file'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: useIndexFileForFolderMenuInfo', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        useIndexFileForFolderMenuInfo: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'index',
                  link: '/folder/subfolder/index',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: collapsed', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        collapsed: true,
        rootGroupCollapsed: false
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ],
                  collapsed: true
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }],
                  collapsed: true
                }
              ],
              collapsed: true
            }
          ],
          collapsed: false
        }
      ]
    );
    done();
  });

  it('Option: collapseDepth', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        collapseDepth: 2
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ],
                  collapsed: true
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }],
                  collapsed: true
                }
              ],
              collapsed: false
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: manualSortFileNameByPriority', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        manualSortFileNameByPriority: ['c-file-name.md', 'empty', 'a.md', 'folder']
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'c-file-name', link: '/c-file-name' },
            { text: 'a', link: '/a' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            },
            { text: 'b_file_name', link: '/b_file_name' }
          ]
        }
      ]
    );
    done();
  });

  it('Option: capitalizeFirst', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        capitalizeFirst: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'A', link: '/a' },
            { text: 'B_file_name', link: '/b_file_name' },
            { text: 'C-file-name', link: '/c-file-name' },
            {
              text: 'Folder',
              items: [
                { text: 'Folder-file', link: '/folder/folder-file' },
                {
                  text: 'Folder-index',
                  items: [
                    { text: 'Another', link: '/folder/folder-index/another' },
                    { text: 'Folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'Subfolder',
                  items: [{ text: 'Sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: includeEmptyFolder', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        includeEmptyFolder: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            { text: 'empty', items: [] },
            {
              text: 'folder',
              items: [
                {
                  text: 'empty',
                  items: []
                },
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: excludeFiles', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        excludeFiles: ['another.md', 'sub-file.md', 'a.md']
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [{ text: 'folder-index', link: '/folder/folder-index/folder-index' }]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: excludeFolders', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        excludeFolders: ['folder-index', 'subfolder']
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [{ text: 'folder-file', link: '/folder/folder-file' }]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: includeDotFiles', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        includeDotFiles: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                {
                  text: '.secret-folder',
                  items: [{ text: 'hello', link: '/folder/.secret-folder/hello' }]
                },
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [
                    { text: '.secret-file', link: '/folder/subfolder/.secret-file' },
                    { text: 'sub-file', link: '/folder/subfolder/sub-file' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Option: includeFolderIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'test/docs',
        includeFolderIndexFile: true
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'a', link: '/a' },
            { text: 'b_file_name', link: '/b_file_name' },
            { text: 'c-file-name', link: '/c-file-name' },
            {
              text: 'folder',
              items: [
                { text: 'folder-file', link: '/folder/folder-file' },
                {
                  text: 'folder-index',
                  items: [
                    { text: 'another', link: '/folder/folder-index/another' },
                    { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                  ]
                },
                {
                  text: 'subfolder',
                  items: [
                    { text: 'index', link: '/folder/subfolder/index' },
                    { text: 'sub-file', link: '/folder/subfolder/sub-file' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    );
    done();
  });

  it('Multiple Sidebars (A)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: 'test/docs',
          resolvePath: '/'
        },
        {
          documentRootPath: 'test/docs',
          scanStartPath: 'folder/subfolder',
          resolvePath: '/folder/sub/'
        }
      ]),
      {
        '/': [
          {
            text: 'Table of Contents',
            items: [
              { text: 'a', link: '/a' },
              { text: 'b_file_name', link: '/b_file_name' },
              { text: 'c-file-name', link: '/c-file-name' },
              {
                text: 'folder',
                items: [
                  { text: 'folder-file', link: '/folder/folder-file' },
                  {
                    text: 'folder-index',
                    items: [
                      { text: 'another', link: '/folder/folder-index/another' },
                      { text: 'folder-index', link: '/folder/folder-index/folder-index' }
                    ]
                  },
                  {
                    text: 'subfolder',
                    items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
                  }
                ]
              }
            ]
          }
        ],
        '/folder/sub/': [
          {
            text: 'Table of Contents',
            items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
          }
        ]
      }
    );
    done();
  });

  it('Multiple Sidebars (B)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {},
        {
          documentRootPath: 'test/docs',
          scanStartPath: 'folder/subfolder',
          includeDotFiles: true
        },
        {
          documentRootPath: 'test/docs',
          scanStartPath: 'folder/subfolder',
          resolvePath: '/page/without-dot/'
        },
        {
          documentRootPath: 'test/docs',
          scanStartPath: 'folder/folder-index',
          rootGroupText: 'Index',
          resolvePath: '/page/'
        }
      ]),
      {
        '/': [
          {
            text: 'Table of Contents',
            items: [
              { text: '.secret-file', link: '/folder/subfolder/.secret-file' },
              { text: 'sub-file', link: '/folder/subfolder/sub-file' }
            ]
          }
        ],
        '/page/without-dot/': [
          {
            text: 'Table of Contents',
            items: [{ text: 'sub-file', link: '/folder/subfolder/sub-file' }]
          }
        ],
        '/page/': [
          {
            text: 'Index',
            items: [
              { text: 'another', link: '/folder/folder-index/another' },
              { text: 'folder-index', link: '/folder/folder-index/folder-index' }
            ]
          }
        ]
      }
    );
    done();
  });

  it('Multiple Sidebars (C)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: 'test/docs',
          scanStartPath: 'folder/subfolder',
          resolvePath: '/path/'
        }
      ]),
      {
        '/path/': [
          {
            text: 'Table of Contents',
            items: [
              {
                text: 'sub-file',
                link: '/folder/subfolder/sub-file'
              }
            ]
          }
        ]
      }
    );
    done();
  });
});
