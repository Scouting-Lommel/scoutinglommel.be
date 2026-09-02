# Deployment

## Table of contents

- [Resource providers](#resource-providers)
  - [DNS](#dns)
  - [Frontend hosting](#frontend-hosting)
  - [Backend hosting](#backend-hosting)
  - [Error tracking](#error-tracking)
- [Environments](#environments)

## Resource providers

| Resource       | Provider                                                          | Comments                                                                         |
| :------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| DNS            | [CloudFlare](https://www.cloudflare.com/)                         | DNS management with caching & DDoS protection.                                   |
| Frontend app   | [Vercel](https://vercel.com)                                      | Dynamic hosting with automatic CI/CD for FE app.                                 |
| Backend CMS    | Self-hosted [Coolify](https://coolify.io) on a [Hetzner](https://www.hetzner.com) VPS | Strapi CMS, containerized via Coolify.                                            |
| Database       | MySQL database hosted on [Vimexx](https://www.vimexx.be/)         | Both the development and production environments have a separate MySQL database. |
| E-mail setup   | [Google Workspace for Non-Profits](https://workspace.google.com/) | Check out the [Google Workspace setup docs](/documentation/google-workspace.md). |

### DNS

DNS records are managed by [CloudFlare](https://www.cloudflare.com). Other than features like SSL and caching, CloudFlare also offers a layer of securities like DDoS protection.

### Frontend hosting

Deployments for this project are fully automated using [Vercel](https://vercel.com) with the following deployment strategy:

- **Staging:** every push to the `main` branch automatically triggers a build and deployment to the staging environment (`staging.scoutinglommel.be`).
- **Production:** deploys **only** when a `v*` git tag is pushed, via `.github/workflows/deploy-production.yml` (Vercel CLI: `vercel pull` → `vercel build` → `vercel deploy --prebuilt --prod`). Git auto-deploy is disconnected for production.
- **Build process:** Vercel automatically runs `pnpm run build` and deploys the built application from the `.next` directory.
- **Schema note:** `SKIP_FETCH_SCHEMA=1` must be set on both Vercel projects — builds run codegen against the committed `schema.graphql` (live introspection is disabled on production Strapi). Both projects use Node 24.x.

### Backend hosting

The website's backend CMS is a [Strapi](https://www.strapi.io) instance, containerized and deployed on a **self-hosted [Coolify](https://coolify.io) instance running on a [Hetzner](https://www.hetzner.com) VPS**. Deployments are triggered via Coolify's Git integration (push to the backend repo's `main` branch).

### Error tracking

Sentry was previously implemented but **removed because it did not work** — it is not currently active. It may be re-added later; until then, monitoring is limited to Vercel Analytics and browser-side tooling.

## Environments

This project consists of two environments:

| Environment | Branch | Deploy trigger | Purpose        |
| :---------- | :----- | :------------- | :------------- |
| Staging     | `main` | Push to `main` | Test environment |
| Production  | `main` | `v*` git tag   | Public website |

## Performance & Optimization

### Vercel Configuration

The project is configured for Vercel deployment with:

- Automatic Next.js optimization and caching
- Built-in image optimization
- Automatic compression and performance optimizations
- Edge network distribution for global performance

### Next.js Optimization

- **No ISR/Data Cache for CMS content**: Strapi fetches are `no-store` so CMS edits appear on the next page load (see [Data Fetching & Caching](./data-fetching-and-caching.md))
- **Bundle Splitting**: Dynamic imports for content blocks
- **Image Optimization**: Next.js Image component with Cloudinary integration

### Monitoring

- **Vercel Analytics**: Built-in performance monitoring and insights
- **Browser Performance**: Lighthouse scores monitored in CI/CD

For detailed performance troubleshooting, see [Performance & Troubleshooting Guide](./performance-troubleshooting.md).
