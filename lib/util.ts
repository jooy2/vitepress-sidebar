import type { AnyValueObject } from './types.js';

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isTrueMinimumNumberOfTimes(conditions: any[], minimumCount = 1): boolean {
  const conditionLength = conditions.length;
  let trueCount = 0;

  for (let i = 0; i < conditionLength; i += 1) {
    if (typeof conditions[i] === 'boolean' && conditions[i]) {
      trueCount += 1;
    }
  }

  return trueCount >= minimumCount;
}

function isObject(data: any): boolean {
  return data !== null && data !== undefined && Object.getPrototypeOf(data) === Object.prototype;
}

export function objMergeNewKey(obj: AnyValueObject, obj2: AnyValueObject): AnyValueObject | null {
  if (!obj || typeof obj !== 'object' || !obj2 || typeof obj2 !== 'object') {
    return null;
  }

  const merged: AnyValueObject = { ...obj };

  Object.keys(obj2).forEach((key: string) => {
    const data = obj2[key];

    if (Object.hasOwn(merged, key)) {
      if (Array.isArray(merged[key]) && Array.isArray(data)) {
        if (merged[key].length === data.length) {
          for (let i = 0; i < merged[key].length; i += 1) {
            const update = data[i];

            if (isObject(update)) {
              merged[key][i] = objMergeNewKey(merged[key][i], update);
            }
          }
        }
      } else if (isObject(merged[key]) && isObject(data)) {
        merged[key] = objMergeNewKey(merged[key], data);
      } else {
        merged[key] = data;
      }
    } else {
      merged[key] = data;
    }
  });

  return merged;
}
