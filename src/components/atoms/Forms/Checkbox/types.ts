import { ChangeEventHandler } from 'react';

export type Checkbox = {
  id: string;
  label: string;
  error?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;
