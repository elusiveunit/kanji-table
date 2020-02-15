import React from 'react';
import pt from 'prop-types';

import { MAX_SUFFIX, MIN_SUFFIX } from '../../constants';
import { classNames } from '../utils';
import TextField from './TextField';

export default function BetweenInput({
  className,
  id,
  label,
  leadingLabel,
  middleLabel,
  name,
  onMaxChange,
  onMinChange,
  valueMax,
  valueMin,
}) {
  // There are proper labels in the TextField component, the labels here are
  // just to make the text clickable.
  /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      className={classNames('between-input', className)}
    >
      <span id={`${id}-label`} className="between-input-label">
        {label}:
      </span>
      <label htmlFor={`${id}${MIN_SUFFIX}`} aria-hidden="true">
        <span className="between-input-label-text visuallyhidden">
          {leadingLabel}
        </span>
      </label>
      <TextField
        label={`Minimum ${label.toLowerCase()}`}
        hasVisibleLabel={false}
        id={`${id}${MIN_SUFFIX}`}
        name={`${name}${MIN_SUFFIX}`}
        value={valueMin}
        onChange={onMinChange}
        pattern="[0-9]*"
      />
      <label htmlFor={`${id}${MAX_SUFFIX}`} aria-hidden="true">
        <span className="between-input-label-text">{middleLabel}</span>
      </label>
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
BetweenInput.propTypes = {
  className: pt.string,
  id: pt.string.isRequired,
  label: pt.string.isRequired,
  leadingLabel: pt.string,
  middleLabel: pt.string,
  name: pt.string.isRequired,
  onMaxChange: pt.func.isRequired,
  onMinChange: pt.func.isRequired,
  valueMax: pt.oneOfType([pt.string, pt.number]).isRequired,
  valueMin: pt.oneOfType([pt.string, pt.number]).isRequired,
};
BetweenInput.defaultProps = {
  className: '',
  leadingLabel: 'From',
  middleLabel: 'to',
};
