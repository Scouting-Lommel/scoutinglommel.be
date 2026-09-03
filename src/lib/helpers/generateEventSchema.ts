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

const buildPlaceAddress = (event: EventSchemaInput) => {
  const address = {
    ...(event.locationStreetAddress ? { streetAddress: event.locationStreetAddress } : {}),
    ...(event.locationAddressLocality ? { addressLocality: event.locationAddressLocality } : {}),
    ...(event.locationPostalCode ? { postalCode: event.locationPostalCode } : {}),
    ...(event.locationAddressCountry ? { addressCountry: event.locationAddressCountry } : {}),
  };
  return Object.keys(address).length > 0 ? { '@type': 'PostalAddress', ...address } : null;
};

type EventLocationFallback = {
  name: string;
  address?: string | null;
};

const generateEventSchema = (
  events: Array<EventSchemaInput | null | undefined> | null | undefined,
  fallbackLocation?: EventLocationFallback | null,
) => {
  if (!events || events.length === 0) return null;

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
        : fallbackLocation
          ? {
              '@type': 'Place',
              name: fallbackLocation.name,
              ...(fallbackLocation.address ? { address: fallbackLocation.address } : {}),
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
