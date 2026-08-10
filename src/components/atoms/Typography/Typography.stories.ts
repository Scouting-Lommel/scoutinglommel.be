import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from '.';

const meta: Meta<typeof Typography> = {
  title: '3 Components/Atoms/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: 'Do quis ullamco qui. Fugiat minim cupidatat veniam magna. Ad est nisi minim anim qui officia culpa et anim anim aliquip est aliquip labore consectetur.',
    modNoStyle: false,
    modPreWrap: false,
  },
};
