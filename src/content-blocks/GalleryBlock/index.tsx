import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Gallery from '@/components/organisms/Gallery';
import { GalleryBlock as GalleryBlockProps } from './types';

const GalleryBlock = ({
  galleryTitle,
  galleryInitialItems,
  galleryImages,
  galleryBlockProperties,
  cta,
}: GalleryBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={galleryBlockProperties?.variant}
      orientation={galleryBlockProperties?.orientation}
      slug={galleryBlockProperties?.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <Gallery title={galleryTitle} initialItems={galleryInitialItems} images={galleryImages} />
      </section>
    </BlockContainer>
  );
};

export default GalleryBlock;
