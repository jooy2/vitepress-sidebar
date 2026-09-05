import assert from 'assert';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { globSync } from 'glob';

const DIST_DIR = 'dist';

// The published package holds `dist` and nothing else, so anything the build
// leaves behind that points outside of it is broken for everyone installing it.
describe('Test: published package', () => {
  it('No declaration file imports a `.ts` file', () => {
    const declarationFiles = globSync('**/*.d.ts', { cwd: DIST_DIR });

    assert.ok(declarationFiles.length > 0, 'expected the build to produce declaration files');

    const offenders = declarationFiles.filter((fileName) =>
      /from\s+'\.[^']*\.ts'/.test(readFileSync(join(DIST_DIR, fileName), 'utf-8'))
    );

    assert.deepStrictEqual(
      offenders,
      [],
      // `lib` is not published, so a `./types.ts` written in a source file
      // survives into the declaration file and names something that is not there.
      `these declaration files import a '.ts' file, which the package does not ship: ${offenders.join(', ')}`
    );
  });

  it('Every entry point named by `package.json` exists', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8')) as {
      main: string;
      types: string;
      exports: { [key: string]: { [condition: string]: string } };
    };
    const entryPoints = new Set([packageJson.main, packageJson.types]);

    Object.values(packageJson.exports).forEach((conditions) => {
      Object.values(conditions).forEach((target) => entryPoints.add(target));
    });

    assert.ok(entryPoints.size > 0, 'expected package.json to name an entry point');

    entryPoints.forEach((entryPoint) => {
      assert.doesNotThrow(
        () => readFileSync(join(...entryPoint.replace(/^\.\//, '').split('/')), 'utf-8'),
        `'${entryPoint}' is named by package.json but was not built`
      );
    });
  });
});
