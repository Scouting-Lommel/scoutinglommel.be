import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ArticleGrid from '.';

const meta: Meta<typeof ArticleGrid> = {
  title: '3 Components/Organisms/Article Grid',
  component: ArticleGrid,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        title: 'Takpagina beheren',
        description:
          'Een activiteit of bijlage aan de pagina van je tak toevoegen via het dashboard.',
        updatedAt: '2021-09-01',
        slug: 'scouting-lommel-mail',
        locked: false,
        loginCallbackUrl: '#',
      },
      {
        title: 'Scouting Lommel mail',
        description:
          'Je Scouting Lommel emailadres (voornaam.familienaam@scoutinglommel.be) toevoegen aan je e-mail app op je smartphone of laptop/PC. [iOS, Android, Windows, MacOS]',
        updatedAt: '2021-09-01',
        slug: 'scouting-lommel-mail',
        locked: true,
        loginCallbackUrl: '#',
      },
    ],
  },
};
