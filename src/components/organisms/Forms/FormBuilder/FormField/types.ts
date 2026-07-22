import { ChangeEventHandler } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Radio } from '@/components/atoms/Forms/RadioGroup/Radio/types';
import { SelectOption } from '@/components/atoms/Forms/Select/types';

export type BaseField = {
  id: string;
  name: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
} & React.HTMLAttributes<HTMLElement>;

export interface RowField extends BaseField {
  type: 'row';
  fieldChildren?: FormField[];
}

export interface TextField extends BaseField {
  type: 'text';
  className?: string;
  text: string;
}

export interface DividerField extends BaseField {
  type: 'divider';
}

export interface InputField extends BaseField {
  type: 'input' | 'email' | 'tel' | 'date' | 'datetime';
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
}
export interface NumberField extends BaseField {
  type: 'number';
  label: string;
  value?: number;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
}

export interface UrlField extends BaseField {
  type: 'url';
  pattern: RegExp;
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
}

export interface TextAreaField extends BaseField {
  type: 'textarea';
  label: string;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export interface SelectField extends BaseField {
  type: 'select';
  label: string;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
}

export interface RadioGroupField extends BaseField {
  type: 'radioGroup';
  label: string;
  value?: string;
  direction?: 'row' | 'column';
  radioButtons?: Radio[];
  disabled?: boolean;
  autoComplete?: string;
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  customChangeBehaviour?: ChangeEventHandler<HTMLElement>;
}

export interface FileField extends BaseField {
  type: 'file';
  label: string;
}

export interface CaptchaField extends BaseField {
  type: 'captcha';
}

export interface HiddenField extends BaseField {
  type: 'hidden';
  label?: string;
  value?: string;
}

export type FormField =
  | RowField
  | TextField
  | DividerField
  | InputField
  | NumberField
  | UrlField
  | TextAreaField
  | SelectField
  | RadioGroupField
  | CheckboxField
  | FileField
  | CaptchaField
  | HiddenField;
