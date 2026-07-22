import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SocialsCta from '.';

const meta: Meta<typeof SocialsCta> = {
  title: '3 Components/Molecules/Socials CTA',
  component: SocialsCta,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Volg ons op sociale media!',
    socialItems: [
      { title: 'Facebook', link: 'https://facebook.com', icon: 'facebook' },
      { title: 'Instagram', link: 'https://instagram.com', icon: 'instagram' },
      { title: 'TikTok', link: 'https://tiktok.com', icon: 'tiktok' },
    ],
  },
};
