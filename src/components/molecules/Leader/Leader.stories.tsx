import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSX } from 'react';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import Leader from '.';

const meta: Meta<typeof Leader> = {
  title: '3 Components/Molecules/Leader',
  component: Leader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstName: 'Rikki Tikki',
    lastName: 'Tavi',
    image: imageStory.args!.data!,
  },
  decorators: [
    (Story: () => JSX.Element): JSX.Element => (
      <div style={{ width: '11.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutImage: Story = {
  args: {
    firstName: 'De',
    lastName: 'Roy',
  },
  decorators: [
    (Story: () => JSX.Element): JSX.Element => (
      <div style={{ width: '11.5rem' }}>
        <Story />
      </div>
    ),
  ],
};
