import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FileSection from '.';

const meta: Meta<typeof FileSection> = {
  title: '3 Components/Organisms/File Section',
  component: FileSection,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Links en bestanden',
    groupSlug: 'akabe',
  },
};
