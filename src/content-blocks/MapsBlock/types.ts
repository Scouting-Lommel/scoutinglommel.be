import { MapsLocation } from '@/types/MapsLocation';
import { BlockContainer } from '@/components/atoms/BlockContainer/types';

export type MapBlock = {
  mapTitle: string;
  mapBlockProperties: BlockContainer;
  query?: string;
  mapLocation?: MapsLocation;
} & React.HTMLAttributes<HTMLElement>;
