import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { Tarif } from '@/components/molecules/Tarif/types';

export type TarifsBlock = {
  tarifsTitle: string;
  tarifsItems: Tarif[];
  tarifsBlockProperties: BlockContainer;
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
