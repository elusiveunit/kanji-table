export const ADD_FILTER = 'ADD_FILTER';
/**
 * Add a table filter.
 *
 * @param {string} key - The filter field key.
 * @param {string} value - The value to filter by.
 * @return {Object} Action.
 */
export function addFilter(key, value) {
  return {
    type: ADD_FILTER,
    key,
    value,
  };
}

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
/**
 * Clear all active filters.
 *
 * @return {Object} Action.
 */
export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}
