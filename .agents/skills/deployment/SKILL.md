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

1. Bump `package.json` to the version you are about to release and merge it to `main`.
2. Ensure `main` is at the commit you want to ship.
3. Create the tag: `git tag vX.Y.Z`.
4. Show the tag and ask the user to confirm before pushing: `git tag -l vX.Y.Z && git log -1 vX.Y.Z`.
5. Only after explicit confirmation: `git push origin vX.Y.Z` (optionally `gh release create vX.Y.Z`).
6. The `Deploy Production` workflow runs `Verify tag matches package.json version` before install and fails when the tag is not `v${package.json.version}`. That guard is what keeps the console version truthful.
7. After deploying, check Linear for tickets in `Acceptancy` whose commits are now in the tag. Move them to `Done` (with user permission). Use `git log --oneline vX.Y.Z` to see which commits are in the tag, and match them to Linear tickets.

## Rollback (production)

Revert the offending commits on `main`, bump `package.json` to a new patch version (e.g. `vX.Y.(Z+1)`), merge, then tag that commit and push the tag. Re-tagging an older commit no longer works: it carries the old `package.json` version, and the deploy workflow rejects the mismatch. Do not reuse or force-push an existing tag. Ask the user to confirm before pushing (`vercel rollback` is Pro/Enterprise-only, unavailable on hobby).

## Build notes

- `SKIP_FETCH_SCHEMA=1` must be set as an env var on BOTH Vercel projects (builds run codegen against the committed `schema.graphql`; live introspection is disabled on production Strapi).
- Both projects use build command `pnpm run build` and Node 24.x.
- The root layout logs `[scoutinglommel.be] vX.Y.Z · <sha> · <env>` in the browser console. `NEXT_PUBLIC_APP_VERSION` comes from `package.json`, so the version bump must land before the tag.

## Reference

- Provider map and infrastructure details: `docs/deployment.md`.
- Release flow is tag-driven, never push to `main` expecting a production deploy.
