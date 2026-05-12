import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { Leader } from '@/components/molecules/Leader/types';

export type LeadersBLock = {
  leadersTitle: string;
  cta: CallToAction;
  leadersBlockProperties: BlockContainer;
  leaders: Leader[];
} & React.HTMLAttributes<HTMLElement>;
