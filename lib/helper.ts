// Get a single value of type T from Frontmatter
// Defaults to defaultValue
import { readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { capitalizeEachWords, capitalizeFirst } from 'qsu';
import type {
  AnyValueObject,
  SidebarItem,
  SidebarListItem,
  SortByObjectKeyOptions,
  VitePressSidebarOptions
} from './types.ts';

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

export function getExcludeFromFrontmatter(
  filePath: string,
  excludeFrontmatterFieldName?: string
): boolean {
  if (!excludeFrontmatterFieldName) {
    return false;
  }

  return getValueFromFrontmatter<boolean>(filePath, excludeFrontmatterFieldName, false);
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
  callbackTitleReceived?: () => void
): string {
  if (isDirectory) {
    return formatTitle(options, fileName);
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
      return formatTitle(options, value);
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
          return formatTitle(options, str, true);
        }
      }
    } catch {
      // Do nothing
    }
  }

  return formatTitle(options, fileName.replace(/\.md$/, ''));
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
    result = options.arr.sort((a: SidebarListItem, b: SidebarListItem) => {
      const compareResult = basicCollator.compare(a[options.key], b[options.key]);

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
        if (
          !(
            !(options.prefixSeparator instanceof RegExp) &&
            obj[key].indexOf(options.prefixSeparator) === -1
          )
        ) {
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
