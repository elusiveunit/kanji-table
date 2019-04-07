import React, { useState, useEffect } from 'react';

import { getCookie, setCookie } from '../utils';
import Button from './Button';
import Icon from './Icon';

const THEMES = [
  { name: 'light', label: 'Light' },
  { name: 'tan', label: 'Tan' },
  { name: 'dark', label: 'Dark' },
];

const COOKIE_NAME = 'theme';
const cookieValue = getCookie(COOKIE_NAME) || 'light';

export default function ThemeSwitcher() {
  // Nesting won't allow styling the label as active
  /* eslint-disable jsx-a11y/label-has-for */

  const [theme, setTheme] = useState(cookieValue);
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const [isOpen, setOpen] = useState(false);
  const handleToggleClick = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.className = html.className.replace(
      /\btheme-[a-z]+\b/,
      `theme-${theme}`,
    );
    setCookie(COOKIE_NAME, theme);
  }, [theme]);

  return (
    <div
      className={`theme-switcher theme-switcher--${isOpen ? 'open' : 'closed'}`}
    >
      <Button
        variant="neutral"
        className="theme-switcher-toggle"
        onClick={handleToggleClick}
        aria-label={isOpen ? 'Close theme switcher' : 'Open theme switcher'}
        aria-expanded={String(isOpen)}
        aria-controls="theme-switcher-body"
      >
        <Icon name="palette" />
      </Button>
      <fieldset className="theme-switcher-body" id="theme-switcher-body">
        <legend>Theme</legend>
        <div className="theme-switcher-items">
          {THEMES.map(({ name, label }) => {
            const id = `theme-switcher-item-${name}`;
            const labelId = `theme-switcher-item-${name}-label`;

            return (
              <React.Fragment key={name}>
                <input
                  type="radio"
                  name="theme-switcher-item"
                  id={id}
                  value={name}
                  checked={name === theme}
                  onChange={handleThemeChange}
                />
                <label
                  className={`theme-switcher-item theme-switcher-item--${name}`}
                  htmlFor={id}
                  id={labelId}
                >
                  <span className="theme-switcher-item-label">{label}</span>
                </label>
              </React.Fragment>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
ThemeSwitcher.displayName = 'ThemeSwitcher';
