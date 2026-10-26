// Prints the release notes of one version, taken from its section of
// `CHANGELOG.md`, for `gh release create --notes-file`.
//
// Usage: node .github/scripts/release-notes.mjs <version> [path to CHANGELOG.md]
import { readFileSync } from 'node:fs';

const PACKAGE_URL = 'https://www.npmjs.com/package/vitepress-sidebar/v';

const toVersionParts = (version) => version.split('.').map(Number);

const compareVersions = (a, b) => {
  const partsA = toVersionParts(a);
  const partsB = toVersionParts(b);

  for (let i = 0; i < 3; i += 1) {
    if (partsA[i] !== partsB[i]) {
      return partsA[i] - partsB[i];
    }
  }

  return 0;
};

// A section is headed `## 1.40.0 (2026-09-05)`, or covers a range of versions
// released together, as in `## 0.1.0 ~ 1.0.3 (2022-10-25 / Alpha)`.
const isVersionInHeading = (version, headingVersions) => {
  const [first, last = first] = headingVersions.split('~').map((part) => part.trim());

  return compareVersions(first, version) <= 0 && compareVersions(version, last) <= 0;
};

const findSection = (changelog, version) => {
  const lines = changelog.split('\n');
  const start = lines.findIndex((line) => {
    const heading = line.match(/^## (\d+\.\d+\.\d+(?: ~ \d+\.\d+\.\d+)?) \(/);

    return !!heading && isVersionInHeading(version, heading[1]);
  });

  if (start === -1) {
    return null;
  }

  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));

  return {
    heading: lines[start],
    body: lines
      .slice(start + 1, end === -1 ? undefined : end)
      .join('\n')
      .trim()
  };
};

const readReleaseNotes = (version, changelogPath) => {
  if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
    throw new Error(`Expected a version such as 1.41.0, but got '${version ?? ''}'.`);
  }

  const section = findSection(readFileSync(changelogPath, 'utf-8'), version);

  // A version is only released once its section is named and dated, which a
  // `vNext (2026--)` section is not yet.
  if (!section) {
    throw new Error(`'${changelogPath}' has no section for ${version}.`);
  }

  const releaseDate = section.heading.match(/\d{4}-\d{2}-\d{2}/)?.[0];

  if (!releaseDate) {
    throw new Error(`The section for ${version} has no release date: '${section.heading}'.`);
  }

  return `${section.body}\n\nReleased on ${releaseDate}. [View on npm](${PACKAGE_URL}/${version})\n`;
};

const [version, changelogPath = 'CHANGELOG.md'] = process.argv.slice(2);

try {
  process.stdout.write(readReleaseNotes(version, changelogPath));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
