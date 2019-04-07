import { CLEAR_FILTERS, ADD_FILTER } from '../actions/filtering';
import { assign } from '../../utils';

export const initialState = {
  filters: [],
};

export default function filteringReducer(state, action) {
  switch (action.type) {
    case ADD_FILTER: {
      const base = state.filters.filter((f) => f.key !== action.key);
      return assign(state, {
        // Don't add the filter if there is no value to filter by
        filters: action.value
          ? base.concat({ key: action.key, value: action.value })
          : base,
      });
    }

    case CLEAR_FILTERS:
      return assign(state, { filters: initialState.filters });

    default:
      return state;
  }
}
