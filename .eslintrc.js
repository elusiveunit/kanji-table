const OFF = 0;
const WARN = 1;
const ERR = 2;

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
  },
  plugins: ['react-hooks'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    // Consistent use of arrow function parens
    'arrow-parens': [ERR, 'always'],

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

    // Match max line length with Prettier
    'max-len': [
      ERR,
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],

    // Airbnb doesn't seen to have this.
    'operator-linebreak': [
      ERR,
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],

    // Disable destructuring rule for arrays
    'prefer-destructuring': [
      ERR,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: true,
        },
      },
    ],

    // Silly to force when not needed.
    'react/destructuring-assignment': OFF,

    // Keep the same extension everywhere.
    'react/jsx-filename-extension': OFF,

    // Require component display name.
    'react/display-name': [WARN, { ignoreTranspilerName: true }],

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

    'react-hooks/rules-of-hooks': ERR,
  },
};
