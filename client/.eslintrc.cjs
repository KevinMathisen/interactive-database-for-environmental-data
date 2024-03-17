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
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:jsdoc/recommended',
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
    'jsdoc/check-alignment': 'warn', 
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-indentation': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
  },
  settings: {
    "svelte/ignore-styles": () => true,
  },
};