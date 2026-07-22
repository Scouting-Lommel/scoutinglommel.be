import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormField from '.';

const meta: Meta<typeof FormField> = {
  title: '4 Forms/Form Builder/Form Field',
  component: FormField,
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // @ts-ignore
  args: {
    type: 'email',
    id: 'email',
    name: 'email',
    label: 'Emailadres',
    placeholder: 'john.doe@example.com',
    required: true,
    register: () => {},
  },
};
