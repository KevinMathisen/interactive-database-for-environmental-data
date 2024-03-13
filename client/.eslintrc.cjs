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
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
  settings: {
    "svelte/ignore-styles": () => true,
  },
};