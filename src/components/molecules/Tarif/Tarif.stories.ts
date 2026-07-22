import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tarif from '.';

const meta: Meta<typeof Tarif> = {
  title: '3 Components/Molecules/Tarif',
  component: Tarif,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Erkende jeugdbeweging',
    example:
      'Ik kom met 40 personen voor 3 dagen.<br/>• _subtotaal_ = 3 dagen x 40 personen x 5,50 euro = 660 euro. <br/>• _subtotaal (= 660 euro)_ > _minimumprijs_ (= 165 euro) <br/>• **_totale prijs_ = __660 euro__**.',
    minimumPrice: 165,
    dayPrice: 5.5,
  },
};
