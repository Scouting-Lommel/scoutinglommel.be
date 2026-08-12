import type { JSX } from 'react';
import { getEvents } from '@/lib/api/events/api';
import { formatDate } from '@/lib/helpers/dateTime';
import { generateEventSchema } from '@/lib/helpers/generateEventSchema';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import { EventsBlock as EventsBlockProps } from './types';

const EventsBlock = async ({
  blockTitle,
  initialItems,
  callToAction,
  blockProperties,
}: EventsBlockProps): Promise<JSX.Element> => {
  let eventSchema: ReturnType<typeof generateEventSchema> = null;

  try {
    const today = formatDate(new Date());
    const { events } = await getEvents(today);
    eventSchema = generateEventSchema(events);
  } catch (e) {
    console.error('Failed to fetch events for Event schema:', e);
  }

  return (
    <>
      <BlockContainer
        variant={blockProperties?.variant}
        orientation={blockProperties?.orientation}
        slug={blockProperties?.slug}
        cta={callToAction}
      >
        <section className="sl-layout">
          <h2 className="t-headline-2 t-align-center">{blockTitle}</h2>

          <Activities variant="events" initialItems={initialItems} />
        </section>
      </BlockContainer>
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  );
};

export default EventsBlock;
