import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Link from './Link';

const meta = {
  title: '3 Components/Molecules/Attachment/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: '1',
    label: 'scoutsengidsenvlaanderen.be',
    link: 'https://scoutsengidsenvlaanderen.be',
    modDeleteable: false,
  },
} satisfies Story;
