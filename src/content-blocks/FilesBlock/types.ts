import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { FileSection } from '@/components/organisms/FileSection/types';

export type FileBlock = FileSection & {
  blockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
