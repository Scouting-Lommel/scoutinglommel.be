import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Form from '.';

const meta: Meta<typeof Form> = {
  title: '4 Forms/Forms',
  component: Form,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contact', 'register', 'activity', 'uploadFile', 'uploadLink', 'eetfestijn'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Contact: Story = {
  args: {
    variant: 'contact',
  },
};

export const Register: Story = {
  args: {
    variant: 'register',
  },
};

export const Activity: Story = {
  args: {
    variant: 'activity',
  },
};

export const UploadFile: Story = {
  args: {
    variant: 'uploadFile',
  },
};

export const UploadLink: Story = {
  args: {
    variant: 'uploadLink',
  },
};

export const Eetfestijn: Story = {
  args: {
    variant: 'eetfestijn',
  },
};
