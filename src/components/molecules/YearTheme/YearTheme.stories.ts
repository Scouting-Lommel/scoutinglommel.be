import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import YearTheme from '.';

const meta: Meta<typeof YearTheme> = {
  title: '3 Components/Molecules/Year Theme',
  component: YearTheme,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Das goesting!',
    description:
      'Met het jaarthema DAS Goesting kiezen we ervoor om stil te staan bij de drijvende kracht achter scouting en achter ons eigen engagement. Wat motiveert ons? Waarom ga ik naar de scouts? Waarom blijf ik naar de scouts gaan? Door hierover na te denken en dit bespreekbaar te maken geven we een boost aan onze motivatie. ',
    image: {
      name: 'DAS Goesting JPG website.jpg',
      width: 709,
      height: 1342,
      url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1676274527/DAS_Goesting_JPG_website_fde3a9c757.jpg',
      hash: 'DAS_Goesting_JPG_website_fde3a9c757',
    },
  },
};
