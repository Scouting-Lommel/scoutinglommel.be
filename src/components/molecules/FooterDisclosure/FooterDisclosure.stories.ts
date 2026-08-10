import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FooterDisclosure from '.';

const meta: Meta<typeof FooterDisclosure> = {
  title: '3 Components/Molecules/Footer Disclosure',
  component: FooterDisclosure,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    siteName: 'Scouting Sint-Pieter Lommel',
  },
};
