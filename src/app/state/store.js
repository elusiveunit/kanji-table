// Must use the generic object type here.
/* eslint-disable react/forbid-prop-types */

import React, { createContext, useContext, useReducer } from 'react';
import pt from 'prop-types';

import { mapObject } from '../utils';
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
StoreProvider.displayName = 'StoreProvider';
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
  WithStoreStateComponent.displayName = `withStoreState(${
    Component.displayName
  })`;

  return WithStoreStateComponent;
}
