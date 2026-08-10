import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: '4 Forms/Form Elements/Input',
  component: Input,
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
    id: 'input',
    name: 'input',
    label: 'Voornaam',
    placeholder: 'Voer uw voornaam in',
  },
};

export const HasError: Story = {
  args: {
    id: 'input',
    name: 'input',
    label: 'Voornaam',
    placeholder: 'Voer uw voornaam in',
    error: 'Dit veld is verplicht.',
    required: true,
  },
};
