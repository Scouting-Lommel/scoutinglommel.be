import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Gallery from '@/components/organisms/Gallery';
import { GalleryBlock as GalleryBlockProps } from './types';

const GalleryBlock = ({
  title,
  initialItems,
  images,
  blockProperties,
  cta,
}: GalleryBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <Gallery title={title} initialItems={initialItems} images={images} />
      </section>
    </BlockContainer>
  );
};

export default GalleryBlock;
