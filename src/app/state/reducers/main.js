import { mapObject } from '../../utils';

import ordering, { initialState as initialOrderingState } from './ordering';
import ui, { initialState as initialUiState } from './ui';

export const initialState = {
  filtering: [],
  ordering: initialOrderingState,
  ui: initialUiState,
};

const reducers = {
  filtering: (s) => s,
  ordering,
  ui,
};

export default function mainReducer(state, action) {
  return mapObject(reducers, (reducer, key) => reducer(state[key], action));
}
