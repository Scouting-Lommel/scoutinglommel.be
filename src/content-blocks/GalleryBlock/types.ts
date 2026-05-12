import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { Gallery } from '@/components/organisms/Gallery/types';

export type GalleryBlock = Gallery & {
  blockProperties: BlockContainer;
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
