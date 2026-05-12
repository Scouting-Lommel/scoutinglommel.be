import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';

export type TextImageBlock = {
  textImageTitle: string;
  textImageContent: string;
  textImageImages: CloudinaryImage[];
  textImageCtaButton: Button;
  textImageBlockProperties: BlockContainer;
  orientation: 'default' | 'reversed';
} & React.HTMLAttributes<HTMLElement>;
