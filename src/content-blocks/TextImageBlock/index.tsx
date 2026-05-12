import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import TextImage from '@/components/organisms/TextImage';
import { TextImageBlock as TextImageBlockProps } from './types';

const ImageTextBlock = ({
  textImageTitle,
  textImageContent,
  textImageImages,
  orientation,
  textImageCtaButton,
  textImageBlockProperties,
}: TextImageBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={textImageBlockProperties?.variant}
      orientation={textImageBlockProperties?.orientation}
      slug={textImageBlockProperties?.slug}
      modMargin
    >
      <TextImage
        title={textImageTitle}
        content={textImageContent}
        images={textImageImages}
        ctaButton={textImageCtaButton}
        variant={orientation}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default ImageTextBlock;
