import { CloudinaryImage } from '@/components/atoms/Image/types';

export type CarouselItem = {
  name: string;
  slug: string;
  logo: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
