import { CloudinaryImage } from '@/components/atoms/Image/types';

export type Leader = {
  firstName: string;
  lastName: string;
  image?: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
