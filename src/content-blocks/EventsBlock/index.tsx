import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import ArticleGrid from '@/components/organisms/ArticleGrid';
import { EventsBlock as EventsBlockProps } from './types';

const EventsBlock = ({
  blockTitle,
  eventsInitialItems,
  callToAction,
  eventsBlockProperties,
}: EventsBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer
        variant={eventsBlockProperties.variant}
        orientation={eventsBlockProperties.orientation}
        slug={eventsBlockProperties.slug}
        cta={callToAction}
      >
        <section className="sl-layout">
          <h2 className="t-headline-2 t-align-center">{blockTitle}</h2>

          <Activities variant="events" initialItems={eventsInitialItems} />
        </section>
      </BlockContainer>
    </>
  );
};

export default EventsBlock;
