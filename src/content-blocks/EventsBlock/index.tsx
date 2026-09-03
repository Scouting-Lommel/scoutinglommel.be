import type { JSX } from 'react';
import { getEvents } from '@/lib/api/events/api';
import { getFooterData } from '@/lib/api/general/api';
import { formatDate } from '@/lib/helpers/dateTime';
import { generateEventSchema } from '@/lib/helpers/generateEventSchema';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import { EventsBlock as EventsBlockProps } from './types';

// Footer data is fallback-only: bound it so a slow CMS response delays the
// event schema by at most FOOTER_DATA_TIMEOUT_MS, and return null (omit the
// fallback Place) when the CMS provides no site name instead of inventing one.
const FOOTER_DATA_TIMEOUT_MS = 3000;

const getFooterFallback = (): Promise<{ name: string; address?: string | null } | null> =>
  Promise.race([
    getFooterData()
      .then((footerData) => {
        const siteName = footerData?.generalData?.siteName;
        if (!siteName) return null;
        return { name: siteName, address: footerData?.generalData?.address };
      })
      .catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), FOOTER_DATA_TIMEOUT_MS)),
  ]);

const EventsBlock = async ({
  blockTitle,
  initialItems,
  callToAction,
  blockProperties,
}: EventsBlockProps): Promise<JSX.Element> => {
  let eventSchema: ReturnType<typeof generateEventSchema> = null;

  try {
    const today = formatDate(new Date());
    const [eventsResult, fallbackResult] = await Promise.allSettled([
      getEvents(today),
      getFooterFallback(),
    ]);
    if (eventsResult.status === 'fulfilled') {
      eventSchema = generateEventSchema(
        eventsResult.value.events,
        fallbackResult.status === 'fulfilled' ? fallbackResult.value : null,
      );
    }
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
