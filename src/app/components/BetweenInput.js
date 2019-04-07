import React from 'react';
import pt from 'prop-types';

import { MAX_SUFFIX, MIN_SUFFIX } from '../../constants';
import TextField from './TextField';

export default function BetweenInput(props) {
  const {
    className,
    label,
    id,
    name,
    onMaxChange,
    onMinChange,
    valueMax,
    valueMin,
  } = props;

  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      className={`between-input ${className}`.trim()}
    >
      <span id={`${id}-label`} className="between-input-label">
        {label}:
      </span>
      <span aria-hidden="true">Between</span>
      <TextField
        label={`Minimum ${label.toLowerCase()}`}
        hasVisibleLabel={false}
        id={`${id}${MIN_SUFFIX}`}
        name={`${name}${MIN_SUFFIX}`}
        value={valueMin}
        onChange={onMinChange}
        pattern="[0-9]*"
      />
      <span aria-hidden="true">and</span>
      <TextField
        label={`Maximum ${label.toLowerCase()}`}
        hasVisibleLabel={false}
        id={`${id}${MAX_SUFFIX}`}
        name={`${name}${MAX_SUFFIX}`}
        value={valueMax}
        onChange={onMaxChange}
        pattern="[0-9]*"
      />
    </div>
  );
}
BetweenInput.displayName = 'BetweenInput';
BetweenInput.propTypes = {
  className: pt.string,
  label: pt.string.isRequired,
  id: pt.string.isRequired,
  name: pt.string.isRequired,
  onMaxChange: pt.func.isRequired,
  onMinChange: pt.func.isRequired,
  valueMax: pt.oneOfType([pt.string, pt.number]).isRequired,
  valueMin: pt.oneOfType([pt.string, pt.number]).isRequired,
};
BetweenInput.defaultProps = {
  className: '',
};
