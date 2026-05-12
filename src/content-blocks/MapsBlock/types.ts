import { MapsLocation } from '@/types/MapsLocation';
import { BlockContainer } from '@/components/atoms/BlockContainer/types';

export type MapBlock = {
  blockProperties: BlockContainer;
  query?: string;
  location?: MapsLocation;
} & React.HTMLAttributes<HTMLElement>;
