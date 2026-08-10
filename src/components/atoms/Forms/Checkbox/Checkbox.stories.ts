import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: '4 Forms/Form Elements/Checkbox',
  component: Checkbox,
  argTypes: {
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'checkbox',
    label: 'Ik ga akkoord met [de algemene voorwaarden](/terms-and-conditions).',
  },
};

export const HasError: Story = {
  args: {
    id: 'checkbox',
    label: 'Ik ga akkoord met [de algemene voorwaarden](/terms-and-conditions).',
    error: 'Dit veld is verplicht.',
    required: true,
  },
};
