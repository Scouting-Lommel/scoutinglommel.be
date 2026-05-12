import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type GalleryBlock = {
  galleryTitle: string;
  galleryInitialItems: number;
  galleryImages: CloudinaryImage[];
  galleryBlockProperties: BlockContainer;
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
