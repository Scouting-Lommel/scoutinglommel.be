import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockContainer from '@/components/atoms/BlockContainer';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import Hero from '.';

const meta: Meta<typeof Hero> = {
  title: '3 Components/Organisms/Hero',
  component: Hero,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Algemene \ninformatie',
    subtitle: 'Veelgestelde vragen',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <BlockContainer slug="algemene-informatie" variant="dark" bgImage={imageStory!.args!.data}>
        <div className="sl-layout">
          <Story />
        </div>
      </BlockContainer>
    ),
  ],
};

export const Large: Story = {
  args: {
    title: 'Scouting St-\nPieter Lommel',
    variant: 'large',
    yearTheme: {
      title: 'Speelstek, Reuzeplek!',
      image: {
        data: {
          attributes: {
            name: 'Jaarthema RGB.png',
            width: 960,
            height: 1823,
            url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1695662080/Jaarthema_RGB_de41dd8832.png',
            alternativeText: null,
            caption: null,
            hash: 'Jaarthema_RGB_de41dd8832',
            blurhash: null,
          },
        },
        name: 'Jaarthema RGB.png',
        width: 960,
        height: 1823,
        url: 'https://res.cloudinary.com/scoutinglommel/image/upload/v1695662080/Jaarthema_RGB_de41dd8832.png',
        hash: 'Jaarthema_RGB_de41dd8832',
      },
    },
    callToAction: [
      {
        label: 'Ontdek het jaarthema',
        link: '/algemene-informatie#jaarthema',
        variant: 'primary',
      },
      {
        label: 'Inschrijven',
        link: '/inschrijven',
        variant: 'light',
      },
    ],
  },
  decorators: [
    (Story) => (
      <BlockContainer slug="algemene-informatie" variant="dark" bgImage={imageStory!.args!.data}>
        <div className="sl-layout">
          <Story />
        </div>
      </BlockContainer>
    ),
  ],
};

export const Simple: Story = {
  args: {
    title: 'Algemene informatie',
    subtitle: 'Veelgestelde vragen',
    variant: 'simple',
  },
};
