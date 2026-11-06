import type { JSX } from 'react';
import { getEvents } from '@/lib/api/events/api';
import { getFooterData } from '@/lib/api/general/api';
import { formatDate } from '@/lib/helpers/dateTime';
import { generateEventSchema, type EventSiteContext } from '@/lib/helpers/generateEventSchema';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import { EventsBlock as EventsBlockProps } from './types';

// Site context is fallback-only: bound it so a slow CMS response delays the
// event schema by at most SITE_CONTEXT_TIMEOUT_MS, and return null (omit the
// site-level fields) when the CMS provides no site name instead of inventing one.
const SITE_CONTEXT_TIMEOUT_MS = 3000;

const getSiteContext = (): Promise<EventSiteContext | null> =>
  Promise.race([
    getFooterData()
      .then(async (footerData) => {
        const generalData = footerData?.generalData;
        if (!generalData?.siteName) return null;
        return {
          name: generalData.siteName,
          url: generalData.url ?? (await getSiteUrl()),
          imageUrl: generalData.image?.url ?? null,
          logoUrl: generalData.logo?.url ?? null,
          address: generalData.address ?? null,
        };
      })
      .catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), SITE_CONTEXT_TIMEOUT_MS)),
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
    const [eventsResult, siteContextResult] = await Promise.allSettled([
      getEvents(today),
      getSiteContext(),
    ]);
    if (eventsResult.status === 'fulfilled') {
      eventSchema = generateEventSchema(
        eventsResult.value.events,
        siteContextResult.status === 'fulfilled' ? siteContextResult.value : null,
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
