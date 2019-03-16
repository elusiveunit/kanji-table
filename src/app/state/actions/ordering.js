export const SET_CORE_ORDER_BY = 'SET_CORE_ORDER_BY';
/**
 * Set the core/fallback field to order by.
 *
 * @param {string} field - Field ID to order by.
 * @return {Object} Action.
 */
export function setCoreOrderBy(field) {
  return {
    type: SET_CORE_ORDER_BY,
    coreOrderBy: field,
  };
}

export const SET_ORDER_BY = 'SET_ORDER_BY';
/**
 * Set which field to order by.
 *
 * @param {string} field - Field ID to order by.
 * @return {Object} Action.
 */
export function setOrderBy(field) {
  return {
    type: SET_ORDER_BY,
    orderBy: field,
  };
}

export const SET_ORDER = 'SET_ORDER';
/**
 * Set the sort order.
 *
 * @param {string} order - ASC or DESC.
 * @return {Object} Action.
 */
export function setOrder(order) {
  return {
    type: SET_ORDER,
    order,
  };
}

export const SET_ORDERING = 'SET_ORDERING';
/**
 * Set both the sort order and which field to order by.
 *
 * @param {string} orderBy - Field ID to order by.
 * @param {string} order - ASC or DESC.
 * @return {Object} Action.
 */
export function setOrdering(orderBy, order) {
  return {
    type: SET_ORDERING,
    orderBy,
    order,
  };
}
