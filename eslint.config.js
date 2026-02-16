import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    ignores: [
      'dev/**',
      'dist/**',
      'coverage/**',
    ],
  },
  js.configs.recommended, {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 2026,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        'build': false,
      },
    },
    rules: {
      'no-invalid-this': [
        'error',
      ],
      'strict': [
        'error',
      ],
      '@stylistic/array-bracket-spacing': [
        'error',
      ],
      '@stylistic/arrow-spacing': [
        'error',
      ],
      '@stylistic/comma-dangle': [
        'error',
        'always-multiline',
      ],
      '@stylistic/comma-spacing': [
        'error', {
          'before': false,
          'after': true,
        },
      ],
      '@stylistic/computed-property-spacing': [
        'error',
      ],
      '@stylistic/function-call-spacing': [
        'error',
        'never',
      ],
      '@stylistic/indent': [
        'error',
        2, {
          'SwitchCase': 1,
        },
      ],
      '@stylistic/key-spacing': [
        'error',
      ],
      '@stylistic/keyword-spacing': [
        'error',
      ],
      '@stylistic/lines-around-comment': [
        'error', {
          'beforeBlockComment': true,
        },
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix',
      ],
      '@stylistic/no-multi-spaces': [
        'error',
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error', {
          'max': 1,
        },
      ],
      '@stylistic/no-trailing-spaces': [
        'error',
      ],
      '@stylistic/no-whitespace-before-property': [
        'error',
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
      ],
      '@stylistic/object-property-newline': [
        'error',
      ],
      '@stylistic/quotes': [
        'error',
        'single',
      ],
      '@stylistic/rest-spread-spacing': [
        'error',
      ],
      '@stylistic/semi': [
        'error',
        'always',
      ],
      '@stylistic/semi-spacing': [
        'error',
      ],
      '@stylistic/space-before-blocks': [
        'error',
      ],
      '@stylistic/space-before-function-paren': [
        'error', {
          'anonymous': 'always',
          'asyncArrow': 'always',
          'named': 'never',
        },
      ],
      '@stylistic/space-in-parens': [
        'error',
      ],
      '@stylistic/space-infix-ops': [
        'error',
      ],
      '@stylistic/space-unary-ops': [
        'error',
      ],
      '@stylistic/spaced-comment': [
        'error',
        'always', {
          'block': {
            'balanced': true,
          },
        },
      ],
      '@stylistic/template-curly-spacing': [
        'error',
      ],
    },
  },
];
