import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Unauthorized from '.';

const meta: Meta<typeof Unauthorized> = {
  title: '3 Components/Organisms/Unauthorized',
  component: Unauthorized,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
