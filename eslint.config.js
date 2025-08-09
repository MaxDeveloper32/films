const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');

module.exports = tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettierConfig,
      reactPlugin.configs.recommended,
      reactPlugin.configs.jsxRuntime,
      {
        plugins: {
          'prettier': prettierPlugin,
          'react': reactPlugin,
          'react-hooks': reactHooksPlugin,
          'react-refresh': reactRefreshPlugin,
        },
      },
      {
        rules: {
          quotes: ['error', 'single'],
          semi: ['error', 'always'],
          indent: ['error', 2, { SwitchCase: 1 }],
          'no-multiple-empty-lines': ['error', { max: 1 }],

          'react/jsx-uses-react': 'error',
          'react/jsx-uses-vars': 'error',
          'react/react-in-jsx-scope': 'off',
          'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
          'react/jsx-indent': ['error', 2],
          'react/jsx-indent-props': ['error', 2],
          'react/jsx-props-no-spreading': 'off',
          'react/prop-types': 'off',


          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'warn',

          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
          ],
        },
      },
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
         project: './tsconfig.json'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  }
);
