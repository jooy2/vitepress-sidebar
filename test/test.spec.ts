import assert from 'assert';
import { generateSidebar } from '../dist/index.js';

describe('Vitepress Sidebar Test Case', () => {
  it('Basic configurations', (done) => {
    assert.deepStrictEqual(
      generateSidebar({
        root: 'test/docs'
      }),
      [
        {
          text: 'Table of Contents',
          items: [
            { text: 'A', link: '/a' },
            { text: 'B_file_name', link: '/b_file_name' },
            { text: 'C file name', link: '/c-file-name' },
            { text: 'Empty', items: [], collapsible: true, collapsed: false },
            {
              text: 'Folder',
              items: [
                {
                  text: 'Empty',
                  items: [],
                  collapsible: true,
                  collapsed: false
                },
                { text: 'Folder file', link: '/folder/folder-file' },
                {
                  text: 'Subfolder',
                  items: [{ text: 'Sub file', link: '/folder/subfolder/sub-file' }],
                  collapsible: true,
                  collapsed: false
                }
              ],
              collapsible: true,
              collapsed: false
            }
          ],
          collapsible: true,
          collapsed: false
        }
      ]
    );
    done();
  });

  it('With advanced configurations', (done) => {
    assert.deepStrictEqual(
      generateSidebar({
        root: 'test/docs',
        rootGroupText: 'RootGroup',
        collapsed: false,
        collapsible: false,
        withIndex: true
      }),
      [
        {
          text: 'RootGroup',
          items: [
            { text: 'A', link: '/a' },
            { text: 'B_file_name', link: '/b_file_name' },
            { text: 'C file name', link: '/c-file-name' },
            {
              text: 'Empty',
              items: [],
              collapsible: false,
              collapsed: false
            },
            {
              text: 'Folder',
              items: [
                {
                  text: 'Empty',
                  items: [],
                  collapsible: false,
                  collapsed: false
                },
                { text: 'Folder file', link: '/folder/folder-file' },
                {
                  text: 'Subfolder',
                  items: [{ text: 'Sub file', link: '/folder/subfolder/sub-file' }],
                  collapsible: false,
                  collapsed: false
                }
              ],
              collapsible: false,
              collapsed: false
            },
            {
              link: '/index',
              text: 'Index'
            }
          ],
          collapsible: false,
          collapsed: false
        }
      ]
    );
    done();
  });
});
