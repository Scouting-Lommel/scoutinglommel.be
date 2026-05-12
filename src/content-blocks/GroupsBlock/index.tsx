import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Carousel from '@/components/organisms/Carousel';
import { GroupsBlock as GroupsBlockProps } from './types';

const GroupsBlock = ({ groupsTitle, groupsItems, cta, groupsBlockProperties }: GroupsBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={groupsBlockProperties.variant}
      orientation={groupsBlockProperties.orientation}
      slug={groupsBlockProperties.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{groupsTitle}</h2>
        <Carousel carouselItems={groupsItems} />
      </section>
    </BlockContainer>
  );
};

export default GroupsBlock;
