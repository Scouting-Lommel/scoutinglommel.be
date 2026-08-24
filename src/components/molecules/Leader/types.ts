import { CloudinaryImage } from '@/components/atoms/Image/types';

export type Leader = {
  documentId?: string;
  firstName: string;
  lastName: string;
  image?: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
