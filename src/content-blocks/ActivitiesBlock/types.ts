import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type ActivityBlock = {
  title: string;
  initialItems: number;
  blockProperties: BlockContainer;
  callToAction?: CallToAction;
  groupSlug: string;
} & React.HTMLAttributes<HTMLElement>;
