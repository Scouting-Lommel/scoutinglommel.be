import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkipToContent from '.';

const meta: Meta<typeof SkipToContent> = {
  title: '3 Components/Atoms/Skip To Content',
  component: SkipToContent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Story />
        <section id="intro" style={{ backgroundColor: 'lightgrey', padding: '3rem' }}>
          Push{' '}
          <code className="sb-code sb-code--styled" style={{ marginRight: 0 }}>
            tab
          </code>{' '}
          to focus the Skip To Content button.
        </section>
      </div>
    ),
  ],
};
