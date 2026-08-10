import type { DefaultValues, FieldValues } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import { Button } from '@/components/atoms/Button/types';
import { FormField } from './FormField/types';

export type FormBuilder<TFormValues extends FieldValues = FieldValues> = {
  formId: string;
  fields: FormField[];
  initialValues: DefaultValues<TFormValues>;
  formSchema: AnyObjectSchema;
  submitForm: (values: Record<string, unknown>) => void | Promise<void>;
  submitButtonLabel: string;
  secondaryButton?: Button;
} & React.HTMLAttributes<HTMLElement>;
