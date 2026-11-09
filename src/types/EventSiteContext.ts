type EventSiteContext = {
  name: string | null;
  url: string;
  // Already resolved to absolute URLs by getEventSiteContext.
  imageUrl?: string | null;
  logoUrl?: string | null;
  address?: string | null;
};

export type { EventSiteContext };
