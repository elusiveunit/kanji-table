import React from 'react';
import pt from 'prop-types';

export default function Select(props) {
  const {
    className,
    emptyOptionLabel,
    label,
    id,
    name,
    onChange,
    options,
    value,
  } = props;

  return (
    // Doesn't understand the ID for some reason.
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={id} className={className}>
      <span className="text">{label}:</span>
      <select id={id} name={name} onChange={onChange} value={value}>
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
  emptyOptionLabel: '',
};