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
