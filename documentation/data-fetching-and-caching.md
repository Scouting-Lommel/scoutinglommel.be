# Data Fetching & Caching

## Content freshness model

All GraphQL responses from Strapi are fetched with `cache: 'no-store'` (`src/api/strapi.ts`).
There is no server-side Data Cache, no ISR, and no page-level revalidation:

- CMS edits appear on the **next page load** — no webhook needed, nothing to invalidate.
- Every page render runs the 4 parallel layout-data queries (`getLayoutData`) plus page queries against Strapi.
- `src/app/api/revalidate/route.ts` exists only to acknowledge Strapi's webhook config (auth-gated, returns 200, does nothing).

## Why there is no server cache

A previous caching layer (STATIC 7-day / DYNAMIC 1-hour tiers with `revalidateTag`-style
invalidation) **did not work** and was removed:

- The root layout reads `headers()` (for breadcrumbs), which makes routes dynamic. But the
  layout's data fetch runs **before** `headers()` is called, so Next.js engaged the Data Cache
  while the HTML stayed dynamic — **stale data, fresh shell**.
- The revalidate webhook could not reliably invalidate those entries: its model whitelist
  missed most content types (e.g. `home-page`), so `revalidateTag('static-data')` never touched
  the entries those pages were cached under. Content stayed stale for up to 7 days.

## Client-side fetching (events, activities, files, links)

The `Activities` organism (`src/components/organisms/Activities/`), `FileSection`
(`src/components/organisms/FileSection/`), and the dashboard
`ActivitiesSection`/`FilesSection` fetch their data **client-side** on mount.

This is deliberate, for two reasons:

1. **Vercel Fluid Active CPU budget** — these queries run in the visitor's browser, not in the
   serverless function, keeping server CPU usage low on the Pro plan.
2. Client-side fetches bypass Next.js caching entirely (browser → Strapi directly), so they were
   **never** affected by the stale-data bug. They remain always-fresh by construction.

Do not convert these to server-side fetching to "fix" freshness — they are already fresh, and
server-side fetching would move their CPU cost back onto Vercel functions.

## Decision rules

- **Never re-add long-lived server caching** (hours/days) to Strapi fetches. The previous
  7-day tier is what produced stale content the webhook could not invalidate.
- If Vercel CPU ever becomes a problem again, the safe lever is a **short bounded revalidate**
  (`next: { revalidate: 60–300 }`) on the layout-data fetches only — fresh within a minute,
  absorbs traffic spikes, no webhook needed. Apply it to a single fetch and measure before
  spreading it.
- Keep client-side fetching for events/activities/files/links. It is the CPU offload strategy,
  not a staleness workaround.
- `revalidate` page exports, `getCacheOptions`, and cache tags are gone — do not reintroduce
  them for Strapi data.
