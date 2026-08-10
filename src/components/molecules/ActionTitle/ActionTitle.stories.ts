import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActionTitle from '.';

const meta: Meta<typeof ActionTitle> = {
  title: '3 Components/Molecules/Action Title',
  component: ActionTitle,
  argTypes: {
    tagName: {
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Activiteiten',
    tagName: 'h2',
    button: {
      label: 'Activiteit toevoegen',
    },
  },
};
