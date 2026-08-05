import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { globSync } from 'glob';
import type { AnyValueObject, VitePressSidebarOptions } from './types.ts';

/**
 * Name of the per-folder configuration file.
 *
 * The name is intentionally fixed so that a configuration file dropped anywhere
 * in the project is picked up without any additional setup.
 */
export const SIDEBAR_CONFIG_FILE_NAME = 'sidebar.config.json';

// Directories that never hold documents. They are skipped while looking for
// configuration files across the project.
const CONFIG_FILE_SCAN_IGNORE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/coverage/**',
  '**/target/**',
  '**/vendor/**'
];

// The value types a JSON configuration file can express
type OptionValueTypeName = 'string' | 'boolean' | 'number' | 'string[]';

type OptionValueType<N extends OptionValueTypeName> = N extends 'string'
  ? string
  : N extends 'boolean'
    ? boolean
    : N extends 'number'
      ? number
      : string[];

/**
 * The type names that describe option `T`.
 *
 * `null` and `undefined` are stripped because they are handled separately, and
 * both assignment directions are accepted so that a literal union such as
 * `'top' | 'bottom'` resolves to `'string'`.
 */
type OptionValueTypeNameOf<T> = {
  [N in OptionValueTypeName]: NonNullable<T> extends OptionValueType<N>
    ? N
    : OptionValueType<N> extends NonNullable<T>
      ? N
      : never;
}[OptionValueTypeName];

interface ConfigFileOptionSpec {
  /** Type the option must have in a configuration file */
  type: OptionValueTypeName;
  /**
   * An option that describes the sidebar as a whole instead of a single folder.
   *
   * Such an option is only honored in a configuration file that sits between
   * the current working directory and the scan root, and is ignored in any
   * deeper file.
   */
  rootOnly?: boolean;
  /** The only values the option accepts, when it is not free-form */
  values?: readonly unknown[];
}

// Requiring every key removes the optionality of `VitePressSidebarOptions`, so
// a missing entry is reported instead of silently allowed.
type ConfigFileOptionSpecs = {
  [K in keyof VitePressSidebarOptions]-?: Omit<ConfigFileOptionSpec, 'type' | 'values'> & {
    type: OptionValueTypeNameOf<VitePressSidebarOptions[K]>;
    values?: readonly NonNullable<VitePressSidebarOptions[K]>[];
  };
};

/**
 * Every option accepted by a configuration file.
 *
 * `satisfies` keeps this table and `VitePressSidebarOptions` from drifting
 * apart: adding an option to the interface without listing it here, listing a
 * name that is not an option, or declaring a type the option does not have,
 * fails to compile.
 */
const OPTION_SPECS = {
  documentRootPath: { type: 'string', rootOnly: true },
  scanStartPath: { type: 'string', rootOnly: true },
  resolvePath: { type: 'string', rootOnly: true },
  basePath: { type: 'string', rootOnly: true },
  rootGroupText: { type: 'string', rootOnly: true },
  rootGroupLink: { type: 'string', rootOnly: true },
  rootGroupCollapsed: { type: 'boolean', rootOnly: true },
  includeRootIndexFile: { type: 'boolean', rootOnly: true },
  removePrefixAfterOrdering: { type: 'boolean', rootOnly: true },
  debugPrint: { type: 'boolean', rootOnly: true },
  collapsed: { type: 'boolean' },
  collapseDepth: { type: 'number' },
  collapseFromLevel: { type: 'number' },
  hyphenToSpace: { type: 'boolean' },
  underscoreToSpace: { type: 'boolean' },
  capitalizeFirst: { type: 'boolean' },
  capitalizeEachWords: { type: 'boolean' },
  includeFolderIndexFile: { type: 'boolean' },
  useTitleFromFileHeading: { type: 'boolean' },
  useTitleFromFrontmatter: { type: 'boolean' },
  useFolderTitleFromIndexFile: { type: 'boolean' },
  useFolderLinkFromIndexFile: { type: 'boolean' },
  useFolderLinkFromSameNameSubFile: { type: 'boolean' },
  includeDotFiles: { type: 'boolean' },
  folderLinkNotIncludesFileName: { type: 'boolean' },
  includeEmptyFolder: { type: 'boolean' },
  sortMenusByName: { type: 'boolean' },
  sortMenusByFileCreateDate: { type: 'boolean' },
  sortMenusByFileModifyDate: { type: 'boolean' },
  sortMenusByFrontmatterOrder: { type: 'boolean' },
  sortMenusByFrontmatterDate: { type: 'boolean' },
  sortMenusByFileDatePrefix: { type: 'boolean' },
  sortMenusOrderByDescending: { type: 'boolean' },
  sortMenusOrderNumericallyFromTitle: { type: 'boolean' },
  sortMenusOrderNumericallyFromLink: { type: 'boolean' },
  sortFolderTo: { type: 'string', values: ['top', 'bottom'] },
  keepMarkdownSyntaxFromTitle: { type: 'boolean' },
  manualSortFileNameByPriority: { type: 'string[]' },
  excludeByFolderDepth: { type: 'number' },
  excludeByGlobPattern: { type: 'string[]' },
  excludeFilesByFrontmatterFieldName: { type: 'string' },
  followSymlinks: { type: 'boolean' },
  prefixSeparator: { type: 'string' },
  frontmatterOrderDefaultValue: { type: 'number' },
  frontmatterTitleFieldName: { type: 'string' },
  excludePattern: { type: 'string[]' }
} satisfies ConfigFileOptionSpecs;

function getOptionSpec(key: string): ConfigFileOptionSpec | null {
  if (!Object.hasOwn(OPTION_SPECS, key)) {
    return null;
  }

  return OPTION_SPECS[key as keyof typeof OPTION_SPECS];
}

function isValidOptionValue(value: unknown, spec: ConfigFileOptionSpec): boolean {
  if (spec.type === 'string[]') {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
  }

  if (typeof value !== spec.type) {
    return false;
  }

  if (spec.type === 'number' && !Number.isFinite(value)) {
    return false;
  }

  return !spec.values || spec.values.includes(value);
}

function describeOptionType(spec: ConfigFileOptionSpec): string {
  if (spec.values) {
    return `one of ${spec.values.map((value) => `'${String(value)}'`).join(', ')}`;
  }

  switch (spec.type) {
    case 'string[]':
      return 'an array of strings';
    case 'number':
      return 'a number';
    case 'boolean':
      return 'a boolean';
    default:
      return 'a string';
  }
}

function printWarning(message: string): void {
  process.stderr.write(`[vitepress-sidebar] ${message}\n`);
}

/**
 * Reads `sidebar.config.json` from `dirPath`.
 *
 * Returns `null` when the directory holds no configuration file. Unknown keys
 * are dropped with a warning so a typo never silently changes the output.
 */
export function readConfigFile(
  dirPath: string,
  allowRootOnlyOptions: boolean
): VitePressSidebarOptions | null {
  const filePath = join(dirPath, SIDEBAR_CONFIG_FILE_NAME);

  if (!existsSync(filePath)) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (e) {
    throw new Error(`Failed to parse '${filePath}': ${(e as Error).message}`);
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`'${filePath}' must contain a JSON object.`);
  }

  const rawOptions = parsed as AnyValueObject;
  const result: AnyValueObject = {};

  Object.keys(rawOptions).forEach((key) => {
    // `$schema` is used by editors for completion and is not an option
    if (key === '$schema') {
      return;
    }

    const optionSpec = getOptionSpec(key);

    if (!optionSpec) {
      printWarning(`Unknown option '${key}' in '${filePath}' was ignored.`);
      return;
    }

    if (!allowRootOnlyOptions && optionSpec.rootOnly) {
      printWarning(
        `'${key}' can only be used in a configuration file at or above the document root, so it was ignored in '${filePath}'.`
      );
      return;
    }

    const value = rawOptions[key];

    // `null` leaves the option unset, and is meaningful for the options that
    // distinguish it from `false`, so it is always accepted.
    if (value !== null && !isValidOptionValue(value, optionSpec)) {
      printWarning(
        `'${key}' in '${filePath}' must be ${describeOptionType(optionSpec)}, so it was ignored.`
      );
      return;
    }

    result[key] = value;
  });

  return result as VitePressSidebarOptions;
}

/**
 * Merges every configuration file found while walking `relativePath` down from
 * `baseDir`. Files closer to the documents win over the ones above them.
 */
export function mergeConfigFilesInPath(
  baseDir: string,
  relativePath: string,
  includeBaseDir: boolean
): VitePressSidebarOptions {
  const segments = relativePath.split(/[\\/]/).filter((x) => x.length > 0 && x !== '.');
  let currentDir = baseDir;
  let merged: VitePressSidebarOptions = {};

  if (includeBaseDir) {
    merged = { ...merged, ...(readConfigFile(currentDir, true) ?? {}) };
  }

  for (let i = 0, len = segments.length; i < len; i += 1) {
    currentDir = join(currentDir, segments[i]);
    merged = { ...merged, ...(readConfigFile(currentDir, true) ?? {}) };
  }

  return merged;
}

/**
 * Guesses `documentRootPath` from the location of the configuration files in
 * the project. The closest common parent directory of every detected
 * `sidebar.config.json` becomes the document root, which makes an explicit
 * `documentRootPath` unnecessary for most projects.
 *
 * Returns `null` when the project holds no configuration file at all.
 */
export function detectDocumentRootPath(cwd: string): string | null {
  const configFilePaths = globSync(`**/${SIDEBAR_CONFIG_FILE_NAME}`, {
    cwd,
    ignore: CONFIG_FILE_SCAN_IGNORE,
    dot: false,
    follow: false
  });

  if (configFilePaths.length < 1) {
    return null;
  }

  let commonSegments: string[] | null = null;

  configFilePaths.forEach((configFilePath) => {
    const configFileDir = dirname(configFilePath.replace(/\\/g, '/'));
    const segments = configFileDir === '.' ? [] : configFileDir.split('/');

    if (commonSegments === null) {
      commonSegments = segments;
      return;
    }

    let sameLength = 0;

    while (
      sameLength < commonSegments.length &&
      sameLength < segments.length &&
      commonSegments[sameLength] === segments[sameLength]
    ) {
      sameLength += 1;
    }

    commonSegments = commonSegments.slice(0, sameLength);
  });

  return `/${(commonSegments ?? []).join('/')}`;
}

/**
 * Applies the default values that the generator relies on.
 *
 * Must always run on raw (un-normalized) options, because some defaults are
 * only applied when the user did not provide a value.
 */
export function normalizeOptions(options: VitePressSidebarOptions): VitePressSidebarOptions {
  const result: VitePressSidebarOptions = { ...options };

  result.documentRootPath = result.documentRootPath ?? '/';

  if (!/^\//.test(result.documentRootPath)) {
    result.documentRootPath = `/${result.documentRootPath}`;
  }

  if (result.collapseDepth) {
    result.collapsed = true;
  }

  if (!result.prefixSeparator) {
    result.prefixSeparator = '.';
  }

  result.collapseDepth = result.collapseDepth ?? 1;
  result.manualSortFileNameByPriority = result.manualSortFileNameByPriority ?? [];
  result.frontmatterOrderDefaultValue = result.frontmatterOrderDefaultValue ?? 0;

  return result;
}
