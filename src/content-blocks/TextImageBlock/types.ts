import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';

export type TextImageBlock = {
  title: string;
  content: string;
  images: CloudinaryImage[];
  ctaButton: Button;
  blockProperties: BlockContainer;
  orientation: 'default' | 'reversed';
} & React.HTMLAttributes<HTMLElement>;
