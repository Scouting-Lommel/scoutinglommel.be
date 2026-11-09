import { parseCmsAddress } from '@/lib/helpers/parseCmsAddress';

type EventSchemaInput = {
  title: string;
  description?: string | null;
  startDate: string;
  startTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
  locationName?: string | null;
  locationStreetAddress?: string | null;
  locationAddressLocality?: string | null;
  locationPostalCode?: string | null;
  locationAddressCountry?: string | null;
};

type EventSiteContext = {
  name: string | null;
  url: string;
  // Already resolved to absolute URLs by getEventSiteContext.
  imageUrl?: string | null;
  logoUrl?: string | null;
  address?: string | null;
};

const buildPlaceAddress = (event: EventSchemaInput) => {
  const address = {
    ...(event.locationStreetAddress ? { streetAddress: event.locationStreetAddress } : {}),
    ...(event.locationAddressLocality ? { addressLocality: event.locationAddressLocality } : {}),
    ...(event.locationPostalCode ? { postalCode: event.locationPostalCode } : {}),
    ...(event.locationAddressCountry ? { addressCountry: event.locationAddressCountry } : {}),
  };
  return Object.keys(address).length > 0 ? { '@type': 'PostalAddress', ...address } : null;
};

const generateEventSchema = (
  events: Array<EventSchemaInput | null | undefined> | null | undefined,
  siteContext?: EventSiteContext | null,
) => {
  if (!events || events.length === 0) return null;

  const siteUrl = siteContext?.url ?? null;
  const fallbackAddress = parseCmsAddress(siteContext?.address);

  // Google asks for an image that depicts the event, so the site-wide SEO image
  // is the fallback; the logo is deliberately not used as an event image.
  const imageUrl = siteContext?.imageUrl ?? null;

  // Both nodes describe the same group. Only the organizer carries the site @id,
  // so it merges with the site-wide Organization instead of conflating the
  // PerformingGroup with it.
  const siteIdentity = siteContext?.name
    ? { name: siteContext.name, ...(siteUrl ? { url: siteUrl } : {}) }
    : null;

  const organizer = siteIdentity
    ? {
        '@type': 'Organization',
        ...(siteUrl ? { '@id': siteUrl } : {}),
        ...siteIdentity,
        ...(siteContext?.logoUrl ? { logo: siteContext.logoUrl } : {}),
      }
    : null;

  const performer = siteIdentity ? { '@type': 'PerformingGroup', ...siteIdentity } : null;

  // Site-level fields are gated on the CMS context: without it we omit them
  // rather than emitting a partial Offer or a nameless organizer.
  const siteLevelFields = siteContext
    ? {
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(organizer ? { organizer } : {}),
        ...(performer ? { performer } : {}),
        offers: {
          '@type': 'Offer',
          // Events are free unless the CMS says otherwise, and the Strapi event
          // type has no price field yet. This default marks paid events such as
          // the eetfestijn as free until that field exists.
          price: 0,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          ...(siteUrl ? { url: siteUrl } : {}),
        },
      }
    : {};

  const eventSchema = events.flatMap((event) => {
    if (!event || !event.title || !event.startDate) return [];

    const eventAddress = buildPlaceAddress(event);
    const location =
      event.locationName || eventAddress
        ? {
            '@type': 'Place',
            ...(event.locationName ? { name: event.locationName } : {}),
            ...(eventAddress ? { address: eventAddress } : {}),
          }
        : siteContext?.name
          ? {
              '@type': 'Place',
              name: siteContext.name,
              ...(fallbackAddress
                ? { address: { '@type': 'PostalAddress', ...fallbackAddress } }
                : {}),
            }
          : null;

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        startDate: event.startTime
          ? `${event.startDate}T${formatTime(event.startTime)}`
          : event.startDate,
        ...(event.endDate
          ? {
              endDate: event.endTime
                ? `${event.endDate}T${formatTime(event.endTime)}`
                : event.endDate,
            }
          : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        ...(location ? { location } : {}),
        ...siteLevelFields,
        ...(event.description ? { description: event.description } : {}),
      },
    ];
  });

  return eventSchema.length > 0 ? eventSchema : null;
};

// Strapi returns times in "HH:mm:ss.SSS" format; ISO 8601 only needs HH:mm.
function formatTime(time: string): string {
  return time.slice(0, 5);
}

export { generateEventSchema };
export type { EventSiteContext };
