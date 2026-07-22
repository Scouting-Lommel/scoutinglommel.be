import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavAuthButton } from '.';

const meta: Meta<typeof NavAuthButton> = {
  title: '3 Components/Molecules/Auth Button',
  component: NavAuthButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <nav>
        <ul style={{ listStyleType: 'none', width: 'fit-content', margin: 0, padding: 0 }}>
          <Story />
        </ul>
      </nav>
    ),
  ],
};

export const Authenticated: Story = {
  args: {
    session: {
      user: {
        name: 'John Doe',
        email: 'john.doe@scoutinglommel.be',
      },
      orgUnit: '/',
      role: 'webmaster',
      expires: '2099-01-01T00:00:00.000Z',
    },
  },
  decorators: [
    (Story) => (
      <nav>
        <ul style={{ listStyleType: 'none', width: 'fit-content', margin: 0, padding: 0 }}>
          <Story />
        </ul>
      </nav>
    ),
  ],
};
