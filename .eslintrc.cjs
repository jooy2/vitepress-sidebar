module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2022
  },
  env: {
    node: true,
    es6: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb/base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'arrow-parens': 0,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0
  },
  overrides: [
    {
      files: ['test/*.spec.ts'],
      rules: {
        'import/extensions': 0,
        'no-undef': 0
      }
    }
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    },
    'import/resolver': {
      node: {
        paths: ['lib'],
        extensions: ['.js', '.ts']
      }
    }
  }
};
