import React, { useEffect, useState } from 'react';
import pt from 'prop-types';

import { CHILDREN_KEY } from '../../constants';
import { assign, findDeep, mapDeep } from '../utils';
import Checkbox from './Checkbox';

// Recursive structure
const controlShape = {
  name: pt.string.isRequired,
  label: pt.string.isRequired,
  checked: pt.bool,
  indeterminate: pt.bool,
};
controlShape[CHILDREN_KEY] = pt.arrayOf(pt.shape(controlShape));
const controlsProp = pt.arrayOf(pt.shape(controlShape));

const mapName = ({ name }) => name;

export function CheckboxTreeLevel(props) {
  const { controls, onChange } = props;

  return (
    <ul>
      {controls.map((control) => (
        <li key={control.name}>
          <Checkbox
            id={`${control.name}-input`}
            name={control.name}
            label={control.label}
            checked={control.checked}
            indeterminate={control.indeterminate}
            onChange={onChange}
            aria-controls={
              control[CHILDREN_KEY]
                ? control[CHILDREN_KEY].map(
                  (child) => `${child.name}-input`,
                ).join(' ')
                : undefined
            }
          />
          {Boolean(control[CHILDREN_KEY]) && (
            <CheckboxTreeLevel
              controls={control[CHILDREN_KEY]}
              onChange={onChange}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
CheckboxTreeLevel.displayName = 'CheckboxTreeLevel';
CheckboxTreeLevel.propTypes = {
  controls: controlsProp.isRequired,
  onChange: pt.func.isRequired,
};

export default function CheckboxTree(props) {
  const { controls, onChange } = props;
  const [state, setState] = useState(controls);
  const parentNames = state.map(mapName);

  const handleChange = (e) => {
    const { checked, name } = e.target;
    const control = findDeep(state, (item) => item.name === name);

    let setNames = [];
    let indeterminateNames = [];
    if (parentNames.includes(name)) {
      setNames = [name].concat((control[CHILDREN_KEY] || []).map(mapName));
    } else {
      const parent = state.find((item) =>
        (item[CHILDREN_KEY] || []).map(mapName).includes(name),
      );
      const siblings = parent[CHILDREN_KEY].filter(
        (child) => child.name !== name,
      );
      if (siblings.every((s) => s.checked === checked)) {
        setNames = [parent.name, name];
      } else {
        indeterminateNames = [parent.name];
        setNames = [name];
      }
    }
    setState((currentState) =>
      mapDeep(currentState, (item) => {
        if (indeterminateNames.includes(item.name)) {
          return assign(item, { checked: false, indeterminate: true });
        }
        return setNames.includes(item.name)
          ? assign(item, { checked, indeterminate: false })
          : item;
      }),
    );
  };
  // The state setter is async, so run the callback when the value has changed
  useEffect(() => {
    onChange(state);
  }, [state]);

  return <CheckboxTreeLevel controls={state} onChange={handleChange} />;
}
CheckboxTree.displayName = 'CheckboxTree';
CheckboxTree.propTypes = {
  controls: controlsProp.isRequired,
  onChange: pt.func.isRequired,
};
