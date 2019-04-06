export const FILTER = 'FILTER';
/**
 * Set which field to order by.
 *
 * @param {string} key - The filter field key.
 * @param {string} value - The value to filter by.
 * @return {Object} Action.
 */
export function filter(key, value) {
  return {
    type: FILTER,
    key,
    value,
  };
}
