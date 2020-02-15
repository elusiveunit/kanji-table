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
  const result = mapObject(reducers, (reducer, key) =>
    reducer(state[key], action),
  );

  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable no-console */
    const resultDiff = Object.keys(result).reduce(
      (diff, key) =>
        state[key] === result[key]
          ? diff
          : {
              ...diff,
              [key]: result[key],
            },
      {},
    );
    console.groupCollapsed(`action [${action.type}]`);
    console.log('[ACTION]', action);
    console.log('[BEFORE]', state);
    console.log('[AFTER]', result);
    console.log('[CHANGED]', resultDiff);
    console.groupEnd();
  }

  return result;
}
