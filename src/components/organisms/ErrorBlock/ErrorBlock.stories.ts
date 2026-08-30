import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorBlock from '.';

const meta: Meta<typeof ErrorBlock> = {
  title: '3 Components/Organisms/Error Block',
  component: ErrorBlock,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: '404',
    heading: 'Pagina niet gevonden',
    description: 'We hebben de pagina die je zocht, niet gevonden.',
    buttonLabel: 'Terug naar de homepagina',
  },
};
