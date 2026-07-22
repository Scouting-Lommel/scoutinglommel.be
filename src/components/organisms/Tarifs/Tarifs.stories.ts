import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tarifs from '.';

const meta: Meta<typeof Tarifs> = {
  title: '3 Components/Organisms/Tarifs',
  component: Tarifs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tarifs: [
      {
        name: 'Erkende jeugdbeweging',
        example:
          'Ik kom met 40 personen voor 3 dagen.<br/>• _subtotaal_ = 3 dagen x 40 personen x 5,50 euro = 660 euro. <br/>• _subtotaal (= 660 euro)_ > _minimumprijs (= 165 euro)_ <br/>• **_totale prijs_ = __660 euro__**.',
        minimumPrice: 165,
        dayPrice: 5.5,
      },
      {
        name: 'Andere groepen',
        example:
          'Ik kom met 12 personen voor 2 dagen.<br/>• _subtotaal_ = 2 dagen x 12 personen x 6,50 euro = 156 euro. <br/>• _subtotaal (= 156 euro)_ < _minimumprijs (= 195 euro)_ <br/>• **_totale prijs_ = __195 euro__**.',
        minimumPrice: 195,
        dayPrice: 6.5,
      },
    ],
    cta: {
      title: '',
      intro:
        'Meer info nodig of wil je je verblijf vastleggen? [Neem contact op met de huurverantwoordelijke](mailto:verhuur@scoutinglommel.be).',
    },
  },
};
