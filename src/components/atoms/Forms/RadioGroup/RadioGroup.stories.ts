import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RadioGroup from '.';

const meta: Meta<typeof RadioGroup> = {
  title: '4 Forms/Form Elements/Radio',
  component: RadioGroup,
  argTypes: {
    required: {
      control: { type: 'boolean' },
      value: false,
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'gender',
    name: 'gender',
    label: 'Geslacht',
    radioButtons: [
      {
        id: 'm',
        name: 'gender',
        label: 'Man',
        value: 'm',
      },
      {
        id: 'v',
        name: 'gender',
        label: 'Vrouw',
        value: 'v',
      },
      {
        id: 'x',
        name: 'gender',
        label: 'Anders',
        value: 'x',
      },
    ],
    direction: 'row',
    register: () => {},
  },
};

export const HasError: Story = {
  args: {
    id: 'gender',
    name: 'gender',
    label: 'Gender',
    radioButtons: [
      {
        id: 'm',
        name: 'gender',
        label: 'Man',
        value: 'm',
      },
      {
        id: 'v',
        name: 'gender',
        label: 'Vrouw',
        value: 'v',
      },
      {
        id: 'x',
        name: 'gender',
        label: 'Anders',
        value: 'x',
      },
    ],
    direction: 'row',
    error: 'Dit veld is verplicht.',
    required: true,
    register: () => {},
  },
};
