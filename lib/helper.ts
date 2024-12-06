// Get a single value of type T from Frontmatter
// Defaults to defaultValue
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import type {
  AnyValueObject,
  SidebarItem,
  SidebarListItem,
  SortByObjectKeyOptions,
  VitePressSidebarOptions
} from './types';
import { capitalizeFirst } from './util';

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
  } catch (e) {
    return defaultValue;
  }
  return defaultValue;
}

export function getOrderFromFrontmatter(filePath: string, defaultOrder: number): number {
  return parseInt(getValueFromFrontmatter<string>(filePath, 'order', defaultOrder.toString()), 10);
}

export function getDateFromFrontmatter(filePath: string): string {
  return getValueFromFrontmatter<string>(filePath, 'date', '0001-01-01');
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
  let text = title;

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
    let lastChar = '';

    for (let i = 0; i < text.length; i += 1) {
      if ((i === 0 || !/[a-zA-Z0-9]/.test(lastChar)) && /[a-z]/.test(text[i])) {
        text = text.slice(0, i) + text[i].toUpperCase() + text.slice(i + 1);
      }

      lastChar = text[i];
    }
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
      return 'Unknown';
    }
  }

  return formatTitle(options, fileName.replace(/\.md$/, ''));
}

export function sortByFileTypes(
  arrItems: SidebarListItem,
  sortFolderTo: 'top' | 'bottom'
): object[] {
  for (let i = 0; i < arrItems.length; i += 1) {
    if (arrItems[i].items && arrItems[i].items.length) {
      arrItems[i].items = sortByFileTypes(arrItems[i].items, sortFolderTo);
    }
  }

  const itemFolders = arrItems.filter((item: SidebarItem) => Object.hasOwn(item, 'items'));
  const itemFiles = arrItems.filter((item: SidebarItem) => !Object.hasOwn(item, 'items'));

  if (sortFolderTo === 'top') {
    return [...itemFolders, ...itemFiles];
  }

  return [...itemFiles, ...itemFolders];
}

export function sortByObjectKey(options: SortByObjectKeyOptions): object[] {
  for (let i = 0; i < options.arr.length; i += 1) {
    if (options.arr[i].items && options.arr[i].items.length) {
      options.arr[i].items = sortByObjectKey({
        ...options,
        arr: options.arr[i].items
      });
    }
  }

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

          splitItem.shift();

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
