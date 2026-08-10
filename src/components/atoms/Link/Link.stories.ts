import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Link from '.';

const meta: Meta<typeof Link> = {
  title: '3 Components/Atoms/Link',
  component: Link,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['link1', 'link2'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Scouts en Gidsen Vlaanderen',
    href: 'https://scoutsengidsenvlaanderen.be',
    variant: 'link1',
  },
};
