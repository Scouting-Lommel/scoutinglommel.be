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
  name: string;
  url?: string | null;
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

// The CMS stores the group address as free text with <br/> line breaks, e.g.
// "Nieuwe Kopen 4 <br/>3920 Lommel <br/>België". Schema.org needs a structured
// PostalAddress, so normalise the markup into lines and pick out the parts we
// recognise. Returns null when nothing usable is left.
const parseCmsAddress = (raw?: string | null) => {
  if (!raw) return null;

  const lines = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const streetLines: string[] = [];
  const address: Record<string, string> = {};

  for (const line of lines) {
    const postalCodeMatch = line.match(/^(\d{4,5})\s+(.+)$/);
    if (postalCodeMatch) {
      address.postalCode = postalCodeMatch[1];
      address.addressLocality = postalCodeMatch[2];
      continue;
    }
    if (/^(belgi[eë]|belgium|be)$/i.test(line)) {
      address.addressCountry = 'BE';
      continue;
    }
    streetLines.push(line);
  }

  if (streetLines.length > 0) address.streetAddress = streetLines.join(', ');

  return Object.keys(address).length > 0 ? address : null;
};

// Strapi can return relative upload paths; schema.org consumers expect absolute URLs.
const toAbsoluteUrl = (value: string, siteUrl?: string | null): string => {
  if (/^https?:\/\//i.test(value)) return value;
  if (!siteUrl) return value;
  return `${siteUrl.replace(/\/+$/, '')}${value.startsWith('/') ? '' : '/'}${value}`;
};

const generateEventSchema = (
  events: Array<EventSchemaInput | null | undefined> | null | undefined,
  siteContext?: EventSiteContext | null,
) => {
  if (!events || events.length === 0) return null;

  const fallbackAddress = parseCmsAddress(siteContext?.address);
  // Google asks for an image that depicts the event, so the site-wide SEO image
  // is the fallback; the logo is deliberately not used as an event image.
  const siteImage = siteContext?.imageUrl ?? null;
  const imageUrl = siteImage ? toAbsoluteUrl(siteImage, siteContext?.url) : null;

  const organizer = siteContext?.name
    ? {
        '@type': 'Organization',
        name: siteContext.name,
        ...(siteContext.url ? { url: siteContext.url } : {}),
        ...(siteContext.logoUrl
          ? { logo: toAbsoluteUrl(siteContext.logoUrl, siteContext.url) }
          : {}),
      }
    : null;

  const performer = siteContext?.name
    ? {
        '@type': 'PerformingGroup',
        name: siteContext.name,
        ...(siteContext.url ? { url: siteContext.url } : {}),
      }
    : null;

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
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(organizer ? { organizer } : {}),
        ...(performer ? { performer } : {}),
        // Events are free unless the CMS says otherwise, and the Strapi event
        // type has no price field yet. This default marks paid events such as
        // the eetfestijn as free until that field exists.
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          ...(siteContext?.url ? { url: siteContext.url } : {}),
        },
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
