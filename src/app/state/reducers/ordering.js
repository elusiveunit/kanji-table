import {
  SET_CORE_ORDER_BY,
  SET_ORDER_BY,
  SET_ORDER,
  SET_ORDERING,
} from '../actions/ordering';
import { KKLC, ORDER_ASC } from '../../../constants';
import { assign } from '../../utils';

export const initialState = {
  coreOrderBy: KKLC,
  order: ORDER_ASC,
  orderBy: KKLC,
};

export default function orderingReducer(state, action) {
  switch (action.type) {
    case SET_CORE_ORDER_BY:
      return assign(state, {
        coreOrderBy: action.coreOrderBy,
      });

    case SET_ORDER_BY:
      return assign(state, {
        orderBy: action.orderBy,
      });

    case SET_ORDER:
      return assign(state, {
        order: action.order,
      });

    case SET_ORDERING:
      return assign(state, {
        orderBy: action.orderBy,
        order: action.order,
      });

    default:
      return state;
  }
}
