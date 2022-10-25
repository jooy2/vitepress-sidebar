import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

declare interface Options {
  root?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  hyphenToSpace?: boolean;
  underscoreToSpace?: boolean;
}

export default class VitePressSidebar {
  static autoGenerate(options: Options): object {
    options.root = options?.root ?? '/';
    options.collapsible = options?.collapsible ?? true;
    options.hyphenToSpace = options?.hyphenToSpace ?? true;

    return VitePressSidebar.generateSidebarItem(join(process.cwd(), options.root), options);
  }

  static generateSidebarItem(currentDir: string, options: Options): object {
    const directoryFiles: string[] = readdirSync(currentDir);

    return directoryFiles
      .map((x: string) => {
        const childItemPath = resolve(currentDir, x);

        if (/\.vitepress/.test(childItemPath)) {
          return null;
        }

        if (statSync(childItemPath).isDirectory()) {
          return {
            text: VitePressSidebar.getTitleFromMd(x, options, true),
            items: VitePressSidebar.generateSidebarItem(childItemPath, options),
            collapsible: !!options.collapsible,
            collapsed: !!options.collapsed
          };
        }
        if (childItemPath.endsWith('.md')) {
          return {
            text: VitePressSidebar.getTitleFromMd(x, options),
            link: `/${childItemPath.replace(currentDir ?? '', '')}`
          };
        }
        return null;
      })
      .filter((x) => x !== null);
  }

  static getTitleFromMd(fileName: string, options: Options, isDirectory = false): string {
    let result: string = fileName.charAt(0).toUpperCase() + fileName.slice(1);

    if (!isDirectory) {
      result = result.replace(/\.md$/, '');
    }

    if (options.hyphenToSpace) {
      result = result.replace(/-/g, ' ');
    }

    if (options.underscoreToSpace) {
      result = result.replace(/_/g, ' ');
    }

    return result;
  }
}

export { VitePressSidebar };

export const { autoGenerate } = VitePressSidebar;
