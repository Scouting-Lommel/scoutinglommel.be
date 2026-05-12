import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Carousel from '@/components/organisms/Carousel';
import { GroupsBlock as GroupsBlockProps } from './types';

const GroupsBlock = ({ title, groups, cta, blockProperties }: GroupsBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties.variant}
      orientation={blockProperties.orientation}
      slug={blockProperties.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{title}</h2>
        <Carousel carouselItems={groups} />
      </section>
    </BlockContainer>
  );
};

export default GroupsBlock;
