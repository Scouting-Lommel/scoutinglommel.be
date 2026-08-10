import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Captcha from '.';

const meta: Meta<typeof Captcha> = {
  title: '4 Forms/Form Elements/Captcha',
  component: Captcha,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
