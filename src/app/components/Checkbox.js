import React, { useEffect, useRef } from 'react';
import pt from 'prop-types';

export default function Checkbox({
  checked,
  indeterminate,
  label,
  name,
  onChange,
  ...passProps
}) {
  const inputEl = useRef(null);

  useEffect(() => {
    const el = inputEl.current;
    if (indeterminate) {
      el.indeterminate = true;
      el.checked = false;
    } else {
      el.indeterminate = false;
      el.checked = checked;
    }
  }, [checked, indeterminate]);

  return (
    <label htmlFor={`${name}-input`}>
      <input
        {...passProps}
        ref={inputEl}
        type="checkbox"
        id={`${name}-input`}
        name={name}
        value="1"
        checked={Boolean(checked)}
        onChange={onChange}
      />
      <span className="text">{label}</span>
    </label>
  );
}
Checkbox.propTypes = {
  checked: pt.bool,
  indeterminate: pt.bool,
  label: pt.string.isRequired,
  name: pt.string.isRequired,
  onChange: pt.func.isRequired,
};
Checkbox.defaultProps = {
  checked: false,
  indeterminate: false,
};
