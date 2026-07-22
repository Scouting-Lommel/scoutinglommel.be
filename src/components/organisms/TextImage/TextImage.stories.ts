import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextImage from '.';

const meta: Meta<typeof TextImage> = {
  title: '3 Components/Organisms/Text Image',
  component: TextImage,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'reversed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Woordje van de groepsleiding',
    content:
      'Op 23 juli om 15u gaat onze bezoekdag van start! Hierbij willen we jullie graag uitnodigen voor een drankje te komen drinken en een lekkere hotdog te komen eten. Voor dit laatste zouden we wel willen vragen om onderstaand formulier in te vullen. Zo weten we ongeveer hoeveel hotdogs we moeten voorzien. Dit dient enkel ingevuld te worden voor de hotdogs die de ouders, grootouders,… eten, die van u zoon of dochter zit bij het kamp inbegrepen. De bezoekdag loopt op zijn einde tegen 19u00.',
    images: [
      {
        name: 'groepsfoto.png',
        width: 1949,
        height: 1240,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1673445052/groepsfoto_75dfd0948c.png',
        hash: 'groepsfoto_75dfd0948c',
        alternativeText: 'groepsfoto.png',
        caption: 'groepsfoto.png',
      },
    ],
    variant: 'default',
  },
};

export const WithCallToAction: Story = {
  args: {
    title: 'Woordje van de groepsleiding',
    content:
      'Op 23 juli om 15u gaat onze bezoekdag van start! Hierbij willen we jullie graag uitnodigen voor een drankje te komen drinken en een lekkere hotdog te komen eten. Voor dit laatste zouden we wel willen vragen om onderstaand formulier in te vullen. Zo weten we ongeveer hoeveel hotdogs we moeten voorzien. Dit dient enkel ingevuld te worden voor de hotdogs die de ouders, grootouders,… eten, die van u zoon of dochter zit bij het kamp inbegrepen. De bezoekdag loopt op zijn einde tegen 19u00.',
    images: [
      {
        name: 'groepsfoto.png',
        width: 1949,
        height: 1240,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1673445052/groepsfoto_75dfd0948c.png',
        hash: 'groepsfoto_75dfd0948c',
        alternativeText: 'groepsfoto.png',
        caption: 'groepsfoto.png',
      },
    ],
    variant: 'reversed',
    ctaButton: {
      label: 'Meer informatie',
      link: '/algemene-informatie',
      variant: 'primary',
    },
  },
};

export const MultipleImages: Story = {
  args: {
    title: 'Woordje van de groepsleiding',
    content:
      'Op 23 juli om 15u gaat onze bezoekdag van start! Hierbij willen we jullie graag uitnodigen voor een drankje te komen drinken en een lekkere hotdog te komen eten. Voor dit laatste zouden we wel willen vragen om onderstaand formulier in te vullen. Zo weten we ongeveer hoeveel hotdogs we moeten voorzien. Dit dient enkel ingevuld te worden voor de hotdogs die de ouders, grootouders,… eten, die van u zoon of dochter zit bij het kamp inbegrepen. De bezoekdag loopt op zijn einde tegen 19u00.',
    images: [
      {
        name: 'IMG_2453.jpg',
        width: 4032,
        height: 3024,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1690105463/IMG_2453_9e4413dc77.jpg',
        hash: 'IMG_2453_9e4413dc77',
      },
      {
        name: '701b9def-caf1-40ca-bf21-ed32fb6f30de.jpg',
        width: 2048,
        height: 1536,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1690105463/701b9def_caf1_40ca_bf21_ed32fb6f30de_246b33e3ec.jpg',
        hash: '701b9def_caf1_40ca_bf21_ed32fb6f30de_246b33e3ec',
      },
      {
        name: 'IMG_2454.jpg',
        width: 4032,
        height: 3024,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1690105463/IMG_2454_79d5bbc4ec.jpg',
        hash: 'IMG_2454_79d5bbc4ec',
      },
    ],
    variant: 'default',
    ctaButton: {
      label: 'Meer informatie',
      link: '/algemene-informatie',
      variant: 'primary',
    },
  },
};
