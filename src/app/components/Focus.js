import React from 'react';

const CLASS_NAME_HIDE = 'hide-focus';
const CLASS_NAME_SHOW = 'show-focus';
const SHOW_FOCUS_KEYS = [
  ' ',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'Enter',
  'Escape',
  'Space',
  'Spacebar',
  'Tab',
];

/**
 * Focus style toggling.
 *
 * Designer hates focus outlines, so add a body class name when the mouse is
 * clicked to enable hiding them. The class is removed again whenever a relevant
 * keyboard event is detected.
 */
export default class Focus extends React.Component {
  static displayName = 'Focus';

  isHidden = null;

  hasTouchAndMouse = true;

  target = document.documentElement;

  /**
   * Bind the events.
   *
   * Trying to use as few as possible while still including touch. Some desktop
   * browsers expose touch events even if they're unusable in practice, so both
   * touch and mouse must be bound simultaneously.
   *
   * Some screen readers and assistive technology for touchscreens fire mouse
   * events when activating elements, so it's not perfect.
   * In the screen reader case, hiding the outline hopefully shouldn't matter
   * too much, unless a sighted user uses it to read but not necessarily to
   * navigate. The outline will be visible again on the next Tab press in that
   * case.
   * The touchscreen case should, again 'hopefully', not require an outline if
   * actual tapping occurs.
   *
   * http://patrickhlauke.github.io/touch/tests/results/
   */
  componentDidMount() {
    if (window.PointerEvent) {
      this.target.addEventListener('pointerdown', this.handlePointer);
    } else {
      this.target.addEventListener('touchstart', this.handlePointer);
      this.target.addEventListener('mousedown', this.handlePointer);
    }

    this.target.addEventListener('keydown', this.handleKeyboard);
  }

  /**
   * Keydown event callback, show focus.
   *
   * @param {object} e Keydown event.
   */
  handleKeyboard = (e) => {
    if (this.isHidden === false) {
      return;
    }

    // Check for common control keys
    if (SHOW_FOCUS_KEYS.includes(e.key)) {
      this.showFocus();
    }
  };

  /**
   * Pointer start callback (mouse, pointer, touch...), hide focus.
   *
   * @param {object} e The event object.
   */
  handlePointer = (e) => {
    if (this.isHidden === true) {
      return;
    }

    // Remove mouse event if a touch is registered. This avoids duplicate
    // firing of the handler, since touch devices also fire mouse events for
    // compatibility.
    if (this.hasTouchAndMouse && e.type === 'touchstart') {
      this.target.removeEventListener('mousedown', this.handlePointer);
      this.hasTouchAndMouse = false;
    }

    this.hideFocus();
  };

  /**
   * Add the class for showing focus.
   */
  showFocus() {
    this.isHidden = false;
    // In case the hide is triggered at the same time for some reason, try to
    // let this run last.
    setTimeout(() => {
      this.target.classList.add(CLASS_NAME_SHOW);
      this.target.classList.remove(CLASS_NAME_HIDE);
    });
  }

  /**
   * Add the class for hiding focus.
   */
  hideFocus() {
    this.isHidden = true;
    this.target.classList.add(CLASS_NAME_HIDE);
    this.target.classList.remove(CLASS_NAME_SHOW);
  }

  render() {
    return null;
  }
}
