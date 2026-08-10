import { CallToAction } from '@/components/molecules/CallToAction/types';
import { Tarif } from '@/components/molecules/Tarif/types';

export type Tarifs = {
  tarifs: Tarif[];
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
