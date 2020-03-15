import {
  SET_HIDDEN_COLUMNS,
  TOGGLE_COLLAPSIBLE,
  TOGGLE_COMPACT,
  TOGGLE_PRINTABLE_GRID,
} from '../actions/ui';
import { assign } from '../../utils';

export const initialState = {
  collapsedSections: [],
  hiddenColumns: [],
  isCompact: false,
  isPrintableGridVisible: false,
};

export default function uiReducer(state, action) {
  switch (action.type) {
    case SET_HIDDEN_COLUMNS:
      return assign(state, {
        hiddenColumns: action.columns,
      });

    case TOGGLE_COLLAPSIBLE:
      return assign(state, {
        collapsedSections: state.collapsedSections.includes(action.id)
          ? state.collapsedSections.filter((id) => id !== action.id)
          : state.collapsedSections.concat(action.id),
      });

    case TOGGLE_COMPACT:
      return assign(state, {
        isCompact: action.isCompact,
      });

    case TOGGLE_PRINTABLE_GRID:
      return assign(state, {
        isPrintableGridVisible: action.isVisible,
      });

    default:
      return state;
  }
}
