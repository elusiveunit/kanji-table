import React from 'react';
import pt from 'prop-types';

export default function Button(props) {
  const className = props.variant ? `btn-${props.variant}` : undefined;

  return (
    <button type={props.type} className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
Button.displayName = 'Button';
Button.propTypes = {
  children: pt.node.isRequired,
  onClick: pt.func.isRequired,
  type: pt.oneOf(['button', 'submit', 'reset']),
  variant: pt.oneOf(['neutral']),
};
Button.defaultProps = {
  type: 'button',
  variant: undefined,
};
