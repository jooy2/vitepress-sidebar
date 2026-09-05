import assert from 'assert';
import { describe, it, beforeEach, afterEach } from 'node:test';
import { mkdirSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { createSidebarHmrPlugin } from '../../dist/external.js';

const TEST_DIR_BASE = 'test/resources';
const TEMP_DIR = `${TEST_DIR_BASE}/hmr`;
const CONFIG_PATH = join(process.cwd(), TEMP_DIR, 'config.ts');

type WatchEvent = 'add' | 'unlink' | 'change';
type WatchHandler = (path: string) => void;

/** A stand-in for the watcher of the Vite dev server, which only records. */
function createServer(): {
  server: { watcher: { on(event: WatchEvent, cb: WatchHandler): void } };
  emit: (event: WatchEvent, path: string) => void;
} {
  const handlers: { [key in WatchEvent]: WatchHandler[] } = {
    add: [],
    unlink: [],
    change: []
  };

  return {
    server: {
      watcher: {
        on(event: WatchEvent, cb: WatchHandler): void {
          handlers[event].push(cb);
        }
      }
    },
    emit: (event: WatchEvent, path: string): void => {
      handlers[event].forEach((handler) => handler(path));
    }
  };
}

/**
 * Moves the modification time of the configuration file into the past, so that
 * a touch is visible whatever the resolution of the file system is, and however
 * many events came before.
 */
function resetConfigTime(): number {
  const past = new Date(Date.now() - 60000);

  utimesSync(CONFIG_PATH, past, past);

  return statSync(CONFIG_PATH).mtimeMs;
}

/**
 * Whether one watch event refreshed the sidebar.
 *
 * The plugin does that by touching the VitePress configuration file, which is
 * the only thing it does and therefore the only thing to watch.
 */
function refreshesOn(
  emit: (event: WatchEvent, path: string) => void,
  event: WatchEvent,
  path: string
): boolean {
  const before = resetConfigTime();

  emit(event, path);

  return statSync(CONFIG_PATH).mtimeMs > before;
}

const globalWithConfig = globalThis as { VITEPRESS_CONFIG?: { configPath?: string } };

describe('Test: dev server refresh', () => {
  beforeEach(() => {
    mkdirSync(`${TEMP_DIR}/docs/guide`, { recursive: true });
    mkdirSync(`${TEMP_DIR}/outside`, { recursive: true });
    writeFileSync(CONFIG_PATH, 'export default {};\n');
    resetConfigTime();

    globalWithConfig.VITEPRESS_CONFIG = { configPath: CONFIG_PATH };
  });

  afterEach(() => {
    delete globalWithConfig.VITEPRESS_CONFIG;
    rmSync(TEMP_DIR, { recursive: true, force: true });
  });

  it('Is a plugin that only runs while the dev server is serving', () => {
    const plugin = createSidebarHmrPlugin({ documentRootPath: `${TEMP_DIR}/docs` });

    assert.strictEqual(plugin.name, 'vitepress-sidebar:hmr');
    assert.strictEqual(plugin.apply, 'serve');
    assert.strictEqual(typeof plugin.configureServer, 'function');
  });

  it('Refreshes when a Markdown file is added or removed inside the document root', () => {
    const { server, emit } = createServer();

    createSidebarHmrPlugin({ documentRootPath: `${TEMP_DIR}/docs` }).configureServer!(server);

    const insideDocs = join(process.cwd(), TEMP_DIR, 'docs', 'guide', 'new.md');

    for (const event of ['add', 'unlink'] as const) {
      assert.ok(
        refreshesOn(emit, event, insideDocs),
        `expected '${event}' of a Markdown file to refresh`
      );
    }
  });

  it('Ignores what cannot change the sidebar', () => {
    const { server, emit } = createServer();

    createSidebarHmrPlugin({ documentRootPath: `${TEMP_DIR}/docs` }).configureServer!(server);

    const cases: [WatchEvent, string][] = [
      // Outside the document root
      ['add', join(process.cwd(), TEMP_DIR, 'outside', 'new.md')],
      // Inside it, but not a page
      ['add', join(process.cwd(), TEMP_DIR, 'docs', 'image.png')],
      // A name that merely begins with the document root
      ['add', `${join(process.cwd(), TEMP_DIR, 'docs')}-elsewhere${sep}new.md`],
      // Editing a page is handled by VitePress itself
      ['change', join(process.cwd(), TEMP_DIR, 'docs', 'guide', 'one.md')]
    ];

    cases.forEach(([event, path]) => {
      assert.ok(!refreshesOn(emit, event, path), `expected '${event}' of '${path}' to be ignored`);
    });
  });

  it('Refreshes when a configuration file or a `paths` file changes', () => {
    const { server, emit } = createServer();

    createSidebarHmrPlugin({ documentRootPath: `${TEMP_DIR}/docs` }).configureServer!(server);

    const cases: [WatchEvent, string][] = [
      // A `sidebar.config.json` may live outside the document root
      ['change', join(process.cwd(), TEMP_DIR, 'outside', 'sidebar.config.json')],
      ['add', join(process.cwd(), TEMP_DIR, 'docs', 'sidebar.config.json')],
      ['unlink', join(process.cwd(), TEMP_DIR, 'docs', 'guide', 'sidebar.config.json')],
      // Both the content and the presence of a `paths` file decide which pages exist
      ['change', join(process.cwd(), TEMP_DIR, 'docs', 'guide', '[pkg].paths.ts')],
      ['add', join(process.cwd(), TEMP_DIR, 'docs', 'guide', '[pkg].paths.js')],
      ['change', join(process.cwd(), TEMP_DIR, 'docs', 'guide', '[pkg].paths.mts')]
    ];

    cases.forEach(([event, path]) => {
      assert.ok(refreshesOn(emit, event, path), `expected '${event}' of '${path}' to refresh`);
    });
  });

  it('Watches every document root of a multiple sidebar configuration', () => {
    const { server, emit } = createServer();

    createSidebarHmrPlugin([
      { documentRootPath: `${TEMP_DIR}/docs` },
      { documentRootPath: `${TEMP_DIR}/outside` }
    ]).configureServer!(server);

    for (const root of ['docs', 'outside']) {
      assert.ok(
        refreshesOn(emit, 'add', join(process.cwd(), TEMP_DIR, root, 'new.md')),
        `expected a page added under '${root}' to refresh`
      );
    }
  });

  it('Does nothing when there is no VitePress configuration to touch', () => {
    delete globalWithConfig.VITEPRESS_CONFIG;

    const { server, emit } = createServer();

    createSidebarHmrPlugin({ documentRootPath: `${TEMP_DIR}/docs` }).configureServer!(server);

    assert.doesNotThrow(() => emit('add', join(process.cwd(), TEMP_DIR, 'docs', 'new.md')));
  });
});
