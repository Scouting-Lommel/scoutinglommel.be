import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Map from '.';

const meta: Meta<typeof Map> = {
  title: '3 Components/Atoms/Map',
  component: Map,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLatAndLng: Story = {
  args: {
    lat: 51.245269639715815,
    lng: 5.298043214895838,
    zoom: 16,
    address: 'Nieuwe Kopen 18, 3920 Lommel',
  },
};

export const WithQueryString: Story = {
  args: {
    query: 'Scouting Lommel',
    address: 'Nieuwe Kopen 4, 3920 Lommel',
  },
};
