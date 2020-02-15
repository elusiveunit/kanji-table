// Must use the generic object type here.
/* eslint-disable react/forbid-prop-types */

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import pt from 'prop-types';

import kanjiData from '../../../data/kanji-compressed.json';
import { ORDER_ASC } from '../../constants';
import { filterKanjiData, makeMultiSorter, mapObject } from '../utils';
import mainReducer, { initialState } from './reducers/main';

export const StoreContext = createContext();

/**
 * Context provider to make the store available to the component tree. Should
 * probably be rendered close to the top.
 *
 * @param {Object} props - Component props.
 */
export function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={useReducer(mainReducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
}
StoreProvider.propTypes = {
  children: pt.node.isRequired,
};

/**
 * Hook that returns store state and dispatch-wrapped action creators.
 *
 * @param {Function} [mapState] - State selector that should return fields
 *   from the store that the component needs. If not supplied, the whole state
 *   tree is returned.
 * @param {Object} [mapDispatch] - Map of action creator functions. For each
 *   function, a new one will be returned that is warpped in dispatch. If not
 *   supplied the second returned value will be the dispatch function. Otherwise
 *   the dispatch function will be supplied as the third value.
 * @example
 *
 * // Can call `d.incrementAnimal()` which will be the same as calling
 * // `dispatch(incrementAnimal())`
 * const [{ animalCounter }, d] = useStoreState(
 *   (state) => state.counters,
 *   { incrementAnimal },
 * );
 */
export function useStoreState(mapState, mapDispatch) {
  const [state, dispatch] = useContext(StoreContext);
  return [
    mapState ? mapState(state) : state,
    mapDispatch
      ? mapObject(mapDispatch, (action) => (...args) =>
          dispatch(action(...args)),
        )
      : dispatch,
    mapDispatch ? dispatch : undefined,
  ];
}

/**
 * Hook that returns dispatch-wrapped action creators.
 *
 * @param {Object} mapDispatch - Map of action creator functions. For each
 *   function, a new one will be returned that is warpped in dispatch.
 * @example
 *
 * // Can call `d.incrementAnimal()` which will be the same as calling
 * // `dispatch(incrementAnimal())`
 * const d = useDispatch({ incrementAnimal });
 */
export function useDispatch(mapDispatch) {
  const dispatch = useContext(StoreContext)[1];
  const obj = useMemo(
    () => mapDispatch,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(mapDispatch),
  );
  return useMemo(
    () => mapObject(obj, (action) => (...args) => dispatch(action(...args))),
    [dispatch, obj],
  );
}

/**
 * Hook that returns kanji data with filtering and ordering applied.
 *
 * @returns {Array.<object>}
 */
export function useKanjiData() {
  const [{ filters, ordering }] = useStoreState((state) => ({
    filters: state.filtering.filters,
    ordering: state.ordering,
  }));
  const { coreOrderBy, order, orderBy } = ordering;
  const sorter = useCallback(
    makeMultiSorter(
      { [orderBy]: order },
      coreOrderBy !== orderBy ? { [coreOrderBy]: ORDER_ASC } : null,
    ),
    [coreOrderBy, orderBy, order],
  );
  const resultData = useMemo(
    () => filterKanjiData(kanjiData.slice().sort(sorter), filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sorter, JSON.stringify(filters)],
  );
  return resultData;
}

/**
 * Higher order component that will return a new component with state and
 * action dispatchers added to props.
 *
 * @param {Function} [mapState] - State selector that should return fields
 *   from the store that the component needs. If not supplied, no state is
 *   added to props.
 * @param {Object} [mapDispatch] - Map of action creator functions. For each
 *   function, a new one will be returned that is wrapped in dispatch.
 *   Additionally, the dispatch function is always available as a prop.
 */
export function withStoreState(Component, mapState, mapDispatch) {
  function WithStoreStateComponent(props) {
    const [state, actions, dispatch] = useStoreState(mapState, mapDispatch);
    // Don't add the entire state to props and don't add a `state` props since
    // props.state will look a bit wrong.
    const stateProp = mapState ? state : {};
    const dispatchProp =
      typeof actions === 'function'
        ? { dispatch: actions }
        : { dispatch, ...actions };
    return <Component {...props} {...stateProp} {...dispatchProp} />;
  }
  WithStoreStateComponent.displayName = `withStoreState(${Component.displayName})`;

  return WithStoreStateComponent;
}
