module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // '@typescript-eslint/consistent-type-imports': 'ignore'
    'import/extensions': false,
    'import/no-unresolved': false
  }
};
