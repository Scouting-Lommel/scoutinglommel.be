import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as buttonStory } from '@/components/atoms/Button/Button.stories';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import FAQItem from '.';

const meta: Meta<typeof FAQItem> = {
  title: '3 Components/Molecules/FAQ Item',
  component: FAQItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    question: 'Zijn cornflakes een soort soep?',
    answer:
      'In traditionele termen is soep meestal een gerecht bestaande uit vlees of groenten in een bouillon of water, en het wordt vaak verwarmd. Cornflakes daarentegen worden meestal koud geserveerd met melk, dat is een zuivelproduct in plaats van een bouillon. Ondanks hun overeenkomsten van vloeibare gerechten geserveerd in kommen, is de algemene consensus dat cornflakes niet als soep worden beschouwd.',
    image: imageStory.args!.data!,
    callToAction: buttonStory.args,
  },
};
