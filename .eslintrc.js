module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:jsdoc/recommended',
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'jsdoc',
  ],
  'rules': {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'indent': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
  },
};
