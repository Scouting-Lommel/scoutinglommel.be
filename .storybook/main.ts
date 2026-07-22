import type { StorybookConfig } from '@storybook/nextjs-vite';

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  docs: {},

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  managerHead: (head) => `
    ${head}
    ${'<meta name="robots" content="noindex nofollow">'}
  `,
};
export default config;
