import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import CarouselItem from '.';

const meta: Meta<typeof CarouselItem> = {
  title: '3 Components/Molecules/Carousel Item',
  component: CarouselItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'De leidingsgroep',
    slug: 'de-leidingsgroep',
    logo: imageStory.args!.data!,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
