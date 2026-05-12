import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import TextImage from '@/components/organisms/TextImage';
import { TextImageBlock as TextImageBlockProps } from './types';

const ImageTextBlock = ({
  title,
  content,
  images,
  orientation,
  ctaButton,
  blockProperties,
}: TextImageBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
      modMargin
    >
      <TextImage
        title={title}
        content={content}
        images={images?.length > 0 ? images : undefined}
        ctaButton={ctaButton}
        variant={orientation}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default ImageTextBlock;
