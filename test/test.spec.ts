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
		assert.deepEqual(
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
								{ text: 'Folder File', link: '/folder/folder-file' },
								{
									text: 'Subfolder',
									items: [
										{
											text: 'Sub Folder - Sub File',
											link: '/folder/subfolder/sub-file'
										}
									],
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
									collapsed: true
								},
								{ text: 'Folder file', link: '/folder/folder-file' },
								{
									text: 'Subfolder',
									items: [{ text: 'Sub file', link: '/folder/subfolder/sub-file' }],
									collapsible: true,
									collapsed: true
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
});
