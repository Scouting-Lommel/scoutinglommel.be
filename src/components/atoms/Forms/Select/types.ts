import { ChangeEventHandler } from 'react';

export type SelectOption = {
  label: string;
  value: string;
};

export type FormSelect = {
  label: string;
  id: string;
  name: string;
  options: SelectOption[];
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
  error?: string;
} & React.SelectHTMLAttributes<HTMLElement>;
