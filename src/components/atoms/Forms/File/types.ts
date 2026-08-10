export type FormFile = {
  label: string;
  id: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLElement>;
