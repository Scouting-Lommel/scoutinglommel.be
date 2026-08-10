import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSX } from 'react';
import Paragraph from '.';

const meta: Meta<typeof Paragraph> = {
  title: '3 Components/Molecules/Paragraph',
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Spaghetti Incident',
    content:
      'One day in the quiet town of Noodlewood, an unexpected debacle turned the monotony into a delicious disaster. The local pasta factory had a mechanical hiccup and suddenly began to churn out spaghetti at an unprecedented rate. Houses were draped in golden pasta; every tree turned into a makeshift spaghetti hanger. An improbable pasta fountain in the town square became a tourist hotspot, and the townspeople soon became expert navigators through the squirmy spaghetti alleys. It wasn\'t just a traffic jam; it was a pasta jam! And that, my friends, was the hilariously unprecedented "Great Spaghetti Incident."',
  },
  decorators: [
    (Story: () => JSX.Element): JSX.Element => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
};
