import React from 'react';
import pt from 'prop-types';

import { usePrerenderFlag } from '../utils';

const NEWLINE_REGEX = /\r\n|\r|\n/g;
// Scientifically deduced from pasting kanji and counting. It's not critical in
// any way so it doesn't matter.
const KANJI_LINE_LENGTH = 48;
const CHUNK_REGEX = new RegExp(`.{1,${KANJI_LINE_LENGTH}}`, 'g');

export default function TextField({
  autoHeight,
  className,
  disabled,
  fieldClassName,
  hasVisibleLabel,
  id,
  label,
  name,
  onChange,
  type,
  value,
  ...passProps
}) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  const typeProp = isTextarea ? undefined : type;
  const isPrerendering = usePrerenderFlag();

  let rows;
  if (autoHeight && isTextarea) {
    rows = 1;
    if (value) {
      const newlines = (value.match(NEWLINE_REGEX) || '').length;
      const lines = (value.match(CHUNK_REGEX) || '').length;
      rows = Math.min(Math.max(newlines, lines, 1), 6);
    }
  }

  return (
    // Doesn't understand the custom component.
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={id} className={className}>
      <span className={hasVisibleLabel ? 'text' : 'visuallyhidden'}>
        {label}:
      </span>
      <Component
        {...passProps}
        type={typeProp}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={fieldClassName}
        rows={rows}
        disabled={disabled || isPrerendering}
      />
    </label>
  );
}
TextField.propTypes = {
  autoHeight: pt.bool,
  className: pt.string,
  disabled: pt.bool,
  fieldClassName: pt.string,
  label: pt.string.isRequired,
  id: pt.string.isRequired,
  hasVisibleLabel: pt.bool,
  name: pt.string.isRequired,
  onChange: pt.func.isRequired,
  type: pt.oneOf(['text', 'textarea']),
  value: pt.oneOfType([pt.string, pt.number]).isRequired,
};
TextField.defaultProps = {
  autoHeight: false,
  className: undefined,
  disabled: false,
  fieldClassName: undefined,
  hasVisibleLabel: true,
  type: 'text',
};
