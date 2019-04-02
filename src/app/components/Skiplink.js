import React from 'react';
import pt from 'prop-types';

const FOCUSABLE_ELEMENTS_REGEX = /^(?:a|select|input|button|textarea)$/;

export default class Skiplink extends React.Component {
  static displayName = 'Skiplink';

  static propTypes = {
    children: pt.node.isRequired,
    href: pt.string.isRequired,
    isHidden: pt.bool,
  };

  static defaultProps = {
    isHidden: false,
  };

  handleClick = (e) => {
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

  render() {
    return (
      <a
        href={this.props.href}
        className={
          this.props.isHidden
            ? 'visuallyhidden visuallyhidden--focusable skiplink'
            : undefined
        }
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}
