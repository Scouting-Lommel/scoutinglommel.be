import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type GroupsBlock = {
  groupsTitle: string;
  groupsItems: {
    name: string;
    slug: string;
    logo: CloudinaryImage;
  }[];
  cta: CallToAction;
  groupsBlockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
