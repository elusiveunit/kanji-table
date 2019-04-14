export const SET_HIDDEN_COLUMNS = 'SET_HIDDEN_COLUMNS';
/**
 * Set which table columns should be hidden.
 *
 * @param {Array.<string>} columns - IDs of columns to hide.
 * @return {Object} Action.
 */
export function setHiddenColumns(columns) {
  return {
    type: SET_HIDDEN_COLUMNS,
    columns,
  };
}

export const TOGGLE_COLLAPSIBLE = 'TOGGLE_COLLAPSIBLE';
/**
 * Toggle a collapsible's collapsed/expanded state.
 *
 * @param {string} id - The collapsible's ID.
 * @return {Object} Action.
 */
export function toggleCollapsible(id) {
  return {
    type: TOGGLE_COLLAPSIBLE,
    id,
  };
}
