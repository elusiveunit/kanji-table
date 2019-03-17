import { ORDER_ASC } from '../constants';

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
 * @param {mixed} current - The current value in the cycle.
 * @param  {...mixed} values - Values to cycle through.
 * @return {mixed} The next value, or first if at the end of the cycle.
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

const NUM_REGEX = /\d+/;

/**
 * Get a number for sorting.
 *
 * @param {mixed} raw - Raw value.
 * @return {number?}
 */
export function getNumProp(raw) {
  // Handle things like 'N2' for JLPT
  const match = String(raw).match(NUM_REGEX);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Create a sorting function for an array of objects.
 *
 * @param {string} order - Sort order, ASC or DESC.
 * @param {string} orderBy - Field/property to sort by.
 * @example
 *
 * const arr = [{ a: 2 }, { a: 1 }, { a: 3 }];
 * const sorter = makeSorter(ORDER_ASC, 'a');
 * const result = arr.slice().sort(sorter);
 * // => [{ a: 1 }, { a: 2 }, { a: 3 }]
 */
export function makeSorter(order, orderBy) {
  return function sorter(a, b) {
    // Always put null values last
    const aNum = getNumProp(a[orderBy]);
    const bNum = getNumProp(b[orderBy]);
    if (aNum === null) {
      return 1;
    }
    if (bNum === null) {
      return -1;
    }
    return order === ORDER_ASC ? aNum - bNum : bNum - aNum;
  };
}

/**
 * Create function that sorts an array of objects by multiple fields.
 *
 * @param {string} order - Sort order, ASC or DESC.
 * @param {...string} fields - Fields/properties to sort by. Sorting is done
 *   left to right, i.e. the second field will only be sorted on if the first
 *   field comparison is equal.
 * @example
 *
 * const arr = [
 *   { a: 2, b: 4 },
 *   { a: 1, b: 3 },
 *   { a: 1, b: 2 },
 *   { a: 2, b: 1 },
 * ];
 * const sorter = makeMultiSorter(ORDER_ASC, 'a', 'b');
 * const result = arr.slice().sort(sorter);
 * // => [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 1 }, { a: 2, b: 4 }]
 */
export function makeMultiSorter(order, ...fields) {
  const sorters = fields.reduce(
    (acc, field) =>
      assign(acc, {
        [field]: makeSorter(order, field),
      }),
    {},
  );
  const fieldCount = fields.length;

  return function multiSorter(a, b) {
    let i = 0;
    let result = 0;
    while (result === 0 && i < fieldCount) {
      result = sorters[fields[i]](a, b);
      i += 1;
    }
    return result;
  };
}
