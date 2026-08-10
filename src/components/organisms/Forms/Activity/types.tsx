import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

export type Activity = {
  id?: string;
  documentId?: string;
  title?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  description?: string;
};

export type ActivityForm = {
  initialValues: Record<string, unknown>;
  activityId?: string;
  submitForm: (data: Record<string, unknown>, formFields: FormField[]) => void | Promise<void>;
  deleteActivity?: () => void;
} & React.HTMLAttributes<HTMLElement>;
