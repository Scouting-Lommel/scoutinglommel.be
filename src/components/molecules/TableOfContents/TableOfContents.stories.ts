import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TableOfContents from '.';

const meta: Meta<typeof TableOfContents> = {
  title: '3 Components/Molecules/Table Of Contents',
  component: TableOfContents,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sections: [
      {
        title: 'Ninja Cookies: The Covert Operation',
        content:
          "In accordance with recent regulations, we solemnly swear to tell you about our use of cookies. You see, our website uses 'Ninja Cookies'. Far stealthier than your average chocolate-chip digital tidbit, these cookies slyly collect information about your browsing behavior. They serve a noble purpose, to make your website experience as smooth as your grandma's pudding. Don't fret, any data collected is so anonymized, even Sherlock Holmes couldn't identify you from it. Should you wish to train your browser to be a 'Ninja Cookie' warrior and block them, feel free to spelunk around in your browser settings. But beware, doing so may cause some parts of our site to be as cooperative as a cat at bath time.",
      },
      {
        title: 'Your Data, Our Disco Ball',
        content:
          "Here at Chuckle Tech, we're grooving to a different kind of beat. Yes, we collect your data (names, emails, and occasionally your off-the-wall karaoke song choices), but we don't treat it like a wallflower. Rather, it becomes our disco ball! It helps us jazz up your user experience, relay messages that are as exciting as canapés on a party platter, and polish our products and services till they're as smooth as an Elvis impersonator's dance moves. Of course, we don't want your data to moonwalk its way into the wrong hands, so we've got padding security measures in place that are stronger than a 1980s hairspray. Your data only does the limbo under the metaphorical velvet rope to other parties when it's legal foxtrot time, or when our privacy practices (usually delivered with a dash of charming alliteration) say it's alright to sashay. Swipe right to privacy, with a twist of humor!",
      },
    ],
  },
};
