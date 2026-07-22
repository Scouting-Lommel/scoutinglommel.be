import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FooterHead from '.';

const meta: Meta<typeof FooterHead> = {
  title: '3 Components/Molecules/Footer Head',
  component: FooterHead,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    siteName: 'Scouting Sint-Pieter Lommel',
    vatNumber: 'BE 0410.966.531',
    groupNumber: 'L1205G',
  },
};
