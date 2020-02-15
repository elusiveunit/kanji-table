import React from 'react';
import pt from 'prop-types';

const FOCUSABLE_ELEMENTS_REGEX = /^(?:a|select|input|button|textarea)$/;

export default function Skiplink({ href, isHidden, children }) {
  const handleClick = (e) => {
    const id = e.target.getAttribute('href').replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      if (
        !FOCUSABLE_ELEMENTS_REGEX.test(element.tagName) &&
        element.tabIndex !== 0
      ) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  };

  return (
    <a
      href={href}
      className={
        isHidden
          ? 'visuallyhidden visuallyhidden--focusable skiplink'
          : undefined
      }
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
Skiplink.propTypes = {
  children: pt.node.isRequired,
  href: pt.string.isRequired,
  isHidden: pt.bool,
};
Skiplink.defaultProps = {
  isHidden: false,
};
