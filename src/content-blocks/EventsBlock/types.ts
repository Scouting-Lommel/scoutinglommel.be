import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type EventsBlock = {
  blockTitle: string;
  initialItems: number;
  blockProperties: BlockContainer;
  callToAction?: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
