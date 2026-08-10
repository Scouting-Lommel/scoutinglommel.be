import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const [baseConfig, ...restConfigs] = compat.extends(
  'eslint-config-next',
  'eslint-config-next/core-web-vitals',
  'plugin:prettier/recommended',
);

const config = [
  {
    ignores: ['.next/**', 'out/**', 'storybook-static/**'],
  },
  {
    ...baseConfig,

    settings: {
      ...baseConfig.settings,

      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },

      next: {
        rootDir: '.',
        pagesDirectory: 'src/app',
      },
    },

    rules: {
      ...baseConfig.rules,
    },
  },
  ...restConfigs,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-typos': 'off',
      '@next/next/no-before-interactive-script-outside-document': 'off',
      '@next/next/no-styled-jsx-in-document': 'off',

      'jsx-a11y/alt-text': [
        2,
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          object: ['Object'],
          area: ['Area'],
          'input[type="image"]': ['InputImage'],
        },
      ],

      'prettier/prettier': 'warn',

      'import/order': [
        'error',
        {
          groups: ['external', 'internal', ['parent', 'sibling']],

          pathGroups: [
            {
              pattern: '@/i18n/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/types/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/atoms/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/molecules/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/organisms/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/content-blocks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './types',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: './**/*.{css,pcss}',
              group: 'sibling',
              position: 'after',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
];

export default config;
