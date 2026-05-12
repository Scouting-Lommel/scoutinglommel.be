import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import ArticleGrid from '@/components/organisms/ArticleGrid';
import { EventsBlock as EventsBlockProps } from './types';

const EventsBlock = ({
  blockTitle,
  initialItems,
  callToAction,
  blockProperties,
}: EventsBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer
        variant={blockProperties.variant}
        orientation={blockProperties.orientation}
        slug={blockProperties.slug}
        cta={callToAction}
      >
        <section className="sl-layout">
          <h2 className="t-headline-2 t-align-center">{blockTitle}</h2>

          <Activities variant="events" initialItems={initialItems} />
        </section>
      </BlockContainer>
    </>
  );
};

export default EventsBlock;
