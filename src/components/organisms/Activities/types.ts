export type ActivitySection = {
  variant: 'activities' | 'events';
  groupSlug?: string;
  initialItems: number;
  // ISO date the list is cut off at. The events block passes the date the Event
  // schema was built from, so anchors in the JSON-LD match the rendered list.
  date?: string;
} & React.HTMLAttributes<HTMLElement>;
