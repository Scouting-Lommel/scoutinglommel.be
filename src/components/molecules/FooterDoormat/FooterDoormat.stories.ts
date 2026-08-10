import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FooterDoormat from '.';

const meta: Meta<typeof FooterDoormat> = {
  title: '3 Components/Molecules/Footer Doormat',
  component: FooterDoormat,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    address: 'Nieuwe Kopen 4\n3920 Lommel\nBelgië',
    contactItems: [
      {
        label: 'info@scoutinglommel.be',
        link: 'mailto:info@scoutinglommel.be',
      },
      {
        label: 'Facebook Messenger',
        link: 'https://www.facebook.com/ScoutingLommel/',
      },
    ],
    footerNavigation: [
      {
        title: 'Sitemap',
        navItems: [
          {
            label: 'Onze takken',
            link: '/takken',
          },
          {
            label: 'Lokaalverhuur',
            link: '/verhuur',
          },
          {
            label: 'FAQ',
            link: '/algemene-informatie#veelgestelde-vragen',
          },
          {
            label: 'Contact',
            link: '/contact',
          },
        ],
      },
      {
        title: 'Links',
        navItems: [
          {
            label: 'Scouts & Gidsen Vlaanderen',
            link: 'https://www.scoutsengidsenvlaanderen.be/',
          },
          {
            label: 'Groepsadmin',
            link: 'https://groepsadmin.scoutsengidsenvlaanderen.be/',
          },
          {
            label: 'Hopper Winkel',
            link: 'https://www.hopper.be/',
          },
        ],
      },
      {
        title: 'Legaal',
        navItems: [
          {
            label: 'Privacyovereenkomst',
            link: '/privacy',
          },
          {
            label: 'Cookies',
            link: '/cookies',
          },
          {
            label: 'Drugs- en alcoholbeleid',
            link: '/drugs-alcohol-beleid',
          },
        ],
      },
    ],
  },
};
