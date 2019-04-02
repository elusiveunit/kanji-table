import React from 'react';
import pt from 'prop-types';

export default function BetweenInput(props) {
  const { className, label, id, name, onMaxChange, onMinChange } = props;

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
      <label htmlFor={`${id}-min`}>
        <span className="visuallyhidden">Minimum {label.toLowerCase()}:</span>
        <input
          type="number"
          id={`${id}-min`}
          name={`${name}-min`}
          onChange={onMinChange}
        />
      </label>
      <span aria-hidden="true">and</span>
      <label htmlFor={`${id}-max`}>
        <span className="visuallyhidden">Maximum {label.toLowerCase()}:</span>
        <input
          type="number"
          id={`${id}-max`}
          name={`${name}-max`}
          onChange={onMaxChange}
        />
      </label>
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
};
BetweenInput.defaultProps = {
  className: '',
};
