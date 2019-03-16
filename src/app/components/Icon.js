import React from 'react';
import pt from 'prop-types';

const AVAILABLE_ICON_NAMES = ['chevron-down', 'chevron-up', 'sort'];

export default function Icon(props) {
  return (
    <span
      className={`icon icon--${props.name}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`#icon-${props.name}`} />
      </svg>
    </span>
  );
}
Icon.displayName = 'Icon';
Icon.propTypes = {
  name: pt.oneOf(AVAILABLE_ICON_NAMES).isRequired,
};
