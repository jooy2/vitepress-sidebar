import assert from 'assert';
import { generateSidebar } from '../dist';

describe('VitePress Sidebar Test', () => {
  it('Basic configurations', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example'
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        collapsed: false,
        hyphenToSpace: true,
        underscoreToSpace: true,
        includeRootIndexFile: true,
        useTitleFromFrontmatter: true,
        excludeFiles: ['b-css.md', 'c-css.md'],
        excludeFolders: ['functions']
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a css',
              link: '/css/a-css'
            }
          ],
          collapsed: false
        },
        {
          text: 'index',
          link: '/index'
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ],
              collapsed: false
            },
            {
              text: 'getting started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress how to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What is Frontmatter?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        includeEmptyFolder: true,
        includeDotFiles: true,
        excludeFiles: ['c-file-name.md', 'sub-file.md'],
        excludeFolders: ['empty', 'folder-index', '.special-cases'],
        hyphenToSpace: true,
        underscoreToSpace: true,
        capitalizeFirst: true,
        useTitleFromFrontmatter: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: '.secret',
          items: [
            {
              text: 'Document',
              link: '/.secret/document'
            }
          ]
        },
        {
          text: 'Css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'Html',
          items: []
        },
        {
          text: 'Javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'Examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'Functions',
              items: [
                {
                  text: 'Prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'Package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'Vitepress how to',
              items: [
                {
                  text: 'Secret Document',
                  link: '/javascript/vitepress-how-to/.secret-document'
                },
                {
                  text: 'Frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What is Frontmatter?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Markdown',
          items: [
            {
              text: 'What is Markdown language? How to use it?',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Examples of Bad Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Properties of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Example of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'Frontmatter? What is?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'What is Markdown language? How to use it?',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What is Frontmatter?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'What is Markdown language? How to use it?',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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

  it('Option: convertSameNameSubFileToGroupIndexPage (B)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What is Frontmatter?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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
        documentRootPath: 'example',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        convertSameNameSubFileToGroupIndexPage: true,
        folderLinkNotIncludesFileName: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What is Frontmatter?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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

  it('Option: useFolderTitleFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        useFolderTitleFromIndexFile: true,
        useTitleFromFileHeading: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'A',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'JavaScript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'JavaScript Functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Examples of Bad Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Properties of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Example of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'Frontmatter? What is?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Markdown Index',
          items: [
            {
              text: 'What is Markdown language? How to use it?',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: useFolderLinkFromIndexFile', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        useFolderLinkFromIndexFile: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          link: '/javascript/index.md',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              link: '/javascript/functions/index.md',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          link: '/markdown/index.md',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        collapsed: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ],
          collapsed: true
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ],
              collapsed: true
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
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
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        collapseDepth: 2
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ],
          collapsed: false
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ],
              collapsed: true
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
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
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ],
                  collapsed: true
                }
              ],
              collapsed: true
            }
          ],
          collapsed: false
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        manualSortFileNameByPriority: [
          'getting_started.md',
          'es-module.md',
          'functions',
          'examples'
        ]
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: capitalizeFirst', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        capitalizeFirst: true
      }),
      [
        {
          text: 'Css',
          items: [
            {
              text: 'A-css',
              link: '/css/a-css'
            },
            {
              text: 'B-css',
              link: '/css/b-css'
            },
            {
              text: 'C-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'Javascript',
          items: [
            {
              text: 'Es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'Examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'Functions',
              items: [
                {
                  text: 'Prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'Package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'Vitepress-how-to',
              items: [
                {
                  text: 'Frontmatter.example',
                  items: [
                    {
                      text: 'Bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Markdown',
          items: [
            {
              text: 'Markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        includeEmptyFolder: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'html',
          items: []
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        excludeFiles: [
          'bad-frontmatter-example.md',
          'es-module.md',
          'helpful-links.md',
          'b-css.md',
          'c-css.md',
          'frontmatter-properties.md'
        ]
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: excludeFilesByFrontmatter', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example/.special-cases/exclude-files-by-frontmatter',
        excludeFilesByFrontmatter: true
      }),
      [
        {
          text: 'included',
          link: '/included'
        }
      ]
    );

    done();
  });

  it('Option: excludeFolders', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        excludeFolders: ['examples', 'vitepress-how-to', 'css']
      }),
      [
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        includeDotFiles: true,
        excludeFolders: ['.special-cases']
      }),
      [
        {
          text: '.secret',
          items: [
            {
              text: 'document',
              link: '/.secret/document'
            }
          ]
        },
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: '.secret-document',
                  link: '/javascript/vitepress-how-to/.secret-document'
                },
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        includeFolderIndexFile: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'index',
                  link: '/javascript/functions/index'
                },
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'index',
              link: '/javascript/index'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'index',
              link: '/markdown/index'
            },
            {
              text: 'markdown',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: sortMenusByName', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        sortMenusByName: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
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
        documentRootPath: 'example',
        sortMenusByFrontmatterOrder: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: 'a-css',
              link: '/css/a-css'
            },
            {
              text: 'b-css',
              link: '/css/b-css'
            },
            {
              text: 'c-css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'es-module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'helpful-links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'what-is-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    },
                    {
                      text: 'use-frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'bad-frontmatter-example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'markdown',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: rootGroup related configurations (A)', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example',
        rootGroupText: 'Hello',
        rootGroupLink: 'https://github.com/jooy2/vitepress-sidebar',
        rootGroupCollapsed: true,
        excludeFolders: ['javascript', 'markdown']
      }),
      [
        {
          text: 'Hello',
          link: 'https://github.com/jooy2/vitepress-sidebar',
          items: [
            {
              text: 'css',
              items: [
                {
                  text: 'a-css',
                  link: '/css/a-css'
                },
                {
                  text: 'b-css',
                  link: '/css/b-css'
                },
                {
                  text: 'c-css',
                  link: '/css/c-css'
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
        documentRootPath: 'example',
        rootGroupText: '',
        rootGroupCollapsed: false,
        excludeFolders: ['javascript', 'markdown']
      }),
      [
        {
          text: '',
          items: [
            {
              text: 'css',
              items: [
                {
                  text: 'a-css',
                  link: '/css/a-css'
                },
                {
                  text: 'b-css',
                  link: '/css/b-css'
                },
                {
                  text: 'c-css',
                  link: '/css/c-css'
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
        documentRootPath: 'example',
        useTitleFromFileHeading: true,
        keepMarkdownSyntaxFromTitle: true
      }),
      [
        {
          text: 'css',
          items: [
            {
              text: '**A**',
              link: '/css/a-css'
            },
            {
              text: 'B',
              link: '/css/b-css'
            },
            {
              text: 'C',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'javascript',
          items: [
            {
              text: 'ES Module',
              link: '/javascript/es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting Started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: '`package.json`',
              link: '/javascript/package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'Examples of Bad Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Properties of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Example of Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'Frontmatter? What is?',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'markdown',
          items: [
            {
              text: 'What ~~is~~ `Markdown` **language**? How ~~to~~ **use** it?',
              link: '/markdown/markdown'
            }
          ]
        }
      ]
    );

    done();
  });

  it('Option: sortMenusOrderNumericallyFromTitle', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example/.special-cases/numeric-title',
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
        documentRootPath: 'example/.special-cases/folder-title-from-index',
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
        documentRootPath: 'example',
        excludeFolders: ['html', 'markdown'],
        capitalizeEachWords: true
      }),
      [
        {
          text: 'Css',
          items: [
            {
              text: 'A Css',
              link: '/css/a-css'
            },
            {
              text: 'B Css',
              link: '/css/b-css'
            },
            {
              text: 'C Css',
              link: '/css/c-css'
            }
          ]
        },
        {
          text: 'Javascript',
          items: [
            {
              text: 'Es Module',
              link: '/javascript/es-module'
            },
            {
              text: 'Examples',
              items: [
                {
                  text: 'Examples',
                  link: '/javascript/examples/examples'
                }
              ]
            },
            {
              text: 'Functions',
              items: [
                {
                  text: 'Prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexof',
                          link: '/javascript/functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Getting_started',
              link: '/javascript/getting_started'
            },
            {
              text: 'Helpful Links',
              link: '/javascript/helpful-links'
            },
            {
              text: 'Package.json',
              link: '/javascript/package.json'
            },
            {
              text: 'Vitepress How To',
              items: [
                {
                  text: 'Frontmatter.example',
                  items: [
                    {
                      text: 'Bad Frontmatter Example',
                      link: '/javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'Frontmatter Properties',
                      link: '/javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'Use Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'What Is Frontmatter',
                      link: '/javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
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

  it('Option: sortMenusByFrontmatterDate', (done) => {
    assert.deepEqual(
      generateSidebar({
        documentRootPath: 'example/.special-cases/date-sort',
        sortMenusByFrontmatterDate: true
      }),
      [
        {
          text: '1',
          link: '/1'
        },
        {
          text: '3',
          link: '/3'
        },
        {
          text: '4',
          link: '/4'
        },
        {
          text: '2',
          link: '/2'
        }
      ]
    );

    done();
  });

  it('Multiple Sidebars (A)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: 'example',
          resolvePath: '/'
        },
        {
          documentRootPath: 'example',
          scanStartPath: 'javascript',
          resolvePath: '/javascript/'
        },
        {
          documentRootPath: 'example',
          scanStartPath: 'javascript/functions',
          resolvePath: '/javascript/functions'
        }
      ]),
      {
        '/': {
          base: '/',
          items: [
            {
              text: 'css',
              items: [
                {
                  text: 'a-css',
                  link: 'css/a-css'
                },
                {
                  text: 'b-css',
                  link: 'css/b-css'
                },
                {
                  text: 'c-css',
                  link: 'css/c-css'
                }
              ]
            },
            {
              text: 'javascript',
              items: [
                {
                  text: 'es-module',
                  link: 'javascript/es-module'
                },
                {
                  text: 'examples',
                  items: [
                    {
                      text: 'examples',
                      link: 'javascript/examples/examples'
                    }
                  ]
                },
                {
                  text: 'functions',
                  items: [
                    {
                      text: 'prototypes',
                      items: [
                        {
                          text: 'Array',
                          items: [
                            {
                              text: 'Array.indexOf',
                              link: 'javascript/functions/prototypes/Array/Array.indexOf'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: 'getting_started',
                  link: 'javascript/getting_started'
                },
                {
                  text: 'helpful-links',
                  link: 'javascript/helpful-links'
                },
                {
                  text: 'package.json',
                  link: 'javascript/package.json'
                },
                {
                  text: 'vitepress-how-to',
                  items: [
                    {
                      text: 'frontmatter.example',
                      items: [
                        {
                          text: 'bad-frontmatter-example',
                          link: 'javascript/vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                        },
                        {
                          text: 'frontmatter-properties',
                          link: 'javascript/vitepress-how-to/frontmatter.example/frontmatter-properties'
                        },
                        {
                          text: 'use-frontmatter',
                          link: 'javascript/vitepress-how-to/frontmatter.example/use-frontmatter'
                        },
                        {
                          text: 'what-is-frontmatter',
                          link: 'javascript/vitepress-how-to/frontmatter.example/what-is-frontmatter'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'markdown',
              items: [
                {
                  text: 'markdown',
                  link: 'markdown/markdown'
                }
              ]
            }
          ]
        },
        '/javascript/': {
          base: '/javascript/',
          items: [
            {
              text: 'es-module',
              link: 'es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: 'examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: 'functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: 'getting_started'
            },
            {
              text: 'helpful-links',
              link: 'helpful-links'
            },
            {
              text: 'package.json',
              link: 'package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: 'vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: 'vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: 'vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: 'vitepress-how-to/frontmatter.example/what-is-frontmatter'
                    }
                  ]
                }
              ]
            }
          ]
        },
        '/javascript/functions': {
          base: '/javascript/functions',
          items: [
            {
              text: 'prototypes',
              items: [
                {
                  text: 'Array',
                  items: [
                    {
                      text: 'Array.indexOf',
                      link: 'prototypes/Array/Array.indexOf'
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

  it('Multiple Sidebars (B)', (done) => {
    assert.deepEqual(
      generateSidebar([
        {
          documentRootPath: 'example',
          scanStartPath: 'javascript/functions',
          resolvePath: '/javascript/functions'
        }
      ]),
      {
        '/javascript/functions': {
          base: '/javascript/functions',
          items: [
            {
              text: 'prototypes',
              items: [
                {
                  text: 'Array',
                  items: [
                    {
                      text: 'Array.indexOf',
                      link: 'prototypes/Array/Array.indexOf'
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
          resolvePath: '/javascript/',
          scanStartPath: 'example/javascript'
        },
        {
          documentRootPath: 'example',
          resolvePath: '/test/',
          scanStartPath: 'javascript/vitepress-how-to'
        }
      ]),
      {
        '/javascript/': {
          base: '/javascript/',
          items: [
            {
              text: 'es-module',
              link: 'es-module'
            },
            {
              text: 'examples',
              items: [
                {
                  text: 'examples',
                  link: 'examples/examples'
                }
              ]
            },
            {
              text: 'functions',
              items: [
                {
                  text: 'prototypes',
                  items: [
                    {
                      text: 'Array',
                      items: [
                        {
                          text: 'Array.indexOf',
                          link: 'functions/prototypes/Array/Array.indexOf'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'getting_started',
              link: 'getting_started'
            },
            {
              text: 'helpful-links',
              link: 'helpful-links'
            },
            {
              text: 'package.json',
              link: 'package.json'
            },
            {
              text: 'vitepress-how-to',
              items: [
                {
                  text: 'frontmatter.example',
                  items: [
                    {
                      text: 'bad-frontmatter-example',
                      link: 'vitepress-how-to/frontmatter.example/bad-frontmatter-example'
                    },
                    {
                      text: 'frontmatter-properties',
                      link: 'vitepress-how-to/frontmatter.example/frontmatter-properties'
                    },
                    {
                      text: 'use-frontmatter',
                      link: 'vitepress-how-to/frontmatter.example/use-frontmatter'
                    },
                    {
                      text: 'what-is-frontmatter',
                      link: 'vitepress-how-to/frontmatter.example/what-is-frontmatter'
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
              text: 'frontmatter.example',
              items: [
                {
                  text: 'bad-frontmatter-example',
                  link: 'frontmatter.example/bad-frontmatter-example'
                },
                {
                  text: 'frontmatter-properties',
                  link: 'frontmatter.example/frontmatter-properties'
                },
                {
                  text: 'use-frontmatter',
                  link: 'frontmatter.example/use-frontmatter'
                },
                {
                  text: 'what-is-frontmatter',
                  link: 'frontmatter.example/what-is-frontmatter'
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
