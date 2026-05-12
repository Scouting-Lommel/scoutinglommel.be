import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import FileSection from '@/components/organisms/FileSection';
import { FileBlock as FileBlockProps } from './types';

const FilesBlock = ({ filesTitle, groupSlug, filesBlockProperties }: FileBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={filesBlockProperties?.variant}
      orientation={filesBlockProperties?.orientation}
      slug={filesBlockProperties?.slug}
      modMargin
    >
      <FileSection title={filesTitle} groupSlug={groupSlug} className="sl-layout" />
    </BlockContainer>
  );
};

export default FilesBlock;
