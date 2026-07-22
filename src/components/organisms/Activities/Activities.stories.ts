import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Activities from '.';

const meta: Meta<typeof Activities> = {
  title: '3 Components/Organisms/Activities',
  component: Activities,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialItems: 3,
    groupSlug: 'akabe',
  },
};
