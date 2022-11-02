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
						{ text: 'c file name', link: '/c-file-name' },
						{ text: 'empty', items: [], collapsible: true, collapsed: false },
						{
							text: 'folder',
							items: [
								{
									text: 'empty',
									items: [],
									collapsible: true,
									collapsed: false
								},
								{ text: 'folder file', link: '/folder/folder-file' },
								{
									text: 'subfolder',
									items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
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

	it('With complex configurations', (done) => {
		assert.deepEqual(
			generateSidebar({
				root: 'test/docs',
				rootGroupText: 'RootGroup',
				collapsed: false,
				collapsible: false,
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
							text: 'empty',
							items: [],
							collapsible: false,
							collapsed: false
						},
						{
							text: 'folder',
							items: [
								{
									text: 'empty',
									items: [],
									collapsible: false,
									collapsed: false
								},
								{ text: 'folder file', link: '/folder/folder-file' },
								{
									text: 'subfolder',
									items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
									collapsible: false,
									collapsed: false
								}
							],
							collapsible: false,
							collapsed: false
						},
						{ text: 'index', link: '/index' }
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
						{ text: 'empty', items: [], collapsible: true, collapsed: false },
						{
							text: 'folder',
							items: [
								{
									text: 'empty',
									items: [],
									collapsible: true,
									collapsed: false
								},
								{ text: 'Folder File', link: '/folder/folder-file' },
								{
									text: 'subfolder',
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
						{ text: 'a', link: '/a' },
						{ text: 'b_file_name', link: '/b_file_name' },
						{ text: 'c file name', link: '/c-file-name' },
						{ text: 'empty', items: [], collapsible: true, collapsed: false },
						{
							text: 'folder',
							items: [
								{
									text: 'empty',
									items: [],
									collapsible: true,
									collapsed: true
								},
								{ text: 'folder file', link: '/folder/folder-file' },
								{
									text: 'subfolder',
									items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
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
						{ text: 'c file name', link: '/c-file-name' },
						{ text: 'empty', items: [], collapsible: true, collapsed: false },
						{ text: 'a', link: '/a' },
						{
							text: 'folder',
							items: [
								{
									text: 'empty',
									items: [],
									collapsible: true,
									collapsed: false
								},
								{ text: 'folder file', link: '/folder/folder-file' },
								{
									text: 'subfolder',
									items: [{ text: 'sub file', link: '/folder/subfolder/sub-file' }],
									collapsible: true,
									collapsed: false
								}
							],
							collapsible: true,
							collapsed: false
						},
						{ text: 'b_file_name', link: '/b_file_name' }
					],
					collapsible: true,
					collapsed: false
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
						{ text: 'A.MD', link: '/a' },
						{ text: 'B_FILE_NAME.MD', link: '/b_file_name' },
						{ text: 'C FILE NAME.MD', link: '/c-file-name' },
						{ text: 'EMPTY', items: [], collapsible: true, collapsed: false },
						{
							text: 'FOLDER',
							items: [
								{
									text: 'EMPTY',
									items: [],
									collapsible: true,
									collapsed: false
								},
								{ text: 'FOLDER FILE.MD', link: '/folder/folder-file' },
								{
									text: 'SUBFOLDER',
									items: [
										{
											text: 'SUB FILE.MD',
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
});
