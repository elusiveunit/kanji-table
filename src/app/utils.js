import { useEffect, useState } from 'react';

import kanjiData from '../../data/kanji-compressed.json';
import {
  FREQUENCY_NAME,
  FREQUENCY_KEYS,
  KANJI,
  MAX_SUFFIX,
  MIN_SUFFIX,
  ORDER_ASC,
  ORDER_DESC,
} from '../constants';

/**
 * Check if currently running in a prerendering task.
 *
 * @ignore
 * @see IS_PRERENDERING
 * @return {boolean}
 */
function isPrerendering() {
  const ua = (
    (global.navigator && global.navigator.userAgent) ||
    ''
  ).toLowerCase();
  return ua.indexOf('jsdom') !== -1 || ua.indexOf('node') !== -1;
}

/**
 * True if currently running in a prerendering task.
 *
 * @type {boolean}
 */
export const IS_PRERENDERING = isPrerendering();

/**
 * Check if a value is truthy.
 *
 * @param {*} val - The value to check.
 * @return {boolean}
 */
export function isTruthy(val) {
  return Boolean(val);
}

/**
 * Check if a value is a number or numeric string.
 *
 * @param {*} val - The value to check.
 * @return {boolean}
 */
export function isNumeric(val) {
  return typeof val === 'number' || val === String(Number(val));
}

/**
 * Assign properties of objects from left to right.
 *
 * A wrapper around `Object.assign` that doesn't mutate.
 *
 * @param {...Object} obj - Objects to process.
 * @return {Object} The resulting object.
 * @example
 *
 * assign({ a: 1, b: 2, c: 3 }, { a: 3 }, { c: 'c' });
 * // => { a: 3, b: 2, c: 'c' }
 */
export function assign(...obj) {
  return Object.assign({}, ...obj);
}

/**
 * Assign properties of objects from left to right if the properties assigned
 * to are null.
 *
 * @param {...Object} obj - Objects to process.
 * @return {Object} The resulting object.
 * @example
 *
 * assignIfNull({ a: 'a1', b: null }, { a: 'a2', b: 'b2' });
 * // => { a: 'a1', b: 'b2' }
 */
export function assignIfNull(...obj) {
  const result = obj[0];
  let next = obj[1];
  let i = 2;
  while (next) {
    Object.entries(next).forEach(([key, val]) => {
      if (result[key] === null) {
        result[key] = val;
      }
    });
    next = obj[i];
    i += 1;
  }
  return result;
}

/**
 * Get the first key from an object.
 *
 * @param {Object} obj - Object to get key from.
 * @return {string} The key.
 * @example
 *
 * getKey({ num: 42 });
 * // => 'num'
 */
export function getKey(obj) {
  return Object.keys(obj)[0];
}

/**
 * Get the first value from an object no matter what the key is.
 *
 * @param {Object} obj - Object to get value from.
 * @return {*} The value.
 * @example
 *
 * getValue({ num: 42 });
 * // => 42
 */
export function getValue(obj) {
  return Object.values(obj)[0];
}

/**
 * Create an object with the same keys as the passed object and values generated
 * by running each property through iteratee.
 *
 * @param {Object} obj - Object to map.
 * @param {Function} iteratee - Function invoked per iteration, gets arguments
 *   (value, key, object).
 * @return {Object} The resulting object.
 */
export function mapObject(obj, iteratee) {
  const keys = Object.keys(obj);
  const result = {};
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    result[key] = iteratee(obj[key], key, obj);
  }
  return result;
}

/**
 * Cycle through values from left to right.
 *
 * @param {*} current - The current value in the cycle.
 * @param  {...*} values - Values to cycle through.
 * @return {*} The next value, or first if at the end of the cycle.
 * @example
 *
 * const current = 1;
 * cycleValues(current, 1, 2, 3);
 * // => 2
 *
 * const current = 'c';
 * cycleValues(current, 'a', 'b', 'c');
 * // => 'a'
 */
export function cycleValues(current, ...values) {
  const index = values.indexOf(current);
  if (index === -1) {
    throw new Error(`'${current}' doesn't exist in supplied values.`);
  }
  return index + 1 >= values.length ? values[0] : values[index + 1];
}

/**
 * Get unique select options from the kanji data.
 *
 * @param {string} key Data key.
 * @return {Array.<Object>} Objects with `label` and `value`.
 */
export function getDataSelectOptions(key) {
  return (
    Array.from(new Set(kanjiData.map((item) => item[key])))
      .filter(isTruthy)
      // eslint-disable-next-line no-use-before-define
      .sort(sortAsc)
      .map((val) => ({
        label: val,
        value: val,
      }))
  );
}

/**
 * Hook for getting a flag that indicates if currently running in a
 * prerendering task.
 *
 * Will be true by default and switch to false when a component is mounted in
 * the browser.
 *
 * @return {boolean}
 */
export function usePrerenderFlag() {
  const [isPrerender, setIsPrerender] = useState(true);
  useEffect(() => {
    if (!IS_PRERENDERING) {
      setIsPrerender(false);
    }
  }, []);
  return isPrerender;
}

/* -------------------- Ordering -------------------- */

const NUM_REGEX = /\d+/;

/**
 * Get a number for sorting.
 *
 * @param {*} raw - Raw value.
 * @return {?number}
 */
export function getSortValue(raw) {
  // Jōyō grade indicating secondary school. Could be equivalent to 7 for jōyō
  // sorting purposes, but let's keep the S as a generic 'high number value'.
  if (String(raw).toUpperCase() === 'S') {
    return 100;
  }
  // Handle things like 'N2' for JLPT.
  const match = String(raw).match(NUM_REGEX);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Sort numeric array values.
 *
 * @param {*} a - First value.
 * @param {*} b - Second value.
 * @param {string} [order] - Sort order, defaults to ascending.
 */
export function sort(a, b, order = ORDER_ASC) {
  const aNum = getSortValue(a);
  const bNum = getSortValue(b);
  // Always put null values last.
  if (aNum === null) {
    return 1;
  }
  if (bNum === null) {
    return -1;
  }
  return order === ORDER_ASC ? aNum - bNum : bNum - aNum;
}

/**
 * Sort array values in ascending order. (Callback for `array.sort()`.)
 *
 * @param {*} a - First value.
 * @param {*} b - Second value.
 */
export function sortAsc(a, b) {
  return sort(a, b, ORDER_ASC);
}

/**
 * Sort array values in descending order. (Callback for `array.sort()`.)
 *
 * @param {*} a - First value.
 * @param {*} b - Second value.
 */
export function sortDesc(a, b) {
  return sort(a, b, ORDER_DESC);
}

/**
 * Create a sorting function for an array of objects.
 *
 * @param {string} order - Sort order, ASC or DESC.
 * @param {string} orderBy - Field/property to sort by.
 * @return {Function} The sorting function.
 * @example
 *
 * const arr = [{ a: 2 }, { a: 1 }, { a: 3 }];
 * const sorter = makeSorter(ORDER_ASC, 'a');
 * const result = arr.slice().sort(sorter);
 * // => [{ a: 1 }, { a: 2 }, { a: 3 }]
 */
export function makeSorter(order, orderBy) {
  return function sorter(a, b) {
    return sort(a[orderBy], b[orderBy], order);
  };
}

/**
 * Create function that sorts an array of objects by multiple fields.
 *
 * Sorting is done left to right, i.e. the second field will only be sorted on
 * if the first field comparison is equal.
 *
 * The sort order can be set to the same for all fields (by passing order
 * first followed by strings of field names) or on a per field basis (by
 * passing config objects for each field).
 *
 * @param {string|...Object} order - Sort order, ASC or DESC, when sorting
 *   all fields by the same order. If doing per-property sort order,
 *   configuration object when doing per-property sort order.)
 * @param {...string} fields - Fields/properties to sort by when not doing
 *   per-property sorting.
 * @return {Function} The sorting function.
 * @example
 *
 * const arr = [
 *   { a: 2, b: 4 },
 *   { a: 1, b: 3 },
 *   { a: 1, b: 2 },
 *   { a: 2, b: 1 },
 * ];
 *
 * // Same order for all fields
 * const sorter = makeMultiSorter(ORDER_ASC, 'a', 'b');
 * const result = arr.slice().sort(sorter);
 * // => [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 1 }, { a: 2, b: 4 }]
 *
 * // Different order per field
 * const sorter = makeMultiSorter({ a: ORDER_ASC }, { b: ORDER_DESC });
 * const result = arr.slice().sort(sorter);
 * // => [{ a: 1, b: 3 }, { a: 1, b: 2 }, { a: 2, b: 4 }, { a: 2, b: 1 }]
 */
export function makeMultiSorter(order, ...fields) {
  // Assume per-prop sorting objects if the first is an object.
  const isPerProp = typeof order === 'object';
  const filteredFields = fields.filter(isTruthy);
  const sortFields = isPerProp ? [order, ...filteredFields] : filteredFields;
  const sorters = sortFields.reduce((acc, field) => {
    const fieldName = isPerProp ? getKey(field) : field;
    const fieldOrder = isPerProp ? getValue(field) : order;
    return assign(acc, {
      [fieldName]: makeSorter(fieldOrder, fieldName),
    });
  }, {});
  const fieldNames = Object.keys(sorters);
  const fieldCount = fieldNames.length;

  return function multiSorter(a, b) {
    let i = 0;
    let result = 0;
    while (result === 0 && i < fieldCount) {
      result = sorters[fieldNames[i]](a, b);
      i += 1;
    }
    return result;
  };
}

/* -------------------- Filtering -------------------- */

const MAX_SUFFIX_REGEX = new RegExp(`${MAX_SUFFIX}$`);
const MIN_SUFFIX_REGEX = new RegExp(`${MIN_SUFFIX}$`);
const MIN_MAX_SUFFIX_REGEX = new RegExp(`(${MIN_SUFFIX}|${MAX_SUFFIX})$`);

export function isMaxFilter(filterKey) {
  return MAX_SUFFIX_REGEX.test(filterKey);
}

export function isMinFilter(filterKey) {
  return MIN_SUFFIX_REGEX.test(filterKey);
}

export function isRangeFilter(filterKey) {
  return isMinFilter(filterKey) || isMaxFilter(filterKey);
}

export function getRangeFilterDataKey(filterKey) {
  return filterKey.replace(MIN_MAX_SUFFIX_REGEX, '');
}

export function inRange(value, min, max) {
  if (!min && !max) {
    return value;
  }
  if (min && max) {
    return value >= min && value <= max;
  }
  return min ? value >= min : value <= max;
}

export function filterKanjiData(data, filters) {
  return data.filter((row) =>
    filters.every(({ key, value }) => {
      if (key === KANJI) {
        return value.indexOf(row[KANJI]) !== -1;
      }
      if (isRangeFilter(key)) {
        const dataKey = getRangeFilterDataKey(key);
        const min = isMinFilter(key) ? value : null;
        const max = isMaxFilter(key) ? value : null;
        return dataKey === FREQUENCY_NAME
          ? FREQUENCY_KEYS.every((freqKey) => inRange(row[freqKey], min, max))
          : inRange(row[dataKey], min, max);
      }
      return row[key] === value;
    }),
  );
}

/* -------------------- Cookies -------------------- */
// Based on https://github.com/madmurphy/cookies.js

const INVALID_COOKIE_KEYS_REGEX = /^(?:expires|max-age|path|domain|secure)$/i;

/**
 * Encode and filter cookie key.
 *
 * @ignore
 * @param {string} key - The raw key.
 * @return {string}
 */
function formatCookieKey(key) {
  return encodeURIComponent(key).replace(/[-.+*]/g, '\\$&');
}

/**
 * Get a cookie value.
 *
 * @param {string} key - Cookie key.
 * @return {string?} The value, or null if not set.
 */
export function getCookie(key) {
  if (!key) {
    throw new Error('Missing cookie key');
  }
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          `(?:(?:^|.*;)\\s*${formatCookieKey(key)}\\s*\\=\\s*([^;]*).*$)|^.*$`,
        ),
        '$1',
      ),
    ) || null
  );
}

/**
 * Set a cookie value.
 *
 * @param {string} key - Cookie key.
 * @param {string} value - Cookie value.
 * @param {number} [end] - Expire time in seconds, defaults to one year.
 * @param {string} [path] - Cookie path, defaults to '/'.
 * @param {string} [domain] - Cookie domain.
 * @param {boolean} [secure] - Only transfer cookie over https.
 */
export function setCookie(
  key,
  value,
  end = 31536000,
  path = '/',
  domain = null,
  secure = false,
) {
  if (!key || INVALID_COOKIE_KEYS_REGEX.test(key)) {
    throw new Error(`Missing or invalid cookie key '${key}'`);
  }
  let expires;
  if (end) {
    switch (end.constructor) {
      case Number:
        expires =
          end === Infinity
            ? '; expires=Fri, 1 Jan 2038 12:00:00 GMT'
            : `; max-age=${end}`;
        break;
      case String:
        expires = `; expires=${end}`;
        break;
      case Date:
        expires = `; expires=${end.toUTCString()}`;
        break;
      default:
        expires = '';
    }
  }
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value,
  )}${expires}${domain ? `; domain=${domain}` : ''}${
    path ? `; path=${path}` : ''
  }${secure ? '; secure' : ''}`;
}

/**
 * Check if a cookie exists.
 *
 * @param {string} key - Cookie key.
 * @return {boolean}
 */
export function hasCookie(key) {
  if (!key || INVALID_COOKIE_KEYS_REGEX.test(key)) {
    throw new Error(`Missing or invalid cookie key '${key}'`);
  }
  return new RegExp(`(?:^|;\\s*)${formatCookieKey(key)}\\s*\\=`).test(
    document.cookie,
  );
}

/**
 * Remove a cookie.
 *
 * @param {string} key - Cookie key.
 * @param {string} [path] - Cookie path.
 * @param {string} [domain] - Cookie domain.
 * @return {boolean} True if the cookie was removed, false otherwise.
 */
export function removeCookie(key, path, domain) {
  if (!hasCookie(key)) {
    return false;
  }
  document.cookie = `${encodeURIComponent(
    key,
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
    domain ? `; domain=${domain}` : ''
  }${path ? `; path=${path}` : ''}`;

  return true;
}
