import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import Leaders from '.';

const meta: Meta<typeof Leaders> = {
  title: '3 Components/Organisms/Leaders',
  component: Leaders,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leaders: [
      {
        firstName: 'Akela',
        lastName: '',
        image: imageStory.args!.data!,
      },
      {
        firstName: 'Rikki Tikki',
        lastName: 'Tavi',
        image: imageStory.args!.data!,
      },
      {
        firstName: 'De',
        lastName: 'Roy',
      },
    ],
  },
};
