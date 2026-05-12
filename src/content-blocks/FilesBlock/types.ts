import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { FileSection } from '@/components/organisms/FileSection/types';

export type FileBlock = {
  filesTitle: string;
  groupSlug: string;
  filesBlockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
