import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { Tarif } from '@/components/molecules/Tarif/types';

export type TarifsBlock = {
  title: string;
  tarifs: Tarif[];
  blockProperties: BlockContainer;
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
