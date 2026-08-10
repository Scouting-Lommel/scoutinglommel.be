import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Select from '.';

const meta: Meta<typeof Select> = {
  title: '4 Forms/Form Elements/Select',
  component: Select,
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
    id: 'group',
    name: 'group',
    label: 'Tak',
    options: [
      { value: 'kapoenen', label: 'Kapoenen' },
      { value: 'welpen', label: 'Welpen' },
      { value: 'akabe', label: 'Akabe' },
      { value: 'jonggivers', label: 'Jonggivers' },
      { value: 'givers', label: 'Givers' },
      { value: 'jin', label: 'Jin' },
      { value: 'leiding', label: 'Leiding' },
    ],
  },
};

export const HasError: Story = {
  args: {
    id: 'group',
    name: 'group',
    label: 'Tak',
    options: [
      { value: 'kapoenen', label: 'Kapoenen' },
      { value: 'welpen', label: 'Welpen' },
      { value: 'akabe', label: 'Akabe' },
      { value: 'jonggivers', label: 'Jonggivers' },
      { value: 'givers', label: 'Givers' },
      { value: 'jin', label: 'Jin' },
      { value: 'leiding', label: 'Leiding' },
    ],
    error: 'Dit veld is verplicht.',
    required: true,
  },
};
