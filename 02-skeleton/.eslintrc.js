module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-restricted-globals': 'warn',
    'import/extensions': 'off',
    'max-len': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'warn',
    eqeqeq: 'off',
    radix: 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
