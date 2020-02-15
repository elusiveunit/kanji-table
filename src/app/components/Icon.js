import React from 'react';
import pt from 'prop-types';

const AVAILABLE_ICON_NAMES = [
  'chevron-down',
  'chevron-up',
  'column',
  'github',
  'palette',
  'sort',
];

export default function Icon({ name }) {
  return (
    <span
      className={`icon icon--${name}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    </span>
  );
}
Icon.propTypes = {
  name: pt.oneOf(AVAILABLE_ICON_NAMES).isRequired,
};
