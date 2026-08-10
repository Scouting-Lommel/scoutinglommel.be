import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

export type UploadFileForm = {
  initialValues: Record<string, unknown>;
  submitForm: (data: Record<string, unknown>, formFields: FormField[]) => void | Promise<void>;
  groupId: string;
} & React.HTMLAttributes<HTMLElement>;
