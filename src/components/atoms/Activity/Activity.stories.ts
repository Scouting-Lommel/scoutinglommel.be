import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { formatDate } from '@/lib/helpers/dateTime';
import Activity from '.';

const meta: Meta<typeof Activity> = {
  title: '3 Components/Atoms/Activity',
  component: Activity,
  argTypes: {
    startDate: {
      control: { type: 'text' },
    },
    endDate: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Quizavond',
    description: 'Een avond vol plezier en vertier. Test je kennis en win een leuke prijs!',
    startDate: formatDate(new Date()),
    startTime: '19:30',
    endDate: formatDate(new Date()),
    endTime: '22:00',
  },
};

export const DifferentDates: Story = {
  args: {
    title: 'Derdejaarsweekend',
    description:
      'Tijdens het derdejaarsweekend gaan we met alle derdejaars op minikamp. We drinken een pintje, spelen een spelletje, en genieten van het zonnetje. Kortom, een weekend om niet te missen.',
    startDate: formatDate(new Date()),
    startTime: '20:00',
    endDate: formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 2)),
    endTime: '20:00',
  },
};
