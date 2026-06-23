import type { StorybookConfig } from '@storybook/nextjs';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/nextjs',
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
