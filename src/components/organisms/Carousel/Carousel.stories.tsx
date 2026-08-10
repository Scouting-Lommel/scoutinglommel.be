import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import Carousel from '.';

const meta: Meta<typeof Carousel> = {
  title: '3 Components/Organisms/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    carouselItems: [
      {
        logo: imageStory.args!.data!,
        name: 'Kapoenen',
        slug: 'kapoenen',
      },
      {
        logo: imageStory.args!.data!,
        name: 'Welpen',
        slug: 'welpen',
      },
      {
        logo: imageStory.args!.data!,
        name: 'Akabe',
        slug: 'akabe',
      },
      {
        logo: imageStory.args!.data!,
        name: 'Jonggivers',
        slug: 'jonggivers',
      },
      {
        logo: imageStory.args!.data!,
        name: 'Givers',
        slug: 'givers',
      },
      {
        logo: imageStory.args!.data!,
        name: 'Jin',
        slug: 'jin',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#4d6e5a' }}>
        <Story />
      </div>
    ),
  ],
};
