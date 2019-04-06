import { mapObject } from '../../utils';

import filtering, { initialState as filteringInitialState } from './filtering';
import ordering, { initialState as orderingInitialState } from './ordering';
import ui, { initialState as uiInitialState } from './ui';

export const initialState = {
  filtering: filteringInitialState,
  ordering: orderingInitialState,
  ui: uiInitialState,
};

const reducers = {
  filtering,
  ordering,
  ui,
};

export default function mainReducer(state, action) {
  return mapObject(reducers, (reducer, key) => reducer(state[key], action));
}
