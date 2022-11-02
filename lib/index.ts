import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

declare interface Options {
	root?: string;
	rootGroupText?: string;
	collapsible?: boolean;
	collapsed?: boolean;
	collapseDepth?: number;
	hyphenToSpace?: boolean;
	underscoreToSpace?: boolean;
	withIndex?: boolean;
	useTitleFromFileHeading?: boolean;
}

declare interface SidebarItem {
	[key: string]: any;
}

export default class VitePressSidebar {
	static generateSidebar(options: Options): object {
		options.root = options?.root ?? '/';
		if (!/^\//.test(options.root)) {
			options.root = `/${options.root}`;
		}

		if (options.collapsed || options.collapseDepth) {
			options.collapsible = true;
		}
		if (options.collapseDepth) {
			options.collapsed = true;
		}

		options.rootGroupText = options?.rootGroupText ?? 'Table of Contents';
		options.collapsible = options?.collapsible ?? true;
		options.hyphenToSpace = options?.hyphenToSpace ?? true;
		options.collapseDepth = options?.collapseDepth ?? 1;

		const sidebar: SidebarItem = VitePressSidebar.generateSidebarItem(
			1,
			join(process.cwd(), options.root),
			options.root,
			options
		);

		if (!sidebar.items) {
			return [
				{
					text: options.rootGroupText,
					items: sidebar,
					collapsible: options.collapsible,
					collapsed: (options.collapseDepth || 1) <= 1 && !!options.collapsed
				}
			];
		}

		return sidebar;
	}

	static generateSidebarItem(
		depth: number,
		currentDir: string,
		displayDir: string,
		options: Options
	): SidebarItem {
		const directoryFiles: string[] = readdirSync(currentDir);

		return directoryFiles
			.map((x: string) => {
				const childItemPath = resolve(currentDir, x);
				const childItemPathDisplay = `${displayDir}/${x}`
					.replace(options.root ?? '', '')
					.replace(/\/{2}/, '/')
					.replace(/\.md$/, '');

				if (/\.vitepress/.test(childItemPath)) {
					return null;
				}
				if (displayDir === options.root && x === 'index.md' && !options.withIndex) {
					return null;
				}

				if (statSync(childItemPath).isDirectory()) {
					return {
						text: VitePressSidebar.getTitleFromMd(x, childItemPath, options, true),
						items:
							VitePressSidebar.generateSidebarItem(
								depth + 1,
								childItemPath,
								childItemPathDisplay,
								options
							) || [],
						collapsible: options.collapsible,
						collapsed: depth >= (options.collapseDepth || 1) && !!options.collapsed
					};
				}
				if (childItemPath.endsWith('.md')) {
					return {
						text: VitePressSidebar.getTitleFromMd(x, childItemPath, options),
						link: childItemPathDisplay
					};
				}
				return null;
			})
			.filter((x) => x !== null);
	}

	static getTitleFromMd(
		fileName: string,
		filePath: string,
		options: Options,
		isDirectory = false
	): string {
		let result: string = fileName.charAt(0).toUpperCase() + fileName.slice(1);

		if (!isDirectory) {
			if (options.useTitleFromFileHeading) {
				// Use content 'h1' string instead of file name
				try {
					const data = readFileSync(filePath, 'utf-8');
					const lines = data.split('\n');
					for (let i = 0, len = lines.length; i < len; i += 1) {
						const str = lines[i].toString().replace('\r', '');
						if (str.indexOf('# ') !== -1) {
							return str.replace('# ', '');
						}
					}
				} catch {
					return 'Unknown';
				}
			} else {
				result = result.replace(/\.md$/, '');

				if (options.hyphenToSpace) {
					result = result.replace(/-/g, ' ');
				}

				if (options.underscoreToSpace) {
					result = result.replace(/_/g, ' ');
				}
			}
		}

		return result;
	}
}

export { VitePressSidebar };

export const { generateSidebar } = VitePressSidebar;
