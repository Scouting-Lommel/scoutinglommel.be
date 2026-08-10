import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: '4 Forms/Form Elements/TextArea',
  component: TextArea,
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
    id: 'comments',
    name: 'comments',
    label: 'Opmerkingen',
  },
};

export const HasError: Story = {
  args: {
    id: 'comments',
    name: 'comments',
    label: 'Opmerkingen',
    error: 'Dit veld is verplicht.',
    required: true,
  },
};
