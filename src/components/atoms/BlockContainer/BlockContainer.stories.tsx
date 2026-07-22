import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from '@/components/atoms/Typography';
import BlockContainer from '.';

const BlockContent = () => {
  return (
    <div className="sl-layout">
      <h2>Het marktplein</h2>
      <Typography>
        <p>
          Op het marktplein verkopen handelaren hun kazen en haring, terwijl toeristen foto&apos;s
          maken van de historische gevels. Een groepje studenten zit op een terrasje te genieten van
          warme chocolademelk en appelgebak. De sfeer is gezellig en ontspannen, zoals het hoort in
          een typisch Nederlands tafereel.
        </p>
        <p>
          In de verte staat een oude bakkerij waar de geur van verse stroopwafels door de straten
          waait. Kinderen fietsen vrolijk langs de grachten, terwijl meeuwen boven het water zweven.
          De oude straatjes kronkelen door het dorpje, waar rode dakpannen glinsteren in het
          zonlicht.
        </p>
      </Typography>
    </div>
  );
};

const meta: Meta<typeof BlockContainer> = {
  title: '3 Components/Atoms/Block Container',
  component: BlockContainer,
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
    orientation: {
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'dark',
    orientation: 'default',
    slug: 'het-marktplein',
    modSmallPadding: false,
    modNoPadding: false,
    modMargin: false,
    children: <BlockContent />,
  },
};
