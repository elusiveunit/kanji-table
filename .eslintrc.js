const OFF = 0;
const WARN = 1;
const ERR = 2;

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    // Doesn't handle some cases
    'function-paren-newline': OFF,
    'object-curly-newline': OFF,
    'implicit-arrow-linebreak': OFF,

    // Allow devDependencies in tests, scripts and config files
    'import/no-extraneous-dependencies': [
      ERR,
      {
        devDependencies: [
          '**/__tests__/*.js',
          '**/scripts/*.js',
          '**/*.config.js',
        ],
        optionalDependencies: false,
      },
    ],

    // Keep the same extension everywhere.
    'react/jsx-filename-extension': OFF,

    // Allow spreading props.
    'react/jsx-props-no-spreading': OFF,

    // Doesn't understand default props.
    'react/button-has-type': OFF,

    // Event handler naming convention.
    'react/jsx-handler-names': [
      WARN,
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],

    // Validate JSX has key prop when in array or iterator
    'react/jsx-key': ERR,

    // Causes weird formatting for text.
    'react/jsx-one-expression-per-line': OFF,

    // Prevent direct mutation of this.state
    'react/no-direct-mutation-state': ERR,
  },
};
