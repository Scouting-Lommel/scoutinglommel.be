export type FormTextArea = {
  label: string;
  id: string;
  name: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLElement>;
