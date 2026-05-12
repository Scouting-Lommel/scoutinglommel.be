import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import FAQ from '@/components/organisms/FAQ';
import { FaqBlock as TextImageBlockProps } from './types';

const FaqBlock = ({
  title,
  bottomText,
  faqItems,
  blockProperties,
}: TextImageBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
    >
      <FAQ title={title} faqItems={faqItems} bottomText={bottomText} className="sl-layout" />
    </BlockContainer>
  );
};

export default FaqBlock;
