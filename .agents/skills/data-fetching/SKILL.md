---
name: data-fetching
description: "MUST USE before changing how data is fetched or cached in this repo — touching events/activities/files/links fetching, adding any server-side caching, ISR, revalidation, or cache headers. Encodes the no-store content-freshness model and the decision rules that replaced a removed 7-day-stale cache layer. Triggers: caching, cache, no-store, revalidate, ISR, data fetching, fetch, strapi query, client-side fetch."
---

# Data Fetching & Caching (scoutinglommel.be)

## Content freshness model

All GraphQL responses from Strapi are fetched with `cache: 'no-store'` (`src/api/strapi.ts`).
There is **no server-side Data Cache, no ISR, and no page-level revalidation**:

- CMS edits appear on the **next page load** — no webhook needed, nothing to invalidate.
- Every page render runs the 4 parallel layout-data queries (`getLayoutData`) plus page queries against Strapi.
- `src/app/api/revalidate/route.ts` exists only to acknowledge Strapi's webhook config (auth-gated, returns 200, does nothing).

## Why there is no server cache

A previous caching layer (STATIC 7-day / DYNAMIC 1-hour tiers with `revalidateTag`-style invalidation) **did not work** and was removed:

- The root layout reads `headers()` (for breadcrumbs), which makes routes dynamic. But the layout's data fetch runs **before** `headers()` is called, so Next.js engaged the Data Cache while the HTML stayed dynamic — **stale data, fresh shell**.
- The revalidate webhook could not reliably invalidate those entries: its model whitelist missed most content types (e.g. `home-page`), so `revalidateTag('static-data')` never touched the entries those pages were cached under. Content stayed stale for up to 7 days.

## Client-side fetching (events, activities, files, links)

The `Activities` organism (`src/components/organisms/Activities/`), `FileSection` (`src/components/organisms/FileSection/`), and the dashboard `ActivitiesSection`/`FilesSection` fetch their data **client-side** on mount.

This is deliberate, for two reasons:

1. **Vercel Fluid Active CPU budget** — these queries run in the visitor's browser, not in the serverless function, keeping server CPU usage low on the Pro plan.
2. Client-side fetches bypass Next.js caching entirely (browser → Strapi directly), so they were **never** affected by the stale-data bug. They remain always-fresh by construction.

Do not convert these to server-side fetching to "fix" freshness — they are already fresh, and server-side fetching would move their CPU cost back onto Vercel functions.

## Decision rules

- **Never re-add long-lived server caching** (hours/days) to Strapi fetches. The previous 7-day tier is what produced stale content the webhook could not invalidate.
- If Vercel CPU ever becomes a problem again, the safe lever is a **short bounded revalidate** (`next: { revalidate: 60–300 }`) on the layout-data fetches only — fresh within a minute, absorbs traffic spikes, no webhook needed. Apply it to a single fetch and measure before spreading it.
- Keep client-side fetching for events/activities/files/links. It is the CPU offload strategy, not a staleness workaround.
- `revalidate` page exports, `getCacheOptions`, and cache tags are gone — do not reintroduce them for Strapi data.

## Data flow stack

```
Strapi CMS (GraphQL endpoint)
    ↓
src/api/strapi.ts (core fetcher, always no-store)
    ↓
src/lib/api/{domain}/ (cached wrappers with React cache())
    ↓
src/app/{page}/api.ts (page-specific data functions)
    ↓
Pages call data functions + pass to Blocks/components
```

**Key files:**
- `src/api/strapi.ts` — Core GraphQL fetcher with token auth; fetches are always `no-store`
- `src/lib/api/cache.ts` — `Cache-Control` headers for API route responses only (`getCacheHeaders`)
- `src/lib/api.ts` — `generateApiQuery()` wrapper for type-safe queries
- `codegen.ts` — GraphQL Code Generator config, outputs to `src/types/generated/Graphql.ts`
- `schema.graphql` — **committed**; refreshed by CI on push to main (`.github/workflows/update-schema.yml` introspects Strapi **staging**). Production introspection is disabled, so builds run codegen against the committed schema with `SKIP_FETCH_SCHEMA=1`.

## Reference

Full rationale and history: `docs/data-fetching-and-caching.md`.