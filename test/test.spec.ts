import assert from 'assert';
import { generateSidebar } from '../dist/index.js';

describe('VitePress Sidebar Test Case', () => {
  it('Basic configurations', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs'
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

  it('With complex configurations', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
        rootGroupText: 'RootGroup',
        collapsed: false,
        hyphenToSpace: true,
        underscoreToSpace: true,
        withIndex: true
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
          ],
          collapsed: false
        }
      ]
    );
    done();
  });

  it('Option: useTitleFromFileHeading', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
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
        root: 'test/docs',
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
        root: 'test/docs',
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
        root: 'test/docs',
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

  it('Option: collapsed', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
        collapsed: true
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
          collapsed: true
        }
      ]
    );
    done();
  });

  it('Option: collapseDepth', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
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
          ],
          collapsed: false
        }
      ]
    );
    done();
  });

  it('Option: sortByFileName', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
        sortByFileName: ['c-file-name.md', 'empty', 'a.md', 'folder']
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
        root: 'test/docs',
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

  it('Option: includeEmptyGroup', (done) => {
    assert.deepEqual(
      generateSidebar({
        root: 'test/docs',
        includeEmptyGroup: true
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
});
