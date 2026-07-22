import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  title: '3 Components/Atoms/Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    modSmall: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    label: 'Verwijderen',
    icon: 'trash',
    loading: false,
    modSmall: false,
  },
};
