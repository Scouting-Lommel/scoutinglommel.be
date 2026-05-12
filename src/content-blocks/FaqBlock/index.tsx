import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import FAQ from '@/components/organisms/FAQ';
import { FaqBlock as TextImageBlockProps } from './types';

const FaqBlock = ({
  faqTitle,
  faqBottomText,
  faqItems,
  faqBlockProperties,
}: TextImageBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={faqBlockProperties?.variant}
      orientation={faqBlockProperties?.orientation}
      slug={faqBlockProperties?.slug}
    >
      <FAQ title={faqTitle} faqItems={faqItems} bottomText={faqBottomText} className="sl-layout" />
    </BlockContainer>
  );
};

export default FaqBlock;
