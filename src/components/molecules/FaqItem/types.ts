import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';

export type FaqItem = {
  question: string;
  answer: string;
  image?: CloudinaryImage;
  callToAction?: Button;
} & React.HTMLAttributes<HTMLElement>;
