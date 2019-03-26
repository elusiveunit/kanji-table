import React from 'react';
import pt from 'prop-types';

export default function Button(props) {
  const { className, children, onClick, type, variant, ...passProps } = props;
  const cls = ((className || '') + (variant ? ` btn-${variant}` : '')).trim();

  return (
    <button {...passProps} type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
Button.displayName = 'Button';
Button.propTypes = {
  children: pt.node.isRequired,
  className: pt.string,
  onClick: pt.func.isRequired,
  type: pt.oneOf(['button', 'submit', 'reset']),
  variant: pt.oneOf(['neutral']),
};
Button.defaultProps = {
  className: '',
  type: 'button',
  variant: undefined,
};
