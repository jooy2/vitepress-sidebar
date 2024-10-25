import assert from 'assert';
import { generateSidebar } from '../../dist';

const TEST_DIR_BASE = 'test/resources';

describe('Test: APIs', () => {
  it('API: documentRootPath', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general/folder/subFolder`
      }),
      [
        {
          text: 'sub-folder-test',
          link: '/sub-folder-test'
        }
      ]
    );

    done();
  });

  it('API: useTitleFromFileHeading', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
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
          text: 'folder',
          items: [
            {
              text: 'folder-test-2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'FolderTestFile',
              link: '/folder/folder-test'
            },
            {
              text: 'subFolder',
              items: [
                {
                  text: 'SubFolderTestFile',
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

    done();
  });

  it('API: useTitleFromFrontmatter', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true
      }),
      [
        {
          text: 'A Frontmatter',
          link: '/a'
        },
        {
          text: 'B Frontmatter',
          link: '/b'
        },
        {
          text: 'C Frontmatter',
          link: '/c'
        },
        {
          text: 'D Frontmatter',
          link: '/d'
        }
      ]
    );

    done();
  });

  it('API: frontmatterTitleFieldName', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-custom-title-field`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        frontmatterTitleFieldName: 'sidebar_title'
      }),
      [
        {
          text: 'A Frontmatter Customized',
          link: '/a'
        },
        {
          text: 'B Frontmatter',
          link: '/b'
        }
      ]
    );

    done();
  });

  it('API: useFolderLinkFromSameNameSubFile (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useFolderLinkFromSameNameSubFile: true
      }),
      [
        {
          text: 'folder-name',
          link: '/folder-name/folder-name'
        }
      ]
    );

    done();
  });

  it('API: useFolderLinkFromSameNameSubFile (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderLinkFromSameNameSubFile: true
      }),
      [
        {
          text: 'Folder Text',
          link: '/folder-name/folder-name'
        }
      ]
    );

    done();
  });

  it('API: useFolderLinkFromSameNameSubFile (C)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderLinkFromSameNameSubFile: true,
        folderLinkNotIncludesFileName: true,
        includeRootIndexFile: true
      }),
      [
        {
          text: 'Folder Text',
          link: '/folder-name/'
        },
        {
          text: 'Root Index File',
          link: '/'
        }
      ]
    );

    done();
  });

  it('API: useFolderLinkFromSameNameSubFile (D)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useFolderLinkFromSameNameSubFile: true,
        includeEmptyFolder: false
      }),
      []
    );

    done();
  });

  it('API: useFolderLinkFromSameNameSubFile (E)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderLinkFromSameNameSubFile: true,
        useFolderTitleFromIndexFile: true
      }),
      [
        {
          text: 'Folder Text',
          link: '/folder-name/folder-name'
        }
      ]
    );

    done();
  });

  it('API: useFolderTitleFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        useFolderTitleFromIndexFile: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'One'
        },
        {
          text: 'Ten'
        },
        {
          text: 'Two'
        }
      ]
    );

    done();
  });

  it('API: useFolderLinkFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        useFolderLinkFromIndexFile: true
      }),
      [
        {
          text: '1-a',
          link: '/1-a/index.md'
        },
        {
          text: '10-a',
          link: '/10-a/index.md'
        },
        {
          text: '2-a',
          link: '/2-a/index.md'
        }
      ]
    );

    done();
  });

  it('API: collapsed', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        collapsed: true
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
              ],
              collapsed: true
            }
          ],
          collapsed: true
        },
        {
          text: 'folder-2',
          items: [
            {
              text: 'folder2',
              link: '/folder-2/folder2'
            }
          ],
          collapsed: true
        },
        {
          text: 'test',
          link: '/test'
        }
      ]
    );

    done();
  });

  it('API: collapseDepth', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        collapseDepth: 2
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
              ],
              collapsed: true
            }
          ],
          collapsed: false
        },
        {
          text: 'folder-2',
          items: [
            {
              text: 'folder2',
              link: '/folder-2/folder2'
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

    done();
  });

  it('API: manualSortFileNameByPriority', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        manualSortFileNameByPriority: ['b.md', 'a.md', 'd.md', 'c.md']
      }),
      [
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'd',
          link: '/d'
        },
        {
          text: 'c',
          link: '/c'
        }
      ]
    );

    done();
  });

  it('API: includeEmptyFolder', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        includeEmptyFolder: true
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
                  text: 'empty'
                },
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

    done();
  });

  it('API: excludeFiles', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/numeric-title`,
        excludeFiles: [
          '0-file.md',
          'not-exist-file.md',
          '3-afile.md',
          '3-bfile.md',
          '11-file.md',
          '100-file.md'
        ]
      }),
      [
        {
          text: '1-file',
          link: '/1-file'
        },
        {
          text: '10-file',
          link: '/10-file'
        },
        {
          text: '2-file',
          link: '/2-file'
        }
      ]
    );

    done();
  });

  it('API: excludeFilesByFrontmatterFieldName', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        excludeFilesByFrontmatterFieldName: 'exclude'
      }),
      [
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'c',
          link: '/c'
        }
      ]
    );

    done();
  });

  it('API: excludeFolders', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        excludeFolders: ['folder', 'folder-2']
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
          text: 'test',
          link: '/test'
        }
      ]
    );

    done();
  });

  it('API: includeDotFiles', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        includeDotFiles: true
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
                  text: '.dot-directory',
                  items: [
                    {
                      text: 'hidden',
                      link: '/folder/subFolder/.dot-directory/hidden'
                    }
                  ]
                },
                {
                  text: '.hidden',
                  link: '/folder/subFolder/.hidden'
                },
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

    done();
  });

  it('API: includeFolderIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        includeFolderIndexFile: true
      }),
      [
        {
          text: '1-a',
          items: [
            {
              text: 'index',
              link: '/1-a/'
            }
          ]
        },
        {
          text: '10-a',
          items: [
            {
              text: 'index',
              link: '/10-a/'
            }
          ]
        },
        {
          text: '2-a',
          items: [
            {
              text: 'index',
              link: '/2-a/'
            }
          ]
        }
      ]
    );

    done();
  });

  it('API: removePrefixAfterOrdering', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/numeric-prefix`,
        removePrefixAfterOrdering: true,
        prefixSeparator: '-'
      }),
      [
        {
          text: '1-1-one-file',
          link: '/1-1-1-one-file'
        },
        {
          text: 'folder',
          items: [
            {
              text: 'file',
              link: '/1-folder/11-file'
            }
          ]
        },
        {
          text: 'one-file',
          link: '/1-one-file'
        },
        {
          text: 'three-file',
          link: '/1-three-file'
        },
        {
          text: 'four-file',
          link: '/1.1.1-four-file'
        },
        {
          text: 'two-file',
          link: '/2-two-file'
        }
      ]
    );

    done();
  });

  it('API: sortMenusByName (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        sortMenusByName: true
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
              text: 'folder-test',
              link: '/folder/folder-test'
            },
            {
              text: 'folder-test-2',
              link: '/folder/folder-test-2'
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

    done();
  });

  it('API: sortMenusByName (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/sort-by-name`,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        sortMenusByName: true
      }),
      [
        {
          text: 'aaa',
          link: '/aaa'
        },
        {
          text: 'aab',
          link: '/aab'
        },
        {
          text: 'BBB',
          link: '/bbb'
        },
        {
          text: 'bcc',
          link: '/bcc'
        },
        {
          text: 'bdd',
          link: '/bdd'
        },
        {
          text: 'ccc',
          link: '/ccc'
        }
      ]
    );

    done();
  });

  it('API: sortMenusByFileDatePrefix (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/title-with-date-header`,
        sortMenusByFileDatePrefix: true
      }),
      [
        {
          text: '2024-01-01-hello',
          items: [
            {
              text: '2024-01-01-hello',
              link: '/2024-01-01-hello/2024-01-01-hello'
            },
            {
              text: '2024-01-02-hi',
              link: '/2024-01-01-hello/2024-01-02-hi'
            },
            {
              text: '2024-02-01-hello',
              link: '/2024-01-01-hello/2024-02-01-hello'
            }
          ]
        },
        {
          text: '2024-02-01-test',
          items: [
            {
              text: '2024-02-01-hello',
              link: '/2024-02-01-test/2024-02-01-hello'
            },
            {
              text: '2024-02-02-hi',
              link: '/2024-02-01-test/2024-02-02-hi'
            },
            {
              text: '2024-03-01-hi',
              link: '/2024-02-01-test/2024-03-01-hi'
            }
          ]
        }
      ]
    );

    done();
  });

  it('API: sortMenusByFileDatePrefix (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/title-with-date-header`,
        sortMenusByFileDatePrefix: true,
        prefixSeparator: /[0-9]{4}-[0-9]{2}-[0-9]{2}-/g,
        removePrefixAfterOrdering: true
      }),
      [
        {
          text: 'hello',
          items: [
            {
              text: 'hello',
              link: '/2024-01-01-hello/2024-01-01-hello'
            },
            {
              text: 'hi',
              link: '/2024-01-01-hello/2024-01-02-hi'
            },
            {
              text: 'hello',
              link: '/2024-01-01-hello/2024-02-01-hello'
            }
          ]
        },
        {
          text: 'test',
          items: [
            {
              text: 'hello',
              link: '/2024-02-01-test/2024-02-01-hello'
            },
            {
              text: 'hi',
              link: '/2024-02-01-test/2024-02-02-hi'
            },
            {
              text: 'hi',
              link: '/2024-02-01-test/2024-03-01-hi'
            }
          ]
        }
      ]
    );

    done();
  });

  it('API: sortMenusByFrontmatterOrder', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        sortMenusByFrontmatterOrder: true
      }),
      [
        {
          text: 'd',
          link: '/d'
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
          text: 'a',
          link: '/a'
        }
      ]
    );

    done();
  });

  it('API: rootGroup related configurations (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        rootGroupText: 'Hello',
        rootGroupLink: 'https://github.com/jooy2/vitepress-sidebar',
        rootGroupCollapsed: true
      }),
      [
        {
          text: 'Hello',
          link: 'https://github.com/jooy2/vitepress-sidebar',
          items: [
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
          collapsed: true
        }
      ]
    );

    done();
  });

  it('API: rootGroup related configurations (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        rootGroupText: '',
        rootGroupCollapsed: false
      }),
      [
        {
          text: '',
          items: [
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
          collapsed: false
        }
      ]
    );

    done();
  });

  it('API: keepMarkdownSyntaxFromTitle', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/special-markdown`,
        useTitleFromFileHeading: true,
        keepMarkdownSyntaxFromTitle: true
      }),
      [
        {
          text: '**Test** ~~Page~~',
          link: '/special-markdown'
        }
      ]
    );

    done();
  });

  it('API: sortMenusOrderNumericallyFromTitle', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/numeric-title`,
        sortMenusOrderNumericallyFromTitle: true
      }),
      [
        {
          text: '0-file',
          link: '/0-file'
        },
        {
          text: '1-file',
          link: '/1-file'
        },
        {
          text: '2-file',
          link: '/2-file'
        },
        {
          text: '3-afile',
          link: '/3-afile'
        },
        {
          text: '3-bfile',
          link: '/3-bfile'
        },
        {
          text: '10-file',
          link: '/10-file'
        },
        {
          text: '11-file',
          link: '/11-file'
        },
        {
          text: '100-file',
          link: '/100-file'
        }
      ]
    );

    done();
  });

  it('API: sortMenusOrderNumericallyFromLink', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        useFolderTitleFromIndexFile: true,
        useFolderLinkFromIndexFile: true,
        sortMenusOrderNumericallyFromLink: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          link: '/1-a/index.md',
          text: 'One'
        },
        {
          link: '/2-a/index.md',
          text: 'Two'
        },
        {
          link: '/10-a/index.md',
          text: 'Ten'
        }
      ]
    );

    done();
  });

  it('API: sortFolderTo (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        sortMenusByName: true,
        sortMenusOrderByDescending: true,
        sortFolderTo: 'top'
      }),
      [
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
          text: 'folder',
          items: [
            {
              text: 'subFolder',
              items: [
                {
                  text: 'sub-folder-test',
                  link: '/folder/subFolder/sub-folder-test'
                }
              ]
            },
            {
              text: 'folder-test-2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'folder-test',
              link: '/folder/folder-test'
            }
          ]
        },
        {
          text: 'test',
          link: '/test'
        },
        {
          text: 'c',
          link: '/c'
        },
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'a',
          link: '/a'
        }
      ]
    );

    done();
  });

  it('API: sortFolderTo (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        sortMenusByName: true,
        sortFolderTo: 'bottom'
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
          text: 'test',
          link: '/test'
        },
        {
          text: 'folder',
          items: [
            {
              text: 'folder-test',
              link: '/folder/folder-test'
            },
            {
              text: 'folder-test-2',
              link: '/folder/folder-test-2'
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
        }
      ]
    );

    done();
  });

  it('API: hyphenToSpace', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/format-title`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true
      }),
      [
        {
          text: '<b>html format title</b>link title',
          link: '/test'
        },
        {
          text: '~~hello world_1~~ hello world_2 <b class="hello-world_3">hello world_4</b>',
          link: '/test2'
        },
        {
          text: '<h1 class="test-class_1" style="font-size: 10px; font-weight: bold">abc def_g</h1>',
          link: '/test3'
        }
      ]
    );

    done();
  });

  it('API: underscoreToSpace', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/format-title`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        underscoreToSpace: true
      }),
      [
        {
          text: '<b>html-format-title</b>link-title',
          link: '/test'
        },
        {
          text: '~~hello-world 1~~ hello-world 2 <b class="hello-world_3">hello-world 4</b>',
          link: '/test2'
        },
        {
          text: '<h1 class="test-class_1" style="font-size: 10px; font-weight: bold">abc-def g</h1>',
          link: '/test3'
        }
      ]
    );

    done();
  });

  it('API: capitalizeFirst (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        capitalizeFirst: true
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
              text: 'Folder-test-2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'Folder-test',
              link: '/folder/folder-test'
            },
            {
              text: 'SubFolder',
              items: [
                {
                  text: 'Sub-folder-test',
                  link: '/folder/subFolder/sub-folder-test'
                }
              ]
            }
          ]
        },
        {
          text: 'Folder-2',
          items: [
            {
              text: 'Folder2',
              link: '/folder-2/folder2'
            }
          ]
        },
        {
          text: 'Test',
          link: '/test'
        }
      ]
    );

    done();
  });

  it('API: capitalizeFirst (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/format-folder`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        capitalizeFirst: true
      }),
      [
        {
          items: [
            {
              link: '/folder text hello/file',
              text: 'Hello'
            }
          ],
          text: 'Folder text hello'
        },
        {
          items: [
            {
              link: '/folder-text_sample/file',
              text: 'Hello'
            }
          ],
          text: 'Folder-text_sample'
        }
      ]
    );

    done();
  });

  it('API: capitalizeEachWords (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        hyphenToSpace: true,
        documentRootPath: `${TEST_DIR_BASE}/general`,
        capitalizeEachWords: true
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
              text: 'Folder Test 2',
              link: '/folder/folder-test-2'
            },
            {
              text: 'Folder Test',
              link: '/folder/folder-test'
            },
            {
              text: 'SubFolder',
              items: [
                {
                  text: 'Sub Folder Test',
                  link: '/folder/subFolder/sub-folder-test'
                }
              ]
            }
          ]
        },
        {
          text: 'Folder 2',
          items: [
            {
              text: 'Folder2',
              link: '/folder-2/folder2'
            }
          ]
        },
        {
          text: 'Test',
          link: '/test'
        }
      ]
    );

    done();
  });

  it('API: capitalizeEachWords (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/capitalize`,
        useTitleFromFileHeading: true,
        capitalizeEachWords: true
      }),
      [
        {
          text: '1-Abc-Def',
          link: '/1-abc-def'
        },
        {
          text: 'A Hello World Abc-Def',
          link: '/2'
        },
        {
          text: 'Abc1def2g',
          link: '/abc1def2g'
        }
      ]
    );

    done();
  });

  it('API: sortMenusByFrontmatterDate', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        sortMenusByFrontmatterDate: true
      }),
      [
        {
          text: 'b',
          link: '/b'
        },
        {
          text: 'a',
          link: '/a'
        },
        {
          text: 'c',
          link: '/c'
        },
        {
          text: 'd',
          link: '/d'
        }
      ]
    );

    done();
  });

  it('API: excludePattern (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        excludePattern: ['**/*-test.md', 'b.md', '.dot-directory']
      }),
      [
        {
          text: 'a',
          link: '/a'
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

    done();
  });

  it('API: excludePattern (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/general`,
        excludePattern: ['folder', 'a.md', '[b|c].md']
      }),
      [
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

    done();
  });
});
