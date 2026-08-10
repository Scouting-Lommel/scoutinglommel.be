import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

export type RegisterForm = {
  initialValues: Record<string, unknown>;
  submitForm: (data: Record<string, unknown>, formFields: FormField[]) => void | Promise<void>;
} & React.HTMLAttributes<HTMLElement>;

export type RegisterConfirmation = {
  firstName: string;
  lastName: string;
  price: number;
  bankAccountNumber: string;
} & React.HTMLAttributes<HTMLElement>;
