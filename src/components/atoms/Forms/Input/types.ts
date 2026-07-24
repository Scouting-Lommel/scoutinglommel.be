import { ChangeEventHandler } from 'react';

export type FormInput = {
  label: string;
  id: string;
  name: string;
  error?: string;
  modShowLabel?: boolean;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
} & React.InputHTMLAttributes<HTMLElement>;
