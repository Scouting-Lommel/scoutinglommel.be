import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NotFound from '.';

const meta: Meta<typeof NotFound> = {
  title: '3 Components/Organisms/Not Found',
  component: NotFound,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
