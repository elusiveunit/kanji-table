import React, { useState, useEffect } from 'react';

import { getCookie, setCookie } from '../utils';
import Icon from './Icon';
import ToggleDialog from './ToggleDialog';

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

  useEffect(() => {
    const html = document.documentElement;
    html.className = html.className.replace(
      /\btheme-[a-z]+\b/,
      `theme-${theme}`,
    );
    setCookie(COOKIE_NAME, theme);
  }, [theme]);

  return (
    <ToggleDialog
      name="theme-switcher"
      buttonLabelClosed="Open theme switcher"
      buttonLabelOpened="Close theme switcher"
      buttonText={<Icon name="palette" />}
      buttonExtraProps={{
        variant: 'neutral',
        className: 'theme-switcher-toggle',
      }}
    >
      <fieldset className="theme-switcher-controls">
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
    </ToggleDialog>
  );
}
