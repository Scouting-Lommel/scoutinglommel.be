import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSX } from 'react';
import NavItem from '.';

const meta: Meta<typeof NavItem> = {
  title: '3 Components/Molecules/Nav Item',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemKey: 1,
    label: 'Verhuur',
    href: 'verhuur',
    dropdownTitle: 'Verhuur',
    dropdownButton: {
      label: 'Ontdek alle locaties',
      href: '/verhuur',
      variant: 'primary',
    },
    dropdownCta: {
      title: 'Onze lokalen',
      intro:
        'Scouting Lommel is een grote scoutsgroep in het hartje van Lommel. Elke zaterdag staan we paraat aan onze lokalen in de Nieuwe Kopen, vlakbij de prachtige Lommelse Sahara midden in Bosland. ',
      ctaLink: '/verhuur',
      ctaLabel: 'Ontdek de lokalen',
    },
    dropdownItems: [
      {
        label: 'Lokaal en speelweide',
        page: 'lokaal_en_speelweide',
        link: '/verhuur/lokaal-en-speelweide',
      },
      {
        label: 'Tentenweide',
        page: 'tentenweide',
        link: '/verhuur/tentenweide',
      },
    ],
    groups: [],
    rentalLocations: [
      {
        name: 'Lokaal en speelweide',
        description: 'Scoutsheem met ruime speelweide',
        slug: 'lokaal-en-speelweide',
      },
      {
        name: 'Tentenweide',
        description: 'Grote tentenweide met voorzieningen',
        slug: 'tentenweide',
      },
    ],
    modDropdown: true,
    modButton: false,
    onClick: () => {},
  },
  decorators: [
    (Story: () => JSX.Element): JSX.Element => (
      <div style={{ listStyleType: 'none', paddingLeft: 0, width: '12rem' }}>
        <Story />
      </div>
    ),
  ],
};
