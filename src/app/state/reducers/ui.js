import { TOGGLE_COLLAPSIBLE } from '../actions/ui';
import { assign } from '../../utils';

export const initialState = {
  collapsedSections: [],
};

export default function uiReducer(state, action) {
  switch (action.type) {
    case TOGGLE_COLLAPSIBLE:
      return assign(state, {
        collapsedSections: state.collapsedSections.includes(action.id)
          ? state.collapsedSections.filter((id) => id !== action.id)
          : state.collapsedSections.concat(action.id),
      });

    default:
      return state;
  }
}
