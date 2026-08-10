import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Attachment from '.';

const meta = {
  title: '3 Components/Molecules/Attachment',
  component: Attachment,
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const File: Story = {
  args: {
    variant: 'file',
    file: { id: '0', ext: '.png', url: 'randomurl.com', name: 'Image file attachment', size: 10 },
    modDeleteable: false,
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    link: {
      id: '1',
      label: 'scoutsengidsenvlaanderen.be',
      link: 'randomurl.com',
    },
    modDeleteable: false,
  },
};
