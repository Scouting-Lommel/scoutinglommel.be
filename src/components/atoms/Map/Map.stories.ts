import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { groupAddress, groupLocation } from '@/lib/constants/groupLocation';
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
    lat: groupLocation.coordinates.latitude,
    lng: groupLocation.coordinates.longitude,
    zoom: 16,
    address: groupAddress,
  },
};

export const WithQueryString: Story = {
  args: {
    query: 'Scouting Lommel',
    address: groupAddress,
  },
};
