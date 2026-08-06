// Get a single value of type T from Frontmatter
// Defaults to defaultValue
import { readFileSync, statSync } from 'fs';
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

export function generateNotTogetherMessage(options: string[]): string {
  return `These options cannot be used together: ${options.join(', ')}`;
}

export function getValueFromFrontmatter<T>(filePath: string, key: string, defaultValue: T): T {
  try {
    const fileData = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileData);

    // Try for using gray-matter
    if (data?.[key]) {
      return data[key];
    }

    // Try manual parsing
    const lines = fileData.split('\n');
    let frontmatterStart = false;

    for (let i = 0, len = lines.length; i < len; i += 1) {
      const str = lines[i].toString().replace('\r', '');

      if (/^---$/.test(str)) {
        frontmatterStart = true;
      }
      if (new RegExp(`^${key}: (.*)`).test(str) && frontmatterStart) {
        return JSON.parse(str.replace(`${key}: `, '')) as T;
      }
    }
  } catch {
    return defaultValue;
  }
  return defaultValue;
}

export function getOrderFromFrontmatter(filePath: string, defaultOrder: number): number {
  return parseFloat(getValueFromFrontmatter<string>(filePath, 'order', defaultOrder.toString()));
}

export function getDateFromFrontmatter(filePath: string): string {
  return getValueFromFrontmatter<string>(filePath, 'date', '0001-01-01');
}

export function getDateFromFile(filePath: string, modifyDate = false): number {
  try {
    const fileStats = statSync(filePath);
    const currentTime = modifyDate ? fileStats.mtime : fileStats.ctime;

    if (!currentTime) {
      return 0;
    }

    return Math.floor(new Date(currentTime).getTime() / 1000);
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
  try {
    return matter(readFileSync(filePath, 'utf-8')).data ?? {};
  } catch {
    return {};
  }
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
    const textSplit = title.split(options.prefixSeparator);

    if (textSplit.length > 1) {
      prefixString =
        options.prefixSeparator instanceof RegExp
          ? (title.match(options.prefixSeparator)?.at(0) ?? '')
          : (textSplit.shift() ?? '');

      textWithoutPrefix = text.replace(prefixString, '');
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
    let value = getValueFromFrontmatter<string | undefined>(
      filePath,
      options.frontmatterTitleFieldName || 'title',
      undefined
    );
    // Try to use title front-matter as fallback
    if (!value) {
      value = getValueFromFrontmatter<string | undefined>(filePath, 'title', undefined);
    }
    if (value) {
      callbackTitleReceived?.();
      return formatTitle(options, applyRouteParams(value));
    }
  }

  if (options.useTitleFromFileHeading) {
    // Use content 'h1' string instead of file name
    try {
      const data = readFileSync(filePath, 'utf-8');
      const lines = data.split('\n');

      for (let i = 0, len = lines.length; i < len; i += 1) {
        let str = lines[i].toString().replace('\r', '');

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
    } catch {
      // Do nothing
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
  const itemFolders = arrItems.filter((item: SidebarItem) => Object.hasOwn(item, 'items'));
  const itemFiles = arrItems.filter((item: SidebarItem) => !Object.hasOwn(item, 'items'));

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
          createDate: fileStats.ctime?.getTime() ?? 0,
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
    const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/g;

    result = options.arr.sort((a: SidebarListItem, b: SidebarListItem) => {
      const aDate = a[options.key].split(dateRegex)?.[0];
      const bDate = b[options.key].split(dateRegex)?.[0];

      return new Date(aDate).valueOf() - new Date(bDate).valueOf();
    });

    if (options.desc) {
      result = result.reverse();
    }
  } else {
    const valueOf = (item: SidebarListItem) =>
      item[options.key] ?? (options.fallbackKey ? item[options.fallbackKey] : undefined);

    result = options.arr.sort((a: SidebarListItem, b: SidebarListItem) => {
      const compareResult = basicCollator.compare(valueOf(a), valueOf(b));

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

export function removePrefixFromTitleAndLink(
  sidebarList: SidebarListItem,
  options: VitePressSidebarOptions
): SidebarListItem {
  const sidebarListLength = sidebarList.length;

  for (let i = 0; i < sidebarListLength; i += 1) {
    const obj = sidebarList[i];

    for (let j = 0; j < Object.keys(obj).length; j += 1) {
      const key = Object.keys(obj)[j];

      if (key === 'text') {
        if (!(
          !(options.prefixSeparator instanceof RegExp) &&
          obj[key].indexOf(options.prefixSeparator) === -1
        )) {
          const splitItem = obj[key].split(options.prefixSeparator);

          if (splitItem.length > 1) {
            splitItem.shift();
          }

          obj[key] = splitItem.join(options.prefixSeparator);
        }
      } else if (key === 'items') {
        obj[key] = removePrefixFromTitleAndLink(obj[key], options);
      }
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
