import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GlobalAlert from '.';

const meta: Meta<typeof GlobalAlert> = {
  title: '3 Components/Atoms/Global Alert',
  component: GlobalAlert,
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
    variant: 'info',
    label: 'De status van je inschrijving is gewijzigd.',
  },
};
