import assert from 'assert';
import { generateSidebar } from '../dist';

const TEST_DIR_BASE = 'test/res';

describe('VitePress Sidebar Test', () => {
  it('No configurations (A)', (done) => {
    assert.deepStrictEqual(generateSidebar(), [
      {
        text: 'CHANGELOG',
        link: '/CHANGELOG'
      },
      {
        text: 'CODE_OF_CONDUCT',
        link: '/CODE_OF_CONDUCT'
      },
      {
        text: 'README',
        link: '/README'
      },
      {
        text: 'docs',
        items: [
          {
            text: 'api',
            link: '/docs/api'
          },
          {
            text: 'getting-started',
            link: '/docs/getting-started'
          },
          {
            text: 'multiple-sidebars-how-to',
            link: '/docs/multiple-sidebars-how-to'
          },
          {
            text: 'troubleshooting',
            link: '/docs/troubleshooting'
          }
        ]
      },
      {
        text: 'test',
        items: [
          {
            text: 'res',
            items: [
              {
                text: 'folder-with-index',
                items: [
                  {
                    text: '1-a',
                    items: []
                  },
                  {
                    text: '10-a',
                    items: []
                  },
                  {
                    text: '2-a',
                    items: []
                  }
                ]
              },
              {
                text: 'folder-with-same-name-file',
                items: [
                  {
                    text: 'folder-with-same-name-file',
                    link: '/test/res/folder-with-same-name-file/folder-with-same-name-file'
                  }
                ]
              },
              {
                text: 'folder-with-special-char-file',
                items: [
                  {
                    text: 'hypen-doc',
                    link: '/test/res/folder-with-special-char-file/hypen-doc'
                  },
                  {
                    text: 'special@#$characters',
                    link: '/test/res/folder-with-special-char-file/special@#$characters'
                  },
                  {
                    text: 'underscore_doc',
                    link: '/test/res/folder-with-special-char-file/underscore_doc'
                  }
                ]
              },
              {
                text: 'frontmatter-basic',
                items: [
                  {
                    text: 'a',
                    link: '/test/res/frontmatter-basic/a'
                  },
                  {
                    text: 'b',
                    link: '/test/res/frontmatter-basic/b'
                  },
                  {
                    text: 'c',
                    link: '/test/res/frontmatter-basic/c'
                  },
                  {
                    text: 'd',
                    link: '/test/res/frontmatter-basic/d'
                  }
                ]
              },
              {
                text: 'numeric-prefix',
                items: [
                  {
                    text: '1-1-1-one-file',
                    link: '/test/res/numeric-prefix/1-1-1-one-file'
                  },
                  {
                    text: '1-folder',
                    items: [
                      {
                        text: '11-file',
                        link: '/test/res/numeric-prefix/1-folder/11-file'
                      }
                    ]
                  },
                  {
                    text: '1-one-file',
                    link: '/test/res/numeric-prefix/1-one-file'
                  },
                  {
                    text: '1-three-file',
                    link: '/test/res/numeric-prefix/1-three-file'
                  },
                  {
                    text: '1.1.1-four-file',
                    link: '/test/res/numeric-prefix/1.1.1-four-file'
                  },
                  {
                    text: '2-two-file',
                    link: '/test/res/numeric-prefix/2-two-file'
                  }
                ]
              },
              {
                text: 'numeric-title',
                items: [
                  {
                    text: '0-file',
                    link: '/test/res/numeric-title/0-file'
                  },
                  {
                    text: '1-file',
                    link: '/test/res/numeric-title/1-file'
                  },
                  {
                    text: '10-file',
                    link: '/test/res/numeric-title/10-file'
                  },
                  {
                    text: '100-file',
                    link: '/test/res/numeric-title/100-file'
                  },
                  {
                    text: '11-file',
                    link: '/test/res/numeric-title/11-file'
                  },
                  {
                    text: '2-file',
                    link: '/test/res/numeric-title/2-file'
                  },
                  {
                    text: '3-afile',
                    link: '/test/res/numeric-title/3-afile'
                  },
                  {
                    text: '3-bfile',
                    link: '/test/res/numeric-title/3-bfile'
                  }
                ]
              },
              {
                text: 'recursive',
                items: [
                  {
                    text: 'folderA',
                    items: [
                      {
                        text: 'a',
                        link: '/test/res/recursive/folderA/a'
                      },
                      {
                        text: 'folderAA',
                        items: [
                          {
                            text: 'aa',
                            link: '/test/res/recursive/folderA/folderAA/aa'
                          },
                          {
                            text: 'folderAAA',
                            items: [
                              {
                                text: 'folderAAAA',
                                items: [
                                  {
                                    text: 'folderAAAAA',
                                    items: [
                                      {
                                        text: 'aaaaa',
                                        link: '/test/res/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    text: 'folderB',
                    items: [
                      {
                        text: 'folderBB',
                        items: [
                          {
                            text: 'folderBBB',
                            items: [
                              {
                                text: 'bbb',
                                link: '/test/res/recursive/folderB/folderBB/folderBBB/bbb'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);

    done();
  });

  it('No configurations (B)', (done) => {
    assert.deepStrictEqual(generateSidebar({}), [
      {
        text: 'CHANGELOG',
        link: '/CHANGELOG'
      },
      {
        text: 'CODE_OF_CONDUCT',
        link: '/CODE_OF_CONDUCT'
      },
      {
        text: 'README',
        link: '/README'
      },
      {
        text: 'docs',
        items: [
          {
            text: 'api',
            link: '/docs/api'
          },
          {
            text: 'getting-started',
            link: '/docs/getting-started'
          },
          {
            text: 'multiple-sidebars-how-to',
            link: '/docs/multiple-sidebars-how-to'
          },
          {
            text: 'troubleshooting',
            link: '/docs/troubleshooting'
          }
        ]
      },
      {
        text: 'test',
        items: [
          {
            text: 'res',
            items: [
              {
                text: 'folder-with-index',
                items: [
                  {
                    text: '1-a',
                    items: []
                  },
                  {
                    text: '10-a',
                    items: []
                  },
                  {
                    text: '2-a',
                    items: []
                  }
                ]
              },
              {
                text: 'folder-with-same-name-file',
                items: [
                  {
                    text: 'folder-with-same-name-file',
                    link: '/test/res/folder-with-same-name-file/folder-with-same-name-file'
                  }
                ]
              },
              {
                text: 'folder-with-special-char-file',
                items: [
                  {
                    text: 'hypen-doc',
                    link: '/test/res/folder-with-special-char-file/hypen-doc'
                  },
                  {
                    text: 'special@#$characters',
                    link: '/test/res/folder-with-special-char-file/special@#$characters'
                  },
                  {
                    text: 'underscore_doc',
                    link: '/test/res/folder-with-special-char-file/underscore_doc'
                  }
                ]
              },
              {
                text: 'frontmatter-basic',
                items: [
                  {
                    text: 'a',
                    link: '/test/res/frontmatter-basic/a'
                  },
                  {
                    text: 'b',
                    link: '/test/res/frontmatter-basic/b'
                  },
                  {
                    text: 'c',
                    link: '/test/res/frontmatter-basic/c'
                  },
                  {
                    text: 'd',
                    link: '/test/res/frontmatter-basic/d'
                  }
                ]
              },
              {
                text: 'numeric-prefix',
                items: [
                  {
                    text: '1-1-1-one-file',
                    link: '/test/res/numeric-prefix/1-1-1-one-file'
                  },
                  {
                    text: '1-folder',
                    items: [
                      {
                        text: '11-file',
                        link: '/test/res/numeric-prefix/1-folder/11-file'
                      }
                    ]
                  },
                  {
                    text: '1-one-file',
                    link: '/test/res/numeric-prefix/1-one-file'
                  },
                  {
                    text: '1-three-file',
                    link: '/test/res/numeric-prefix/1-three-file'
                  },
                  {
                    text: '1.1.1-four-file',
                    link: '/test/res/numeric-prefix/1.1.1-four-file'
                  },
                  {
                    text: '2-two-file',
                    link: '/test/res/numeric-prefix/2-two-file'
                  }
                ]
              },
              {
                text: 'numeric-title',
                items: [
                  {
                    text: '0-file',
                    link: '/test/res/numeric-title/0-file'
                  },
                  {
                    text: '1-file',
                    link: '/test/res/numeric-title/1-file'
                  },
                  {
                    text: '10-file',
                    link: '/test/res/numeric-title/10-file'
                  },
                  {
                    text: '100-file',
                    link: '/test/res/numeric-title/100-file'
                  },
                  {
                    text: '11-file',
                    link: '/test/res/numeric-title/11-file'
                  },
                  {
                    text: '2-file',
                    link: '/test/res/numeric-title/2-file'
                  },
                  {
                    text: '3-afile',
                    link: '/test/res/numeric-title/3-afile'
                  },
                  {
                    text: '3-bfile',
                    link: '/test/res/numeric-title/3-bfile'
                  }
                ]
              },
              {
                text: 'recursive',
                items: [
                  {
                    text: 'folderA',
                    items: [
                      {
                        text: 'a',
                        link: '/test/res/recursive/folderA/a'
                      },
                      {
                        text: 'folderAA',
                        items: [
                          {
                            text: 'aa',
                            link: '/test/res/recursive/folderA/folderAA/aa'
                          },
                          {
                            text: 'folderAAA',
                            items: [
                              {
                                text: 'folderAAAA',
                                items: [
                                  {
                                    text: 'folderAAAAA',
                                    items: [
                                      {
                                        text: 'aaaaa',
                                        link: '/test/res/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    text: 'folderB',
                    items: [
                      {
                        text: 'folderBB',
                        items: [
                          {
                            text: 'folderBBB',
                            items: [
                              {
                                text: 'bbb',
                                link: '/test/res/recursive/folderB/folderBB/folderBBB/bbb'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);

    done();
  });

  it('With complex configurations (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        collapsed: false,
        hyphenToSpace: true,
        underscoreToSpace: true,
        includeRootIndexFile: true,
        useTitleFromFrontmatter: true,
        excludeFiles: ['a.md', 'c.md'],
        excludeFolders: [
          'folder-with-index',
          'folder-with-same-name-file',
          'folder-with-special-char-file'
        ]
      }),
      [
        {
          text: 'frontmatter basic',
          items: [
            {
              text: 'B Frontmatter',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'D Frontmatter',
              link: '/frontmatter-basic/d'
            }
          ],
          collapsed: false
        },
        {
          text: 'numeric prefix',
          items: [
            {
              text: '1 1 1 one file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1 folder',
              items: [
                {
                  text: '11 file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ],
              collapsed: false
            },
            {
              text: '1 one file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1 three file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1 four file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2 two file',
              link: '/numeric-prefix/2-two-file'
            }
          ],
          collapsed: false
        },
        {
          text: 'numeric title',
          items: [
            {
              text: '0 file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1 file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10 file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100 file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11 file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2 file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3 afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3 bfile',
              link: '/numeric-title/3-bfile'
            }
          ],
          collapsed: false
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ],
                              collapsed: false
                            }
                          ],
                          collapsed: false
                        }
                      ],
                      collapsed: false
                    }
                  ],
                  collapsed: false
                }
              ],
              collapsed: false
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ],
                      collapsed: false
                    }
                  ],
                  collapsed: false
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

  it('With complex configurations (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        includeEmptyFolder: true,
        includeDotFiles: true,
        excludeFiles: [],
        excludeFolders: [
          'numeric-prefix',
          'numeric-title',
          'recursive',
          '.special-markdown',
          '.title-with-date-header'
        ],
        hyphenToSpace: true,
        underscoreToSpace: true,
        capitalizeFirst: true,
        useTitleFromFrontmatter: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: '.dot directory',
          items: [
            {
              text: 'DotFile',
              link: '/.dot-directory/.dot-file'
            },
            {
              text: 'File',
              link: '/.dot-directory/normal-file'
            }
          ]
        },
        {
          text: 'Empty',
          items: []
        },
        {
          text: 'Folder with index',
          items: [
            {
              text: '1 a',
              items: []
            },
            {
              text: '10 a',
              items: []
            },
            {
              text: '2 a',
              items: []
            }
          ]
        },
        {
          text: 'Folder with same name file',
          items: [
            {
              text: 'Folder With Same Name File',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'Folder with special char file',
          items: [
            {
              text: 'Hypen Doc File',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'Special Characters File',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'Underscore Doc File',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'Folder within md',
          items: []
        },
        {
          text: 'Frontmatter basic',
          items: [
            {
              text: 'A Frontmatter',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'B Frontmatter',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'C Frontmatter',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'D Frontmatter',
              link: '/frontmatter-basic/d'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: documentRootPath', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE
      }),
      [
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'a',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'b',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'c',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'd',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ]
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ]
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

  it('Option: useTitleFromFileHeading', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'Folder With Same Name File',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'Hypen Doc File',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'Special Characters File',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'Underscore Doc File',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'A File',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'B File',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'C File',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'D File',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0. Hello',
              link: '/numeric-title/0-file'
            },
            {
              text: '1. Hello',
              link: '/numeric-title/1-file'
            },
            {
              text: '10. Hello',
              link: '/numeric-title/10-file'
            },
            {
              text: '100. Hello',
              link: '/numeric-title/100-file'
            },
            {
              text: '11. Hello',
              link: '/numeric-title/11-file'
            },
            {
              text: '2. Hello',
              link: '/numeric-title/2-file'
            },
            {
              text: '3. Hello (A)',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3. Hello (B)',
              link: '/numeric-title/3-bfile'
            }
          ]
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'A File',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'AA File',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'AAAAA File',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'BBB File',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ]
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

  it('Option: convertSameNameSubFileToGroupIndexPage (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: 'folder-with-same-name-file',
          link: '/folder-with-same-name-file'
        }
      ]
    );

    done();
  });

  it('Option: convertSameNameSubFileToGroupIndexPage (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: 'Folder With Same Name File',
          link: '/folder-with-same-name-file'
        }
      ]
    );

    done();
  });

  it('Option: convertSameNameSubFileToGroupIndexPage (C)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-same-name-file`,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true,
        folderLinkNotIncludesFileName: true
      }),
      [
        {
          text: 'Folder With Same Name File',
          link: '/folder-with-same-name-file'
        }
      ]
    );

    done();
  });

  it('Option: useFolderTitleFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        useFolderTitleFromIndexFile: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'One',
          items: []
        },
        {
          text: 'Ten',
          items: []
        },
        {
          text: 'Two',
          items: []
        }
      ]
    );

    done();
  });

  it('Option: useFolderLinkFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        useFolderLinkFromIndexFile: true
      }),
      [
        {
          text: '1-a',
          link: '/1-a/index.md',
          items: []
        },
        {
          text: '10-a',
          link: '/10-a/index.md',
          items: []
        },
        {
          text: '2-a',
          link: '/2-a/index.md',
          items: []
        }
      ]
    );

    done();
  });

  it('Option: collapsed', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        collapsed: true
      }),
      [
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: [],
              collapsed: true
            },
            {
              text: '10-a',
              items: [],
              collapsed: true
            },
            {
              text: '2-a',
              items: [],
              collapsed: true
            }
          ],
          collapsed: true
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ],
          collapsed: true
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ],
          collapsed: true
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'a',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'b',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'c',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'd',
              link: '/frontmatter-basic/d'
            }
          ],
          collapsed: true
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ],
              collapsed: true
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ],
          collapsed: true
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ],
          collapsed: true
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ],
                              collapsed: true
                            }
                          ],
                          collapsed: true
                        }
                      ],
                      collapsed: true
                    }
                  ],
                  collapsed: true
                }
              ],
              collapsed: true
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ],
                      collapsed: true
                    }
                  ],
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
        documentRootPath: TEST_DIR_BASE,
        collapseDepth: 2
      }),
      [
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: [],
              collapsed: true
            },
            {
              text: '10-a',
              items: [],
              collapsed: true
            },
            {
              text: '2-a',
              items: [],
              collapsed: true
            }
          ],
          collapsed: false
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ],
          collapsed: false
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ],
          collapsed: false
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'a',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'b',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'c',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'd',
              link: '/frontmatter-basic/d'
            }
          ],
          collapsed: false
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ],
              collapsed: true
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ],
          collapsed: false
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ],
          collapsed: false
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ],
                              collapsed: true
                            }
                          ],
                          collapsed: true
                        }
                      ],
                      collapsed: true
                    }
                  ],
                  collapsed: true
                }
              ],
              collapsed: true
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ],
                      collapsed: true
                    }
                  ],
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

  it('Option: manualSortFileNameByPriority', (done) => {
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

  it('Option: capitalizeFirst', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        capitalizeFirst: true
      }),
      [
        {
          text: 'Folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'Folder-with-same-name-file',
          items: [
            {
              text: 'Folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'Folder-with-special-char-file',
          items: [
            {
              text: 'Hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'Special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'Underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'Frontmatter-basic',
          items: [
            {
              text: 'A',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'B',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'C',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'D',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'Numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'Numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ]
        },
        {
          text: 'Recursive',
          items: [
            {
              text: 'FolderA',
              items: [
                {
                  text: 'A',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'FolderAA',
                  items: [
                    {
                      text: 'Aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'FolderAAA',
                      items: [
                        {
                          text: 'FolderAAAA',
                          items: [
                            {
                              text: 'FolderAAAAA',
                              items: [
                                {
                                  text: 'Aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'FolderB',
              items: [
                {
                  text: 'FolderBB',
                  items: [
                    {
                      text: 'FolderBBB',
                      items: [
                        {
                          text: 'Bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ]
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

  it('Option: includeEmptyFolder', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        includeEmptyFolder: true
      }),
      [
        {
          text: 'empty',
          items: []
        },
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'folder-within-md',
          items: []
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'a',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'b',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'c',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'd',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ]
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderC',
              items: []
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

  it('Option: excludeFilesByFrontmatter', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/frontmatter-basic`,
        excludeFilesByFrontmatter: true
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

  it('Option: excludeFolders', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        excludeFolders: [
          'folder-with-index',
          'frontmatter-basic',
          'not-exist-folder',
          'numeic-prefix',
          'recursive'
        ]
      }),
      [
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
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
        documentRootPath: TEST_DIR_BASE,
        includeDotFiles: true,
        excludeFolders: [
          'folder-with-same-name-file',
          '.special-markdown',
          '.title-with-date-header',
          'recursive',
          'frontmatter-basic',
          'numeric-prefix',
          'numeric-title'
        ]
      }),
      [
        {
          text: '.dot-directory',
          items: [
            {
              text: '.dot-file',
              link: '/.dot-directory/.dot-file'
            },
            {
              text: 'normal-file',
              link: '/.dot-directory/normal-file'
            }
          ]
        },
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
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
        documentRootPath: `${TEST_DIR_BASE}/folder-with-index`,
        includeFolderIndexFile: true
      }),
      [
        {
          text: '1-a',
          items: [
            {
              text: 'index',
              link: '/1-a/index'
            }
          ]
        },
        {
          text: '10-a',
          items: [
            {
              text: 'index',
              link: '/10-a/index'
            }
          ]
        },
        {
          text: '2-a',
          items: [
            {
              text: 'index',
              link: '/2-a/index'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: removePrefixAfterOrdering', (done) => {
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

  it('Option: sortMenusByName', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        sortMenusByName: true
      }),
      [
        {
          text: 'folder-with-index',
          items: [
            {
              text: '1-a',
              items: []
            },
            {
              text: '10-a',
              items: []
            },
            {
              text: '2-a',
              items: []
            }
          ]
        },
        {
          text: 'folder-with-same-name-file',
          items: [
            {
              text: 'folder-with-same-name-file',
              link: '/folder-with-same-name-file/folder-with-same-name-file'
            }
          ]
        },
        {
          text: 'folder-with-special-char-file',
          items: [
            {
              text: 'hypen-doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'frontmatter-basic',
          items: [
            {
              text: 'a',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'b',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'c',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'd',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'numeric-prefix',
          items: [
            {
              text: '1-1-1-one-file',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1-folder',
              items: [
                {
                  text: '11-file',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1-one-file',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1-three-file',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1-four-file',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2-two-file',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'numeric-title',
          items: [
            {
              text: '0-file',
              link: '/numeric-title/0-file'
            },
            {
              text: '1-file',
              link: '/numeric-title/1-file'
            },
            {
              text: '10-file',
              link: '/numeric-title/10-file'
            },
            {
              text: '100-file',
              link: '/numeric-title/100-file'
            },
            {
              text: '11-file',
              link: '/numeric-title/11-file'
            },
            {
              text: '2-file',
              link: '/numeric-title/2-file'
            },
            {
              text: '3-afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3-bfile',
              link: '/numeric-title/3-bfile'
            }
          ]
        },
        {
          text: 'recursive',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: '/recursive/folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: '/recursive/folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: '/recursive/folderB/folderBB/folderBBB/bbb'
                        }
                      ]
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

  it('Option: sortMenusByFileDatePrefix (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/.title-with-date-header`,
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

  it('Option: sortMenusByFileDatePrefix (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/.title-with-date-header`,
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

  it('Option: sortMenusByFrontmatterOrder', (done) => {
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

  it('Option: rootGroup related configurations (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
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
              text: 'folder-with-index',
              items: [
                {
                  text: '1-a',
                  items: []
                },
                {
                  text: '10-a',
                  items: []
                },
                {
                  text: '2-a',
                  items: []
                }
              ]
            },
            {
              text: 'folder-with-same-name-file',
              items: [
                {
                  text: 'folder-with-same-name-file',
                  link: '/folder-with-same-name-file/folder-with-same-name-file'
                }
              ]
            },
            {
              text: 'folder-with-special-char-file',
              items: [
                {
                  text: 'hypen-doc',
                  link: '/folder-with-special-char-file/hypen-doc'
                },
                {
                  text: 'special@#$characters',
                  link: '/folder-with-special-char-file/special@#$characters'
                },
                {
                  text: 'underscore_doc',
                  link: '/folder-with-special-char-file/underscore_doc'
                }
              ]
            },
            {
              text: 'frontmatter-basic',
              items: [
                {
                  text: 'a',
                  link: '/frontmatter-basic/a'
                },
                {
                  text: 'b',
                  link: '/frontmatter-basic/b'
                },
                {
                  text: 'c',
                  link: '/frontmatter-basic/c'
                },
                {
                  text: 'd',
                  link: '/frontmatter-basic/d'
                }
              ]
            },
            {
              text: 'numeric-prefix',
              items: [
                {
                  text: '1-1-1-one-file',
                  link: '/numeric-prefix/1-1-1-one-file'
                },
                {
                  text: '1-folder',
                  items: [
                    {
                      text: '11-file',
                      link: '/numeric-prefix/1-folder/11-file'
                    }
                  ]
                },
                {
                  text: '1-one-file',
                  link: '/numeric-prefix/1-one-file'
                },
                {
                  text: '1-three-file',
                  link: '/numeric-prefix/1-three-file'
                },
                {
                  text: '1.1.1-four-file',
                  link: '/numeric-prefix/1.1.1-four-file'
                },
                {
                  text: '2-two-file',
                  link: '/numeric-prefix/2-two-file'
                }
              ]
            },
            {
              text: 'numeric-title',
              items: [
                {
                  text: '0-file',
                  link: '/numeric-title/0-file'
                },
                {
                  text: '1-file',
                  link: '/numeric-title/1-file'
                },
                {
                  text: '10-file',
                  link: '/numeric-title/10-file'
                },
                {
                  text: '100-file',
                  link: '/numeric-title/100-file'
                },
                {
                  text: '11-file',
                  link: '/numeric-title/11-file'
                },
                {
                  text: '2-file',
                  link: '/numeric-title/2-file'
                },
                {
                  text: '3-afile',
                  link: '/numeric-title/3-afile'
                },
                {
                  text: '3-bfile',
                  link: '/numeric-title/3-bfile'
                }
              ]
            },
            {
              text: 'recursive',
              items: [
                {
                  text: 'folderA',
                  items: [
                    {
                      text: 'a',
                      link: '/recursive/folderA/a'
                    },
                    {
                      text: 'folderAA',
                      items: [
                        {
                          text: 'aa',
                          link: '/recursive/folderA/folderAA/aa'
                        },
                        {
                          text: 'folderAAA',
                          items: [
                            {
                              text: 'folderAAAA',
                              items: [
                                {
                                  text: 'folderAAAAA',
                                  items: [
                                    {
                                      text: 'aaaaa',
                                      link: '/recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: 'folderB',
                  items: [
                    {
                      text: 'folderBB',
                      items: [
                        {
                          text: 'folderBBB',
                          items: [
                            {
                              text: 'bbb',
                              link: '/recursive/folderB/folderBB/folderBBB/bbb'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          collapsed: true
        }
      ]
    );

    done();
  });

  it('Option: rootGroup related configurations (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: TEST_DIR_BASE,
        rootGroupText: '',
        rootGroupCollapsed: false,
        excludeFolders: [
          'recursive',
          'folder-with-index',
          'folder-with-same-name-file',
          'folder-with-special-char-file'
        ]
      }),
      [
        {
          text: '',
          items: [
            {
              text: 'frontmatter-basic',
              items: [
                {
                  text: 'a',
                  link: '/frontmatter-basic/a'
                },
                {
                  text: 'b',
                  link: '/frontmatter-basic/b'
                },
                {
                  text: 'c',
                  link: '/frontmatter-basic/c'
                },
                {
                  text: 'd',
                  link: '/frontmatter-basic/d'
                }
              ]
            },
            {
              text: 'numeric-prefix',
              items: [
                {
                  text: '1-1-1-one-file',
                  link: '/numeric-prefix/1-1-1-one-file'
                },
                {
                  text: '1-folder',
                  items: [
                    {
                      text: '11-file',
                      link: '/numeric-prefix/1-folder/11-file'
                    }
                  ]
                },
                {
                  text: '1-one-file',
                  link: '/numeric-prefix/1-one-file'
                },
                {
                  text: '1-three-file',
                  link: '/numeric-prefix/1-three-file'
                },
                {
                  text: '1.1.1-four-file',
                  link: '/numeric-prefix/1.1.1-four-file'
                },
                {
                  text: '2-two-file',
                  link: '/numeric-prefix/2-two-file'
                }
              ]
            },
            {
              text: 'numeric-title',
              items: [
                {
                  text: '0-file',
                  link: '/numeric-title/0-file'
                },
                {
                  text: '1-file',
                  link: '/numeric-title/1-file'
                },
                {
                  text: '10-file',
                  link: '/numeric-title/10-file'
                },
                {
                  text: '100-file',
                  link: '/numeric-title/100-file'
                },
                {
                  text: '11-file',
                  link: '/numeric-title/11-file'
                },
                {
                  text: '2-file',
                  link: '/numeric-title/2-file'
                },
                {
                  text: '3-afile',
                  link: '/numeric-title/3-afile'
                },
                {
                  text: '3-bfile',
                  link: '/numeric-title/3-bfile'
                }
              ]
            }
          ],
          collapsed: false
        }
      ]
    );

    done();
  });

  it('Option: keepMarkdownSyntaxFromTitle', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: `${TEST_DIR_BASE}/.special-markdown`,
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

  it('Option: sortMenusOrderNumericallyFromTitle', (done) => {
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

  it('Option: sortMenusOrderNumericallyFromLink', (done) => {
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
          text: 'One',
          items: []
        },
        {
          link: '/2-a/index.md',
          text: 'Two',
          items: []
        },
        {
          link: '/10-a/index.md',
          text: 'Ten',
          items: []
        }
      ]
    );

    done();
  });

  it('Option: capitalizeEachWords', (done) => {
    assert.deepEqual(
      generateSidebar({
        hyphenToSpace: true,
        documentRootPath: TEST_DIR_BASE,
        excludeFolders: ['recursive', 'folder-with-index', 'folder-with-same-name-file'],
        capitalizeEachWords: true
      }),
      [
        {
          text: 'Folder With Special Char File',
          items: [
            {
              text: 'Hypen Doc',
              link: '/folder-with-special-char-file/hypen-doc'
            },
            {
              text: 'Special@#$characters',
              link: '/folder-with-special-char-file/special@#$characters'
            },
            {
              text: 'Underscore_doc',
              link: '/folder-with-special-char-file/underscore_doc'
            }
          ]
        },
        {
          text: 'Frontmatter Basic',
          items: [
            {
              text: 'A',
              link: '/frontmatter-basic/a'
            },
            {
              text: 'B',
              link: '/frontmatter-basic/b'
            },
            {
              text: 'C',
              link: '/frontmatter-basic/c'
            },
            {
              text: 'D',
              link: '/frontmatter-basic/d'
            }
          ]
        },
        {
          text: 'Numeric Prefix',
          items: [
            {
              text: '1 1 1 One File',
              link: '/numeric-prefix/1-1-1-one-file'
            },
            {
              text: '1 Folder',
              items: [
                {
                  text: '11 File',
                  link: '/numeric-prefix/1-folder/11-file'
                }
              ]
            },
            {
              text: '1 One File',
              link: '/numeric-prefix/1-one-file'
            },
            {
              text: '1 Three File',
              link: '/numeric-prefix/1-three-file'
            },
            {
              text: '1.1.1 Four File',
              link: '/numeric-prefix/1.1.1-four-file'
            },
            {
              text: '2 Two File',
              link: '/numeric-prefix/2-two-file'
            }
          ]
        },
        {
          text: 'Numeric Title',
          items: [
            {
              text: '0 File',
              link: '/numeric-title/0-file'
            },
            {
              text: '1 File',
              link: '/numeric-title/1-file'
            },
            {
              text: '10 File',
              link: '/numeric-title/10-file'
            },
            {
              text: '100 File',
              link: '/numeric-title/100-file'
            },
            {
              text: '11 File',
              link: '/numeric-title/11-file'
            },
            {
              text: '2 File',
              link: '/numeric-title/2-file'
            },
            {
              text: '3 Afile',
              link: '/numeric-title/3-afile'
            },
            {
              text: '3 Bfile',
              link: '/numeric-title/3-bfile'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: sortMenusByFrontmatterDate', (done) => {
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

  it('Multiple Sidebars (A)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: TEST_DIR_BASE,
          resolvePath: '/'
        },
        {
          documentRootPath: TEST_DIR_BASE,
          scanStartPath: 'recursive',
          resolvePath: '/recursive/'
        },
        {
          documentRootPath: TEST_DIR_BASE,
          scanStartPath: 'folder-with-index/2-a',
          resolvePath: '/folder-with-index/2-a'
        }
      ]),
      {
        '/': {
          base: '/',
          items: [
            {
              text: 'folder-with-index',
              items: [
                {
                  text: '1-a',
                  items: []
                },
                {
                  text: '10-a',
                  items: []
                },
                {
                  text: '2-a',
                  items: []
                }
              ]
            },
            {
              text: 'folder-with-same-name-file',
              items: [
                {
                  text: 'folder-with-same-name-file',
                  link: 'folder-with-same-name-file/folder-with-same-name-file'
                }
              ]
            },
            {
              text: 'folder-with-special-char-file',
              items: [
                {
                  text: 'hypen-doc',
                  link: 'folder-with-special-char-file/hypen-doc'
                },
                {
                  text: 'special@#$characters',
                  link: 'folder-with-special-char-file/special@#$characters'
                },
                {
                  text: 'underscore_doc',
                  link: 'folder-with-special-char-file/underscore_doc'
                }
              ]
            },
            {
              text: 'frontmatter-basic',
              items: [
                {
                  text: 'a',
                  link: 'frontmatter-basic/a'
                },
                {
                  text: 'b',
                  link: 'frontmatter-basic/b'
                },
                {
                  text: 'c',
                  link: 'frontmatter-basic/c'
                },
                {
                  text: 'd',
                  link: 'frontmatter-basic/d'
                }
              ]
            },
            {
              text: 'numeric-prefix',
              items: [
                {
                  text: '1-1-1-one-file',
                  link: 'numeric-prefix/1-1-1-one-file'
                },
                {
                  text: '1-folder',
                  items: [
                    {
                      text: '11-file',
                      link: 'numeric-prefix/1-folder/11-file'
                    }
                  ]
                },
                {
                  text: '1-one-file',
                  link: 'numeric-prefix/1-one-file'
                },
                {
                  text: '1-three-file',
                  link: 'numeric-prefix/1-three-file'
                },
                {
                  text: '1.1.1-four-file',
                  link: 'numeric-prefix/1.1.1-four-file'
                },
                {
                  text: '2-two-file',
                  link: 'numeric-prefix/2-two-file'
                }
              ]
            },
            {
              text: 'numeric-title',
              items: [
                {
                  text: '0-file',
                  link: 'numeric-title/0-file'
                },
                {
                  text: '1-file',
                  link: 'numeric-title/1-file'
                },
                {
                  text: '10-file',
                  link: 'numeric-title/10-file'
                },
                {
                  text: '100-file',
                  link: 'numeric-title/100-file'
                },
                {
                  text: '11-file',
                  link: 'numeric-title/11-file'
                },
                {
                  text: '2-file',
                  link: 'numeric-title/2-file'
                },
                {
                  text: '3-afile',
                  link: 'numeric-title/3-afile'
                },
                {
                  text: '3-bfile',
                  link: 'numeric-title/3-bfile'
                }
              ]
            },
            {
              text: 'recursive',
              items: [
                {
                  text: 'folderA',
                  items: [
                    {
                      text: 'a',
                      link: 'recursive/folderA/a'
                    },
                    {
                      text: 'folderAA',
                      items: [
                        {
                          text: 'aa',
                          link: 'recursive/folderA/folderAA/aa'
                        },
                        {
                          text: 'folderAAA',
                          items: [
                            {
                              text: 'folderAAAA',
                              items: [
                                {
                                  text: 'folderAAAAA',
                                  items: [
                                    {
                                      text: 'aaaaa',
                                      link: 'recursive/folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: 'folderB',
                  items: [
                    {
                      text: 'folderBB',
                      items: [
                        {
                          text: 'folderBBB',
                          items: [
                            {
                              text: 'bbb',
                              link: 'recursive/folderB/folderBB/folderBBB/bbb'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        '/recursive/': {
          base: '/recursive/',
          items: [
            {
              text: 'folderA',
              items: [
                {
                  text: 'a',
                  link: 'folderA/a'
                },
                {
                  text: 'folderAA',
                  items: [
                    {
                      text: 'aa',
                      link: 'folderA/folderAA/aa'
                    },
                    {
                      text: 'folderAAA',
                      items: [
                        {
                          text: 'folderAAAA',
                          items: [
                            {
                              text: 'folderAAAAA',
                              items: [
                                {
                                  text: 'aaaaa',
                                  link: 'folderA/folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'folderB',
              items: [
                {
                  text: 'folderBB',
                  items: [
                    {
                      text: 'folderBBB',
                      items: [
                        {
                          text: 'bbb',
                          link: 'folderB/folderBB/folderBBB/bbb'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        '/folder-with-index/2-a': {
          base: '/folder-with-index/2-a',
          items: []
        }
      }
    );

    done();
  });

  it('Multiple Sidebars (B)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: TEST_DIR_BASE,
          scanStartPath: 'recursive/folderA',
          resolvePath: '/recursive/folderA'
        }
      ]),
      {
        '/recursive/folderA': {
          base: '/recursive/folderA',
          items: [
            {
              text: 'a',
              link: 'a'
            },
            {
              text: 'folderAA',
              items: [
                {
                  text: 'aa',
                  link: 'folderAA/aa'
                },
                {
                  text: 'folderAAA',
                  items: [
                    {
                      text: 'folderAAAA',
                      items: [
                        {
                          text: 'folderAAAAA',
                          items: [
                            {
                              text: 'aaaaa',
                              link: 'folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
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
          documentRootPath: '/',
          resolvePath: '/abc/',
          scanStartPath: `${TEST_DIR_BASE}/recursive/folderA`
        },
        {
          documentRootPath: TEST_DIR_BASE,
          resolvePath: '/test/',
          scanStartPath: 'recursive/folderB'
        }
      ]),
      {
        '/abc/': {
          base: '/abc/',
          items: [
            {
              text: 'a',
              link: 'a'
            },
            {
              text: 'folderAA',
              items: [
                {
                  text: 'aa',
                  link: 'folderAA/aa'
                },
                {
                  text: 'folderAAA',
                  items: [
                    {
                      text: 'folderAAAA',
                      items: [
                        {
                          text: 'folderAAAAA',
                          items: [
                            {
                              text: 'aaaaa',
                              link: 'folderAA/folderAAA/folderAAAA/folderAAAAA/aaaaa'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        '/test/': {
          base: '/test/',
          items: [
            {
              text: 'folderBB',
              items: [
                {
                  text: 'folderBBB',
                  items: [
                    {
                      text: 'bbb',
                      link: 'folderBB/folderBBB/bbb'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    );

    done();
  });
});
