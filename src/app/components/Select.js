import React from 'react';
import pt from 'prop-types';

import { usePrerenderFlag } from '../utils';

export default function Select(props) {
  const {
    className,
    disabled,
    emptyOptionLabel,
    label,
    id,
    name,
    onChange,
    options,
    value,
  } = props;
  const isPrerendering = usePrerenderFlag();

  return (
    // Doesn't understand the ID for some reason.
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={id} className={className}>
      <span className="text">{label}:</span>
      <select
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled || isPrerendering}
      >
        {Boolean(emptyOptionLabel) && (
          <option value="">{emptyOptionLabel}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
Select.displayName = 'Select';
Select.propTypes = {
  className: pt.string,
  disabled: pt.bool,
  label: pt.string.isRequired,
  id: pt.string.isRequired,
  name: pt.string.isRequired,
  onChange: pt.func.isRequired,
  emptyOptionLabel: pt.string,
  options: pt.arrayOf(
    pt.shape({
      disabled: pt.bool,
      label: pt.oneOfType([pt.string, pt.number]).isRequired,
      value: pt.oneOfType([pt.string, pt.number]).isRequired,
    }),
  ).isRequired,
  value: pt.oneOfType([pt.string, pt.number]).isRequired,
};
Select.defaultProps = {
  className: undefined,
  disabled: false,
  emptyOptionLabel: '',
};
