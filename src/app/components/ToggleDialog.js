import React, { useEffect, useState, useRef } from 'react';
import pt from 'prop-types';

import Button from './Button';

export default function ToggleDialog(props) {
  const {
    buttonLabelClosed,
    buttonLabelOpened,
    buttonExtraProps,
    buttonText,
    children,
    className,
    name,
  } = props;
  const bodyId = `${name}-body`;
  const extraButtonClass = buttonExtraProps.className || '';

  const [isOpen, setOpen] = useState(false);
  const handleToggleClick = () => {
    setOpen(!isOpen);
  };

  // Close when clicking outside
  const containerEl = useRef({});
  useEffect(() => {
    function handleOutsideClick(e) {
      // Use callback form to get the current value, using the isOpen variable
      // would capture and keep the initial value due to the closure.
      setOpen((currentIsOpen) => {
        // Only run DOM operations when open
        if (currentIsOpen) {
          const root = containerEl.current;
          if (root && !root.contains(e.target)) {
            return false;
          }
        }
        return currentIsOpen;
      });
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={containerEl}
      className={`toggle-dialog toggle-dialog--${
        isOpen ? 'open' : 'closed'
      } js-only ${name} ${className}`.trim()}
    >
      <Button
        {...buttonExtraProps}
        className={`toggle-dialog-trigger ${extraButtonClass}`.trim()}
        onClick={handleToggleClick}
        aria-label={isOpen ? buttonLabelOpened : buttonLabelClosed}
        aria-expanded={String(isOpen)}
        aria-controls={bodyId}
      >
        {buttonText}
      </Button>
      <div className={`toggle-dialog-body ${name}-body`} id={bodyId}>
        {children}
      </div>
    </div>
  );
}
ToggleDialog.displayName = 'ToggleDialog';
ToggleDialog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  buttonExtraProps: pt.object,
  buttonLabelClosed: pt.string.isRequired,
  buttonLabelOpened: pt.string.isRequired,
  buttonText: pt.node.isRequired,
  children: pt.node.isRequired,
  className: pt.string,
  name: pt.string.isRequired,
};
ToggleDialog.defaultProps = {
  buttonExtraProps: {},
  className: '',
};
