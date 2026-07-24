import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Radio } from './Radio/types';

export type RadioGroup = {
  id: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  direction?: 'row' | 'column';
  radioButtons?: Radio[];
  register?: UseFormRegister<FieldValues>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
