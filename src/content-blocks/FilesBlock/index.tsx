import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import FileSection from '@/components/organisms/FileSection';
import { FileBlock as FileBlockProps } from './types';

const FilesBlock = ({ title, groupSlug, blockProperties }: FileBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
      modMargin
    >
      <FileSection title={title} groupSlug={groupSlug} className="sl-layout" />
    </BlockContainer>
  );
};

export default FilesBlock;
