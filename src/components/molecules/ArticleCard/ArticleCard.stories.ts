import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ArticleCard from '.';

const meta: Meta<typeof ArticleCard> = {
  title: '3 Components/Molecules/Article Card',
  component: ArticleCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Scouting Lommel mail',
    description:
      'Je Scouting Lommel emailadres (voornaam.familienaam@scoutinglommel.be) toevoegen aan je e-mail app op je smartphone of laptop/PC. [iOS, Android, Windows, MacOS]',
    updatedAt: '2021-09-01',
    slug: 'scouting-lommel-mail',
    locked: false,
  },
};

export const Locked: Story = {
  args: {
    title: 'Scouting Lommel mail',
    description:
      'Je Scouting Lommel emailadres (voornaam.familienaam@scoutinglommel.be) toevoegen aan je e-mail app op je smartphone of laptop/PC. [iOS, Android, Windows, MacOS]',
    updatedAt: '2021-09-01',
    slug: 'scouting-lommel-mail',
    locked: true,
  },
};
