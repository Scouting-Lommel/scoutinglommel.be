import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CallToAction from '.';

const meta: Meta<typeof CallToAction> = {
  title: '3 Components/Molecules/Call To Action',
  component: CallToAction,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Al ingeschreven?',
    intro: 'Schrijf je in via onze website',
    ctaLabel: 'Inschrijven',
    ctaLink: '/inschrijven',
  },
};
