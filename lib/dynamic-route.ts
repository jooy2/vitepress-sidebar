import { execFileSync } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { globIterateSync } from 'glob';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Matches a single parameter placeholder of a VitePress dynamic route, such as
 * the `[pkg]` of `packages/[pkg].md`.
 *
 * Kept identical to the expression VitePress itself uses, so a path is
 * recognized as dynamic here exactly when VitePress treats it as dynamic.
 */
const DYNAMIC_ROUTE_PARAM_REGEX = /\[(\w+?)]/;

// Directories that never hold documents, skipped while looking for templates.
const TEMPLATE_SCAN_IGNORE = ['**/node_modules/**', '**/dist/**', '**/.vitepress/**'];

/**
 * Resolves the dynamic routes of a document root and writes them to a file.
 *
 * Runs in a child process so that `generateSidebar` can stay synchronous:
 * `resolvePages` is asynchronous, and a `paths` loader is allowed to be
 * asynchronous as well, which cannot be awaited from a synchronous caller.
 *
 * `resolvePages` is used instead of reading the `.paths` files directly because
 * it is the same function VitePress runs to decide which pages exist. It loads
 * the file through Vite, so a TypeScript loader needs no extra dependency here,
 * and the resolved routes always match the pages VitePress generates.
 */
const ROUTE_LOADER_SCRIPT = `
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const [srcDir, outFile] = process.argv.slice(1);
const result = { routes: [] };

try {
  const { resolvePages } = await import('vitepress');
  const { createLogger } = await import('vite');
  const logger = createLogger('warn');

  // Resolved from the project rather than from this package, so the number read
  // here belongs to the VitePress that is about to be called. The file named
  // here is never opened; only the directory it sits in decides the resolution.
  const require = createRequire(join(process.cwd(), 'package.json'));
  const { version } = require('vitepress/package.json');

  let routes;

  if (Number.parseInt(version, 10) >= 2) {
    // VitePress 2 takes a site configuration and fills the resolved pages into
    // it, instead of taking the source directory and returning them.
    const siteConfig = { srcDir, userConfig: {}, logger };

    await resolvePages(siteConfig, true);

    routes = siteConfig.dynamicRoutes;
  } else {
    routes = (await resolvePages(srcDir, {}, logger)).dynamicRoutes.routes;
  }

  result.routes = routes.map((item) => ({
    path: item.path,
    route: item.route,
    params: item.params ?? {}
  }));
} catch (e) {
  result.error = e instanceof Error ? (e.stack ?? e.message) : String(e);
}

writeFileSync(outFile, JSON.stringify(result));
`;

/** How long the `paths` loaders of a project are given to resolve their routes. */
const ROUTE_LOADER_TIMEOUT_MS = 120000;

/** A single page generated from a dynamic route template. */
export interface DynamicRoute {
  /** Path with the parameters substituted, relative to the document root */
  path: string;
  /** Template path it was generated from, relative to the document root */
  route: string;
  /** Parameters the `paths` loader returned for this page */
  params: { [key: string]: string };
}

/**
 * One segment of the tree of pages that the dynamic routes describe.
 *
 * The tree is needed because a route is a whole path, while the sidebar is
 * built one directory at a time.
 */
export interface DynamicRouteNode {
  /** Segment as it appears in the generated path, such as `alpha.md` */
  name: string;
  /** Segment of the template it was generated from, such as `[pkg].md` */
  templateName: string;
  /** Template path from the document root down to this node */
  templatePath: string;
  children: Map<string, DynamicRouteNode>;
  /** Set when the node is a page instead of a directory */
  route?: DynamicRoute;
}

function printWarning(message: string): void {
  process.stderr.write(`[vitepress-sidebar] ${message}\n`);
}

/** Whether a single path segment holds a parameter placeholder. */
export function isDynamicRouteName(name: string): boolean {
  return DYNAMIC_ROUTE_PARAM_REGEX.test(name);
}

/** Whether any segment of a path holds a parameter placeholder. */
export function isDynamicRoutePath(path: string): boolean {
  return DYNAMIC_ROUTE_PARAM_REGEX.test(path);
}

/**
 * Whether `srcDir` holds any dynamic route template.
 *
 * Resolving the routes starts a child process and evaluates project code, so it
 * is only worth doing for a project that actually uses dynamic routes. This
 * check keeps the cost at zero for every other project.
 */
export function hasDynamicRouteTemplate(srcDir: string): boolean {
  if (!existsSync(srcDir)) {
    return false;
  }

  // Iterated rather than collected, so a project that has a template stops at
  // the first one instead of listing every Markdown file it holds.
  for (const filePath of globIterateSync('**/*.md', {
    cwd: srcDir,
    ignore: TEMPLATE_SCAN_IGNORE,
    dot: false,
    follow: false
  })) {
    if (isDynamicRoutePath(filePath)) {
      return true;
    }
  }

  return false;
}

/**
 * Resolves every dynamic route below `srcDir`.
 *
 * Returns an empty list when the routes cannot be resolved, so that a broken
 * `paths` loader degrades to a sidebar without the dynamic pages instead of
 * failing the whole build.
 */
export function resolveDynamicRoutes(srcDir: string): DynamicRoute[] {
  const tempDir = mkdtempSync(join(tmpdir(), 'vitepress-sidebar-'));
  const outFilePath = join(tempDir, 'dynamic-routes.json');

  try {
    execFileSync(
      process.execPath,
      ['--input-type=module', '-e', ROUTE_LOADER_SCRIPT, srcDir, outFilePath],
      {
        // Resolved from the project so that the `vitepress` the project uses is
        // the one that decides what its routes are.
        cwd: process.cwd(),
        // The result is passed through a file, which leaves both streams free
        // for whatever the `paths` loader prints.
        stdio: ['ignore', 'inherit', 'inherit'],
        // A `paths` loader is project code, and one that never returns would
        // otherwise hold the build open with nothing to show for it. The
        // sidebar is then built without the generated pages, as it is for any
        // other loader that does not produce them.
        timeout: ROUTE_LOADER_TIMEOUT_MS
      }
    );

    const result = JSON.parse(readFileSync(outFilePath, 'utf-8')) as {
      routes: DynamicRoute[];
      error?: string;
    };

    if (result.error) {
      printWarning(`Failed to resolve dynamic routes, so they were skipped:\n${result.error}`);

      return [];
    }

    return result.routes;
  } catch (e) {
    printWarning(`Failed to resolve dynamic routes, so they were skipped: ${(e as Error).message}`);

    return [];
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function createDynamicRouteNode(
  name: string,
  templateName: string,
  templatePath: string
): DynamicRouteNode {
  return { name, templateName, templatePath, children: new Map() };
}

/**
 * Turns a flat list of routes into the tree of pages they describe.
 *
 * A node keeps both names because the generated path decides how the item
 * appears in the sidebar, while the template path decides which file on disk
 * the title, the frontmatter and the folder configuration are read from.
 */
export function buildDynamicRouteTree(routes: DynamicRoute[]): DynamicRouteNode {
  const root = createDynamicRouteNode('', '', '');

  routes.forEach((route) => {
    const names = route.path.split('/').filter((segment) => segment.length > 0);
    const templateNames = route.route.split('/').filter((segment) => segment.length > 0);

    // A parameter value holding a slash would produce more segments than the
    // template has, which no longer describes a file the template stands for.
    if (names.length !== templateNames.length) {
      return;
    }

    let currentNode = root;

    for (let i = 0, len = names.length; i < len; i += 1) {
      let childNode = currentNode.children.get(names[i]);

      if (!childNode) {
        childNode = createDynamicRouteNode(
          names[i],
          templateNames[i],
          templateNames.slice(0, i + 1).join('/')
        );

        currentNode.children.set(names[i], childNode);
      }

      currentNode = childNode;
    }

    currentNode.route = route;
  });

  return root;
}

/**
 * Walks `relativePath` down the tree, so that a scan starting below the
 * document root sees the routes of the directory it starts from.
 *
 * Returns `null` when no route lies below that path.
 */
export function getDynamicRouteNode(
  rootNode: DynamicRouteNode,
  relativePath: string
): DynamicRouteNode | null {
  const segments = relativePath.split(/[\\/]/).filter((x) => x.length > 0 && x !== '.');
  let currentNode: DynamicRouteNode | undefined = rootNode;

  for (let i = 0, len = segments.length; i < len; i += 1) {
    currentNode = currentNode?.children.get(segments[i]);

    if (!currentNode) {
      return null;
    }
  }

  return currentNode ?? null;
}
