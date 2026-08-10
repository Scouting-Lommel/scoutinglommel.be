import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type React from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import type { InputField } from './types';
import FormField from '.';

const meta: Meta<InputField> = {
  title: '4 Forms/Form Builder/Form Field',
  component: FormField as React.ComponentType<InputField>,
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<InputField>;

const register = ((name: string) => ({
  name,
  onChange: () => {},
  onBlur: () => {},
  ref: () => {},
})) as unknown as UseFormRegister<FieldValues>;

export const Default: Story = {
  args: {
    type: 'email',
    id: 'email',
    name: 'email',
    label: 'Emailadres',
    placeholder: 'john.doe@example.com',
    required: true,
    register,
  },
};
