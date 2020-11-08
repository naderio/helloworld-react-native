/* eslint-disable no-undef, global-require, import/no-extraneous-dependencies */

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'airbnb', 'plugin:react-native/all', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', 'react-native'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es2020: true,
    'react-native/react-native': true,
  },
  globals: {
    globalThis: 'readonly',
    Request: 'readonly',
    Response: 'readonly',
  },
  rules: {
    'max-len': ['warn', { code: 120 }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js'] }],
    'arrow-parens': ['warn', 'always'],
    'arrow-body-style': 'off',
    camelcase: 'warn',
    'no-underscore-dangle': 'warn',
    'no-param-reassign': 'warn',
    'no-unused-vars': 'warn',
    'class-methods-use-this': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'no-shadow': 'warn',
    'no-empty': 'warn',
    'no-restricted-syntax': require('eslint-config-airbnb-base/rules/style').rules['no-restricted-syntax'].filter(
      (item) => typeof item !== 'object' || item.selector !== 'ForOfStatement',
    ),
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/state-in-constructor': ['error', 'never'],
    'react/jsx-fragments': ['error', 'element'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-raw-text': ['error', { skip: ['Title', 'Label'] }],
    'react-native/sort-styles': 'off',
    'react-native/split-platform-components': 'warn',
    'react-native/no-color-literals': 'warn',
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/sample-*/*'],
      rules: {
        'import/no-unresolved': 'warn',
      },
    },
  ],
};
