---
name: deployment
description: 'MUST USE when deploying, releasing, tagging, rolling back, or touching Vercel/CI-CD configuration for this repo. Covers the two Vercel environments (staging auto-deploy vs production tag-only deploys), the release flow, rollback, and the SKIP_FETCH_SCHEMA build requirement. Triggers: deploy, release, tag, rollback, vercel, production, staging, v* tag.'
---

# Deployment (scoutinglommel.be)

Two Vercel environments (team "Scouting Lommel", hobby plan):

## Staging

- Project `staging.scoutinglommel.be`, URL `staging.scoutinglommel.be`.
- **Auto-deploys on every push to `main`** (Vercel Git integration, production branch = `main`).
- Uses the Strapi **staging** backend (`staging.admin.scoutinglommel.be`).
- Env vars: mix of project-level vars and team **shared variables** (Google/Mailgun/Turnstile/Sheets secrets shared across staging and production). Environment-specific overrides: SITE_URL, NEXT_PUBLIC_APP_ENV, APP_ENV, NEXTAUTH_URL, NEXT_PUBLIC_APP_BACKEND_URL, STRAPI_* tokens, NEXT_PUBLIC_EMAIL_DEV_OVERRIDE; NEXT_PUBLIC_GA_ID omitted; NEXTAUTH_SECRET regenerated.
- `*.vercel.app` URLs are protected by Vercel Authentication; the custom domain is public but `robots.txt` disallows indexing (non-production).

## Production

- Project `scoutinglommel.be`, URLs `scoutinglommel.be` / `www.scoutinglommel.be`.
- **Deploys ONLY when a `v*` git tag is pushed**, via `.github/workflows/deploy-production.yml` (Vercel CLI: `vercel pull` → `vercel build` → `vercel deploy --prebuilt --prod`). Git auto-deploy is disconnected.

## Release flow (production)

1. Ensure `main` is at the commit you want to ship.
2. Create the tag: `git tag vX.Y.Z`.
3. Show the tag and ask the user to confirm before pushing: `git tag -l vX.Y.Z && git log -1 vX.Y.Z`.
4. Only after explicit confirmation: `git push origin vX.Y.Z` (optionally `gh release create vX.Y.Z`).
5. The `Deploy Production` workflow builds and deploys that exact commit.

## Rollback (production)

Create a new, unused tag (e.g. `vX.Y.(Z+1)`) pointing at the previous commit and push that tag — do not reuse or force-push an existing tag. Ask the user to confirm before pushing (`vercel rollback` is Pro/Enterprise-only, unavailable on hobby).

## Build notes

- `SKIP_FETCH_SCHEMA=1` must be set as an env var on BOTH Vercel projects (builds run codegen against the committed `schema.graphql`; live introspection is disabled on production Strapi).
- Both projects use build command `pnpm run build` and Node 24.x.

## Reference

- Provider map and infrastructure details: `docs/deployment.md`.
- Release flow is tag-driven, never push to `main` expecting a production deploy.
