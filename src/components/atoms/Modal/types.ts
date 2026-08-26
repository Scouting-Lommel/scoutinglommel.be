export type Modal = {
  id: string;
  title?: string;
  children: React.ReactNode;
  open?: boolean;
  handleCloseModal: () => void;
} & React.HTMLAttributes<HTMLElement>;
