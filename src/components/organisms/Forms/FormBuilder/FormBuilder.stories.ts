import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormBuilder from '.';

const meta: Meta<typeof FormBuilder> = {
  title: '4 Forms/Form Builder/Form Builder',
  component: FormBuilder,
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formId: 'demo-form',
    submitButtonLabel: 'Opslaan',
    fields: [
      {
        type: 'row',
        id: 'name-row',
        name: 'name-row',
        fieldChildren: [
          {
            type: 'input',
            id: 'firstName',
            name: 'firstName',
            label: 'Voornaam',
            required: true,
          },
          {
            type: 'input',
            id: 'lastName',
            name: 'lastName',
            label: 'Familienaam',
          },
        ],
      },
      {
        type: 'input',
        id: 'email',
        name: 'email',
        label: 'Emailadres',
        placeholder: 'john.doe@example.com',
        required: true,
      },
    ],
    submitForm: () => {},
  },
};

export const WithSecondaryButton: Story = {
  args: {
    formId: 'demo-form',
    submitButtonLabel: 'Opslaan',
    fields: [
      {
        type: 'row',
        id: 'name-row',
        name: 'name-row',
        fieldChildren: [
          {
            type: 'input',
            id: 'firstName',
            name: 'firstName',
            label: 'Voornaam',
            required: true,
          },
          {
            type: 'input',
            id: 'lastName',
            name: 'lastName',
            label: 'Familienaam',
          },
        ],
      },
      {
        type: 'input',
        id: 'email',
        name: 'email',
        label: 'Emailadres',
        placeholder: 'john.doe@example.com',
        required: true,
      },
    ],
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    submitForm: () => {},
    secondaryButton: {
      label: 'Persoon verwijderen',
      variant: 'danger',
      onClick: () => {},
    },
  },
};
