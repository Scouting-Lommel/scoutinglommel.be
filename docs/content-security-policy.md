# Content Security Policy — Evaluation & Decision

## Current state

Security headers are set in `next.config.mjs` (`async headers()`):

| Header                   | Value                                      |
| :----------------------- | :----------------------------------------- |
| `X-Content-Type-Options` | `nosniff`                                  |
| `X-Frame-Options`        | `SAMEORIGIN`                               |
| `X-XSS-Protection`       | `1; mode=block`                            |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`          |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=()` |

No `Content-Security-Policy` header is currently sent. This document evaluates adding one.

## External resource inventory

Every origin the site must allow, mapped to the directive that needs it:

| Origin                                                                                                | Used for                                                                                                | Directive                                |
| :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| `'self'`                                                                                              | Next.js assets, `/_next/`, `/api/*`, `/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js` | all                                      |
| `https://www.googletagmanager.com`                                                                    | gtag.js loader (`<Script>`)                                                                             | `script-src`                             |
| inline GA dataLayer snippet (`layout.tsx`)                                                            | analytics init                                                                                          | `script-src`                             |
| `https://challenges.cloudflare.com`                                                                   | Turnstile widget script + iframe (Captcha atom)                                                         | `script-src`, `frame-src`, `connect-src` |
| `https://va.vercel-scripts.com`                                                                       | Analytics & SpeedInsights beacons                                                                       | `connect-src`                            |
| `https://www.google-analytics.com`, `https://stats.g.doubleclick.net`, `https://analytics.google.com` | GA tracking beacons                                                                                     | `connect-src`                            |
| `https://www.google.com/maps/embed/...`                                                               | Google Maps iframe (Map atom)                                                                           | `frame-src`                              |
| `https://res.cloudinary.com`                                                                          | Cloudinary images                                                                                       | `img-src`                                |
| `https://admin.scoutinglommel.be`, `https://staging.admin.scoutinglommel.be`                          | Strapi uploads                                                                                          | `img-src`                                |
| `data:`                                                                                               | SVG blur placeholders (`Image` atom `blurDataURL`)                                                      | `img-src`                                |
| `'self'` (+ `data:` fallback)                                                                         | next/font assets + inline font styles                                                                   | `font-src`, `style-src`                  |
| `'self'`                                                                                              | all form posts (`/api/*`)                                                                               | `form-action`                            |

All JSON-LD blocks (`application/ld+json` in `BreadcrumbJsonLd`, `EventsBlock`, homepage layout) are inert data blocks and are **not** blocked by `script-src` — no allowance needed.

## Evaluation

### Option A — Static pragmatic CSP (via `next.config.mjs` `headers()`)

```text
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://res.cloudinary.com https://admin.scoutinglommel.be https://staging.admin.scoutinglommel.be;
font-src 'self' data:;
connect-src 'self' https://va.vercel-scripts.com https://www.google-analytics.com https://stats.g.doubleclick.net https://analytics.google.com https://challenges.cloudflare.com;
frame-src 'self' https://www.google.com https://challenges.cloudflare.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self'
```

Prerequisites before shipping:

- [ ] Confirm `Content-Security-Policy-Report-Only` in a staging/preview deploy first.
- [ ] Verify Turnstile still renders on `/inschrijven` (it loads extra `challenges.cloudflare.com` assets at runtime; may need `script-src` + `connect-src` additions).
- [ ] Verify Google Maps embed renders on verhuur pages that include a Map block.

Still **protects** against: injected external scripts (only 2 external script hosts allowed), `eval()`, `data:`/`blob:` script execution, object/embed injection, cross-site exfiltration to unknown endpoints, clickjacking via frames.
**Does not** mitigate: same-host inline XSS that injects its own `<script>` — `'unsafe-inline'` is required in `script-src` because Next.js emits inline bootstrap scripts (RSC payload) and the GA snippet is inline.

### Option B — Strict nonce-based CSP (via middleware)

End-to-end nonce flow:

1. `src/middleware.ts` generates a random nonce per request and stores it as the `x-nonce` response header (the middleware matcher already covers all routes).
2. `src/app/layout.tsx` reads the nonce via `headers()` (`layout.tsx:5,75`) and passes it as the `nonce` prop to every inline `<Script>` component, including the GA dataLayer snippet.
3. The CSP header in `next.config.mjs` references the same nonce value via `'nonce-<value>'`.

Trade-offs — **not recommended right now**:

- `src/app/layout.tsx` already calls `headers()` at lines 5 and 75, so **every route is already opted into dynamic rendering**. Adding nonce reads does not change this — the incremental impact is only the nonce generation in middleware and threading the value through the CSP header and Script props.
- Medium-term alternative: serve the GA dataLayer snippet from a real file in `/public` (removing the inline script) — then a strict CSP becomes viable without any additional dynamic overhead. Requires GA snippet refactor + re-verification of the `_next` inline bootstrap scripts.

## Decision

**Adopt Option A** — a pragmatic, static CSP in `next.config.mjs` — rolled out via `Content-Security-Policy-Report-Only` first, then enforced.

Rationale:

1. Near-zero runtime cost (static header, no middleware change). Routes are already dynamic because `src/app/layout.tsx` calls `headers()` at lines 5 and 75; adding a nonce read in middleware would not change the rendering mode.
2. Existing `X-Frame-Options: SAMEORIGIN` can eventually be replaced by `frame-ancestors 'self'`.
3. `'unsafe-inline'` in `script-src` is the pragmatic norm for Next.js App Router apps with inline GA snippets; the remaining directives still raise the bar meaningfully.
4. Option B is tracked as a follow-up if/when the GA snippet moves to an external file.

## Follow-up

- [ ] Add CSP header to `next.config.mjs` (report-only on staging first).
- [ ] Optionally migrate GA dataLayer snippet to `/public` to enable strict nonce CSP later.
