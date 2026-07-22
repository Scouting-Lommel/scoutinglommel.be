import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import Gallery from '.';

const meta: Meta<typeof Gallery> = {
  title: '3 Components/Organisms/Gallery',
  component: Gallery,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Fotogalerij',
    initialItems: 3,
    images: [
      imageStory.args!.data!,
      imageStory.args!.data!,
      imageStory.args!.data!,
      imageStory.args!.data!,
      imageStory.args!.data!,
      imageStory.args!.data!,
    ],
  },
};
