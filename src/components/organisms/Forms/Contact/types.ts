import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

export type ContactForm = {
  initialValues: Record<string, unknown>;
  submitForm: (data: Record<string, unknown>, formFields: FormField[]) => void | Promise<void>;
} & React.HTMLAttributes<HTMLElement>;
