import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActivityForm from '@/components/organisms/Forms/Activity/ActivityForm';
import Modal from '.';

const meta: Meta<typeof Modal> = {
  title: '3 Components/Atoms/Modal',
  component: Modal,
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Activiteit toevoegen',
    children: <ActivityForm initialValues={{}} submitForm={() => {}} deleteActivity={() => {}} />,
    handleCloseModal: () => {},
  },
};
