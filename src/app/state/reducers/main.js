import { assign, mapObject } from '../../utils';
import ordering, { initialState as initialOrderingState } from './ordering';

export const initialState = {
  ordering: initialOrderingState,
  filtering: [],
};

const reducers = {
  ordering,
  filtering: (s) => s,
};

export default function mainReducer(state, action) {
  return mapObject(reducers, (reducer, key) => reducer(state[key], action));
  /* return Object.keys(reducers).reduce(
    (newState, stateTreeKey) =>
      assign(newState, {
        [stateTreeKey]: reducers[stateTreeKey](state[stateTreeKey], action),
      }),
    {},
  ); */
}
