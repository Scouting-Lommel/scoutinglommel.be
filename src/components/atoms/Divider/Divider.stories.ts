import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Divider from '.';

const meta: Meta<typeof Divider> = {
  title: '3 Components/Atoms/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};
