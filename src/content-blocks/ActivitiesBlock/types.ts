import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type ActivityBlock = {
  activitiesTitle: string;
  activitiesInitialItems: number;
  activitiesBlockProperties: BlockContainer;
  callToAction?: CallToAction;
  groupSlug: string;
} & React.HTMLAttributes<HTMLElement>;
