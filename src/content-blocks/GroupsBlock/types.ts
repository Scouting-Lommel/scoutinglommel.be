import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type GroupsBlock = {
  title: string;
  groups: {
    name: string;
    slug: string;
    logo: CloudinaryImage;
  }[];
  cta: CallToAction;
  blockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
