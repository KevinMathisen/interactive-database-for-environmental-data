const standard = require('eslint-config-standard');

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:jsdoc/recommended',
  ],
  plugins: [
    'svelte',
    'jsdoc',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte/svelte',
    },
  ],
  rules: {
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/check-alignment': 'warn', 
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-indentation': 'warn',
    'quotes': ['error', 'single'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
  },
  settings: {
    "svelte/ignore-styles": () => true,
  },
};