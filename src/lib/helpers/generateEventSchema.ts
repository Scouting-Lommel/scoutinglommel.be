type EventSchemaInput = {
  title: string;
  description?: string | null;
  startDate: string;
  startTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
};

const generateEventSchema = (
  events: Array<EventSchemaInput | null | undefined> | null | undefined,
) => {
  if (!events || events.length === 0) return null;

  const eventSchema = events.flatMap((event) => {
    if (!event || !event.title || !event.startDate) return [];

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
