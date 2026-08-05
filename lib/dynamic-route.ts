import { execFileSync } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { globSync } from 'glob';
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

const [srcDir, outFile] = process.argv.slice(1);
const result = { routes: [] };

try {
  const { resolvePages } = await import('vitepress');
  const { createLogger } = await import('vite');
  const { dynamicRoutes } = await resolvePages(srcDir, {}, createLogger('warn'));

  result.routes = dynamicRoutes.routes.map((item) => ({
    path: item.path,
    route: item.route,
    params: item.params ?? {}
  }));
} catch (e) {
  result.error = e instanceof Error ? (e.stack ?? e.message) : String(e);
}

writeFileSync(outFile, JSON.stringify(result));
`;

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

  return globSync('**/*.md', {
    cwd: srcDir,
    ignore: TEMPLATE_SCAN_IGNORE,
    dot: false,
    follow: false
  }).some((filePath) => isDynamicRoutePath(filePath));
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
        stdio: ['ignore', 'inherit', 'inherit']
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
