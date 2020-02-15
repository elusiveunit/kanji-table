import React from 'react';
import pt from 'prop-types';

import { usePrerenderFlag } from '../utils';

export default function Button({
  className,
  children,
  disabled,
  onClick,
  type,
  variant,
  ...passProps
}) {
  const cls = ((className || '') + (variant ? ` btn-${variant}` : '')).trim();
  const isPrerendering = usePrerenderFlag();

  return (
    <button
      {...passProps}
      type={type}
      className={cls || undefined}
      onClick={onClick}
      disabled={disabled || isPrerendering}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: pt.node.isRequired,
  className: pt.string,
  disabled: pt.bool,
  onClick: pt.func,
  type: pt.oneOf(['button', 'submit', 'reset']),
  variant: pt.oneOf(['secondary', 'neutral']),
};
Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: undefined,
  type: 'button',
  variant: undefined,
};
