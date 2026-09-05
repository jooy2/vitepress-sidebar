import { readFileSync, statSync } from 'fs';
import type { Stats } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { capitalizeEachWords, capitalizeFirst } from 'qsu';
import type {
  AnyValueObject,
  SidebarItem,
  SidebarListItem,
  SidebarSortFunction,
  SidebarSortItem,
  SortByObjectKeyOptions,
  VitePressSidebarOptions
} from './types.ts';

/**
 * Key the sort item of a menu item is carried under while its level is sorted.
 *
 * A sidebar item only says how it is displayed, so what a custom sort function
 * needs is attached under this key and removed once the level is sorted.
 */
export const SORT_ITEM_KEY = 'sortItem';

/**
 * Key a folder item is marked with while its level is ordered by `sortFolderTo`.
 *
 * A folder is told apart by the items it holds, which a folder kept by
 * `includeEmptyFolder` or linked through `useFolderLinkFromIndexFile` has none
 * of, so it is said here instead of being guessed.
 */
export const DIRECTORY_ITEM_KEY = 'isDirectoryItem';

export function generateNotTogetherMessage(options: string[]): string {
  return `These options cannot be used together: ${options.join(', ')}`;
}

/** Escapes every character that would otherwise be read as a regular expression. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** The line a frontmatter block opens and closes with. */
const FRONTMATTER_DELIMITER = '---';

/**
 * A Markdown file split into the frontmatter block and the content below it.
 *
 * The two parts are kept apart because only the block describes the page: a
 * `key: value` line further down belongs to the content, and a `#` there is a
 * heading rather than a comment.
 */
interface MarkdownFile {
  /** Text between the delimiters, without them */
  frontmatter: string;
  /** Everything below the closing delimiter */
  content: string;
  /** Frontmatter as `gray-matter` parsed it, empty when it is not valid YAML */
  data: AnyValueObject;
}

/**
 * Splits the content of a Markdown file into its frontmatter block and the
 * content below it.
 *
 * The block is located by its delimiters alone, the way `gray-matter` and
 * therefore VitePress locate it, instead of by parsing what it holds, so that
 * it is found even when its YAML is invalid.
 */
function splitFrontmatter(fileData: string): { frontmatter: string; content: string } {
  // A byte order mark sits before the opening delimiter and would hide it.
  const data = fileData.charCodeAt(0) === 0xfeff ? fileData.slice(1) : fileData;

  // There is no block unless the file opens with the delimiter, and a fourth
  // dash makes that line a horizontal rule instead.
  if (
    !data.startsWith(FRONTMATTER_DELIMITER) ||
    data.charAt(FRONTMATTER_DELIMITER.length) === '-'
  ) {
    return { frontmatter: '', content: data };
  }

  const closeIndex = data.indexOf(`\n${FRONTMATTER_DELIMITER}`, FRONTMATTER_DELIMITER.length);

  // A block that is never closed runs to the end of the file, which leaves no
  // content to read a heading from.
  if (closeIndex === -1) {
    return { frontmatter: data.slice(FRONTMATTER_DELIMITER.length), content: '' };
  }

  return {
    frontmatter: data.slice(FRONTMATTER_DELIMITER.length, closeIndex),
    content: data.slice(closeIndex + FRONTMATTER_DELIMITER.length + 1).replace(/^\r?\n/, '')
  };
}

/**
 * Files read while the sidebar is being built.
 *
 * Several options read something from the same file, and each of them used to
 * read and parse it again. The cache lives for one build only, so a later build
 * always sees the current content of the file.
 */
const markdownFileCache = new Map<string, MarkdownFile | null>();

/** Drops every file read by the previous build. */
export function clearMarkdownFileCache(): void {
  markdownFileCache.clear();
}

/** Reads a Markdown file, or returns `null` when it cannot be read. */
function readMarkdownFile(filePath: string): MarkdownFile | null {
  const cached = markdownFileCache.get(filePath);

  if (cached !== undefined) {
    return cached;
  }

  let result: MarkdownFile | null = null;

  try {
    const fileData = readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = splitFrontmatter(fileData);
    let data: AnyValueObject = {};

    try {
      data = matter(fileData).data ?? {};
    } catch {
      // The frontmatter is not valid YAML. The block itself is still read line
      // by line, which is what `getValueFromFrontmatter` falls back to.
    }

    result = { frontmatter, content, data };
  } catch {
    // Nothing to read
  }

  markdownFileCache.set(filePath, result);

  return result;
}

/**
 * Reads a single value of type `T` from the frontmatter of a file, and falls
 * back to `defaultValue` when the frontmatter does not carry it.
 */
export function getValueFromFrontmatter<T>(filePath: string, key: string, defaultValue: T): T {
  const fileData = readMarkdownFile(filePath);

  if (!fileData) {
    return defaultValue;
  }

  // A key that is present is used even when its value is falsy, so that an
  // `order: 0` or an `exclude: false` means what it says.
  if (Object.hasOwn(fileData.data, key)) {
    return fileData.data[key] as T;
  }

  // The frontmatter did not parse as YAML. Only the block itself is scanned:
  // a `key: value` line below it is content of the page, such as an example of
  // a frontmatter written inside a fenced code block, and describes nothing.
  const lines = fileData.frontmatter.split('\n');
  const keyPattern = new RegExp(`^${escapeRegExp(key)}: (.*)`);

  for (let i = 0, len = lines.length; i < len; i += 1) {
    const str = lines[i].replace('\r', '');

    if (keyPattern.test(str)) {
      try {
        return JSON.parse(str.replace(`${key}: `, '')) as T;
      } catch {
        return defaultValue;
      }
    }
  }

  return defaultValue;
}

export function getOrderFromFrontmatter(filePath: string, defaultOrder: number): number {
  const order = parseFloat(
    getValueFromFrontmatter<string>(filePath, 'order', defaultOrder.toString())
  );

  // An `order` that does not read as a number falls back to the default, the
  // same way a file that carries no `order` at all does, so that a value such
  // as `order: "first"` never reaches the sorting as `NaN`.
  return Number.isFinite(order) ? order : defaultOrder;
}

export function getDateFromFrontmatter(filePath: string): string {
  return getValueFromFrontmatter<string>(filePath, 'date', '0001-01-01');
}

/**
 * The time a file was created.
 *
 * `ctime` is the last time the metadata of a file changed, which a `chmod` or
 * the checkout of a repository moves, so it says nothing about when the file
 * came to be. A file system that records no creation time reports it as the
 * epoch, and `ctime` is then the closest thing it has.
 */
function getCreateTime(fileStats: Stats): Date {
  return fileStats.birthtime && fileStats.birthtime.getTime() > 0
    ? fileStats.birthtime
    : fileStats.ctime;
}

/** Creation or modification time of a file in milliseconds, `0` when unknown. */
export function getDateFromFile(filePath: string, modifyDate = false): number {
  try {
    const fileStats = statSync(filePath);
    const currentTime = modifyDate ? fileStats.mtime : getCreateTime(fileStats);

    if (!currentTime) {
      return 0;
    }

    // Kept in milliseconds, so that two files written in the same second are
    // still ordered by which of them came first.
    return new Date(currentTime).getTime();
  } catch {
    return 0;
  }
}

/**
 * Reads the whole frontmatter of a file, instead of a single field of it.
 *
 * A custom sort function is given the frontmatter as a whole because the field
 * it sorts by is one the generator knows nothing about.
 */
export function getFrontmatterData(filePath: string): AnyValueObject {
  return readMarkdownFile(filePath)?.data ?? {};
}

export function getExcludeFromFrontmatter(
  filePath: string,
  excludeFrontmatterFieldName?: string
): boolean {
  if (!excludeFrontmatterFieldName) {
    return false;
  }

  return getValueFromFrontmatter<boolean>(filePath, excludeFrontmatterFieldName, false);
}

/**
 * Matches the expression a dynamic route template uses to print one of its
 * parameters, such as `{{ $params.pkg }}` or `{{ $params['pkg'] }}`.
 */
const ROUTE_PARAM_EXPRESSION_REGEX =
  /\{\{\s*\$params\s*(?:\.(\w+)|\[\s*['"]([^'"]+)['"]\s*])\s*}}/g;

/**
 * Substitutes the parameters of a dynamic route into the text of its template.
 *
 * A dynamic route template is a single file, so every page it generates shares
 * one title. VitePress resolves that title in the browser, which the sidebar
 * cannot do, so the same substitution is applied here to keep each generated
 * page under its own name.
 */
export function resolveParamsInText(text: string, params: { [key: string]: string }): string {
  return text.replace(ROUTE_PARAM_EXPRESSION_REGEX, (match, dotKey, bracketKey) => {
    const value = params[dotKey ?? bracketKey];

    return value === undefined || value === null ? match : String(value);
  });
}

export function formatTitle(
  options: VitePressSidebarOptions,
  title: string,
  fromTitleHeading = false
): string {
  const htmlTags: string[] = [];
  const h1Headers: string[] = [];
  const htmlPlaceholder = '\u0001';
  const h1Placeholder = '\u0002';
  let text: string = title;
  let prefixString: string | undefined;
  let textWithoutPrefix: string | undefined;

  // Ignore prefix string before format title
  if (options.removePrefixAfterOrdering && options.prefixSeparator) {
    if (options.prefixSeparator instanceof RegExp) {
      // A regular expression removes what it matches, so only that is set
      // aside, and only when it opens the title: where a match found further
      // in would go back is no longer known once the formatting has changed
      // the text around it.
      const matched = title.match(options.prefixSeparator)?.at(0);

      if (matched && title.startsWith(matched)) {
        prefixString = matched;
      }
    } else {
      const textSplit = title.split(options.prefixSeparator);

      if (textSplit.length > 1) {
        prefixString = textSplit.shift() ?? '';
      }
    }

    if (prefixString) {
      textWithoutPrefix = title.slice(prefixString.length);
    }
  }

  text = textWithoutPrefix ?? text;

  // Replace HTML tags and Markdown h1 headers with placeholders
  text = text.replace(/<[^>]*>/g, (match) => {
    htmlTags.push(match);
    return htmlPlaceholder;
  });
  text = text.replace(/^(#+.*)$/gm, (match) => {
    h1Headers.push(match);
    return h1Placeholder;
  });

  // Remove certain Markdown format
  if (fromTitleHeading && !options.keepMarkdownSyntaxFromTitle) {
    text = text.replace(/\*{1,2}([^*]+?)\*{1,2}/g, '$1');
    text = text.replace(/_{1,2}([^_]+?)_{1,2}/g, '$1');
    text = text.replace(/~{1,2}([^~]+?)~{1,2}/g, '$1');
    text = text.replace(/`{1,3}([^`]+?)`{1,3}/g, '$1');
  }

  // Replace text [START]
  if (options.hyphenToSpace) {
    text = text.replace(/-/g, ' ');
  }
  if (options.underscoreToSpace) {
    text = text.replace(/_/g, ' ');
  }
  if (options.capitalizeEachWords) {
    text = capitalizeEachWords(text);
  } else if (options.capitalizeFirst) {
    text = capitalizeFirst(text);
  }

  // Replace text [END]

  // Restore Markdown headers and HTML tags
  let h1Index = -1;
  let htmlIndex = -1;

  text = text.replace(new RegExp(h1Placeholder, 'g'), () => {
    h1Index += 1;
    return h1Headers[h1Index];
  });
  text = text.replace(new RegExp(htmlPlaceholder, 'g'), () => {
    htmlIndex += 1;
    return htmlTags[htmlIndex];
  });

  if (prefixString) {
    text = `${prefixString}${text}`;
  }

  return text;
}

/**
 * Matches the line that opens or closes a fenced code block, indented by the
 * three spaces Markdown still reads as one.
 */
const FENCE_REGEX = /^ {0,3}(`{3,}|~{3,})/;

export function getTitleFromMd(
  fileName: string,
  filePath: string,
  options: VitePressSidebarOptions,
  isDirectory: boolean,
  callbackTitleReceived?: () => void,
  routeParams?: { [key: string]: string }
): string {
  // Applied before the title is formatted, so that the formatting options act
  // on the parameter value instead of on the expression that produced it.
  const applyRouteParams = (text: string): string =>
    routeParams ? resolveParamsInText(text, routeParams) : text;

  if (isDirectory) {
    return formatTitle(options, applyRouteParams(fileName));
  }

  if (options.useTitleFromFrontmatter) {
    // Use content frontmatter title value instead of file name
    const fieldName = options.frontmatterTitleFieldName || 'title';
    let value = getValueFromFrontmatter<string | undefined>(filePath, fieldName, undefined);

    // Try to use title front-matter as fallback
    if (!value && fieldName !== 'title') {
      value = getValueFromFrontmatter<string | undefined>(filePath, 'title', undefined);
    }
    if (value) {
      callbackTitleReceived?.();
      return formatTitle(options, applyRouteParams(value));
    }
  }

  if (options.useTitleFromFileHeading) {
    // Use content 'h1' string instead of file name
    const lines = readMarkdownFile(filePath)?.content.split('\n') ?? [];
    let openFence: string | null = null;

    for (let i = 0, len = lines.length; i < len; i += 1) {
      let str = lines[i].replace('\r', '');
      const fence = FENCE_REGEX.exec(str)?.[1];

      // A `#` inside a fenced code block belongs to the code, most often as
      // the comment of a shell snippet, and is not a heading of the page. A
      // block is only closed by a fence of the same character and at least the
      // same length, so a block written with one kind of fence, or with a
      // longer one, may hold another block inside it.
      if (fence) {
        if (openFence === null) {
          openFence = fence;
        } else if (fence.charAt(0) === openFence.charAt(0) && fence.length >= openFence.length) {
          openFence = null;
        }

        continue;
      }

      if (openFence !== null) {
        continue;
      }

      if (/^# /.test(str)) {
        str = str.replace(/^# /, '');

        if (/\[(.*)]\(.*\)/.test(str)) {
          // Remove hyperlink from h1 if exists
          const execValue = /(.*)?\[(.*)]\((.*)\)(.*)?/.exec(str) || '';

          str =
            execValue.length > 0
              ? `${execValue[1] || ''}${execValue[2] || ''}${execValue[4] || ''}`
              : '';
        }

        callbackTitleReceived?.();
        return formatTitle(options, applyRouteParams(str), true);
      }
    }
  }

  return formatTitle(options, applyRouteParams(fileName.replace(/\.md$/, '')));
}

// Sorting is applied once per directory while the sidebar is being built, so
// these helpers only sort the level they are given. Descending into `items`
// here would re-sort nested folders with the options of their parent and
// discard the options a folder defines for itself through `sidebar.config.json`.
export function sortByFileTypes(
  arrItems: SidebarListItem,
  sortFolderTo: 'top' | 'bottom'
): object[] {
  const isFolder = (item: SidebarItem): boolean => Object.hasOwn(item, DIRECTORY_ITEM_KEY);
  const itemFolders = arrItems.filter(isFolder);
  const itemFiles = arrItems.filter((item: SidebarItem) => !isFolder(item));

  if (sortFolderTo === 'top') {
    return [...itemFolders, ...itemFiles];
  }

  return [...itemFiles, ...itemFolders];
}

/**
 * Describes an item for a custom sort function.
 *
 * The file is only read, and its times only looked up, when the sort function
 * asks for them, so an order decided from the path alone costs nothing beyond
 * what the scan already did.
 */
export function createSortItem(params: {
  text?: string;
  link?: string;
  fileName: string;
  filePath: string;
  isDirectory: boolean;
}): SidebarSortItem {
  let fileTimes: { createDate: number; modifyDate: number } | undefined;
  let frontmatter: AnyValueObject | undefined;

  const getFileTimes = (): { createDate: number; modifyDate: number } => {
    if (!fileTimes) {
      try {
        const fileStats = statSync(params.filePath);

        fileTimes = {
          createDate: getCreateTime(fileStats)?.getTime() ?? 0,
          modifyDate: fileStats.mtime?.getTime() ?? 0
        };
      } catch {
        fileTimes = { createDate: 0, modifyDate: 0 };
      }
    }

    return fileTimes;
  };

  return {
    ...(params.text === undefined ? {} : { text: params.text }),
    ...(params.link === undefined ? {} : { link: params.link }),
    fileName: params.fileName,
    filePath: params.filePath,
    isDirectory: params.isDirectory,
    get createDate() {
      return getFileTimes().createDate;
    },
    get modifyDate() {
      return getFileTimes().modifyDate;
    },
    get frontmatter() {
      if (!frontmatter) {
        // A folder holds no content of its own, so its `index.md` describes it
        // here exactly as it already does for its title and its link.
        frontmatter = getFrontmatterData(
          params.isDirectory ? join(params.filePath, 'index.md') : params.filePath
        );
      }

      return frontmatter;
    }
  };
}

export function sortByCustomFunction(
  arrItems: SidebarListItem,
  sortFunction: SidebarSortFunction
): object[] {
  return arrItems.sort((a: SidebarListItem, b: SidebarListItem) =>
    sortFunction(a[SORT_ITEM_KEY], b[SORT_ITEM_KEY])
  );
}

export function sortByObjectKey(options: SortByObjectKeyOptions): object[] {
  const basicCollator = new Intl.Collator([], {
    numeric: options.numerically,
    sensitivity: 'base'
  });
  let result;

  if (options.dateSortFromFrontmatter) {
    result = options.arr.sort(
      (a: SidebarListItem, b: SidebarListItem) =>
        new Date(a[options.key]).valueOf() - new Date(b[options.key]).valueOf()
    );

    if (options.desc) {
      result = result.reverse();
    }
  } else if (options.dateSortFromTextWithPrefix) {
    // The date the text opens with, whatever separates it from the rest of the
    // name. `split` was used here instead of `match`, which returns the part
    // *before* the date and is therefore always the empty string, so every
    // comparison was `NaN` and the items were left in the order they were read
    // from the directory.
    const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    const dateOf = (item: SidebarListItem): number => {
      const matched = String(item[options.key] ?? '').match(dateRegex)?.[0];

      return matched ? new Date(matched).valueOf() : Number.NaN;
    };

    result = options.arr.sort((a: SidebarListItem, b: SidebarListItem) => {
      const aDate = dateOf(a);
      const bDate = dateOf(b);
      const aHasDate = !Number.isNaN(aDate);
      const bHasDate = !Number.isNaN(bDate);

      // An item that opens with no date carries nothing to sort by, so it is
      // kept together with the other such items instead of being compared as
      // an invalid date, which would leave the whole level unordered.
      if (!aHasDate || !bHasDate) {
        return aHasDate === bHasDate ? 0 : aHasDate ? 1 : -1;
      }

      return aDate - bDate;
    });

    if (options.desc) {
      result = result.reverse();
    }
  } else {
    const valueOf = (item: SidebarListItem) =>
      item[options.key] ?? (options.fallbackKey ? item[options.fallbackKey] : undefined);

    result = options.arr.sort((a: SidebarListItem, b: SidebarListItem) => {
      const aValue = valueOf(a);
      const bValue = valueOf(b);
      // `Intl.Collator`'s `numeric` option is a natural sort for digit runs
      // embedded in strings (e.g. filenames): it has no concept of a leading
      // `-` as a sign or `.` as a decimal point, so it mis-sorts genuinely
      // numeric values such as frontmatter `order` (`-0.5` ends up before `-1`,
      // and `2.5` before `2.25`). Values that are already numbers (as `order`
      // is, via `parseFloat`) get real numeric comparison instead.
      const compareResult =
        Number.isFinite(aValue) && Number.isFinite(bValue)
          ? aValue - bValue
          : basicCollator.compare(aValue, bValue);

      return options.desc ? -compareResult : compareResult;
    });
  }

  return result;
}

export function deepDeleteKey(obj: SidebarListItem, key: string): void {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  if (Object.hasOwn(obj, key)) {
    delete obj[key];
  }

  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === 'object') {
      deepDeleteKey(obj[item], key);
    }
  });
}

/**
 * Removes the prefix of every menu title, once the items have been ordered by
 * it. Only a title is changed, never a link, which keeps pointing at the file
 * it was read from.
 *
 * A separator written as text removes everything up to and including the first
 * one, while a regular expression removes what it matches, which is what makes
 * a prefix holding the separator itself, such as a date, expressible.
 */
export function removePrefixFromTitleAndLink(
  sidebarList: SidebarListItem,
  options: VitePressSidebarOptions
): SidebarListItem {
  const { prefixSeparator } = options;

  if (!prefixSeparator) {
    return sidebarList;
  }

  // Matched once, because what is removed is the prefix and not every value
  // that looks like one further along the title.
  const prefixPattern =
    prefixSeparator instanceof RegExp
      ? new RegExp(prefixSeparator.source, prefixSeparator.flags.replace(/g/g, ''))
      : null;

  for (let i = 0, len = sidebarList.length; i < len; i += 1) {
    const item = sidebarList[i];

    if (typeof item.text === 'string') {
      if (prefixPattern) {
        item.text = item.text.replace(prefixPattern, '');
      } else {
        const splitItem = item.text.split(prefixSeparator);

        if (splitItem.length > 1) {
          splitItem.shift();

          // Joined with the separator as text. A regular expression would be
          // turned into its own source here and printed inside the title.
          item.text = splitItem.join(prefixSeparator);
        }
      }
    }

    if (item.items) {
      item.items = removePrefixFromTitleAndLink(item.items, options);
    }
  }

  return sidebarList;
}

export function debugPrint(optionItems?: AnyValueObject, sidebarResult?: AnyValueObject): void {
  process.stdout.write(
    `\n${'='.repeat(50)}\n${JSON.stringify(optionItems, null, 2)}\n${'-'.repeat(
      50
    )}\n${JSON.stringify(sidebarResult, null, 2)}\n${'='.repeat(50)}\n\n`
  );
}
