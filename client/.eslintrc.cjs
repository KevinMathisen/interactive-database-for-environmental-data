module.exports = {
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:standard/recommended',
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
    'jsdoc/check-alignment': 1, 
    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 1,
  },
  settings: {
    "svelte/ignore-styles": () => true,
  },
};