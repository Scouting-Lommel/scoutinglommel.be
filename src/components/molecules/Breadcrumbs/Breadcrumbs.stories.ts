import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: '3 Components/Molecules/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Homepagina',
        href: '/',
      },
      {
        label: 'Handleidingen',
        href: '/handleidingen',
      },
      {
        label: 'Inloggen op de website',
      },
    ],
  },
};
