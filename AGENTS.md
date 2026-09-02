# Project Knowledge Base

**Project:** scoutinglommel.be
**Stack:** Next.js 15 (App Router), React 19, TypeScript, GraphQL (Strapi CMS), PostCSS
**Package Manager:** pnpm
**Node Manager:** nvm (see .nvmrc)

## Hard rule: Linear ticket required

Every piece of work MUST be linked to a Linear ticket (`SL-<number>`). Working on something without a ticket is FORBIDDEN unless the user explicitly says so. If no ticket exists for the task, STOP and ask the user. Look up/verify tickets via the Linear MCP. The ticket lives in the branch name: `feature/SL-XXX-slug`. Commit messages are plain imperative summaries (no ticket prefix — commits are squashed on merge, and the ticket reference lands on main via the PR).

Every ticket must live in a project (e.g. Improvements, Documentation, SEO & GEO) and carry at least one **Type** label (`Bug`/`Feature`/`Improvement`) and at least one **Area** label (`Frontend`/`Backend`/`Manual` = work on `manual.scoutinglommel.be`/`Infra`/`Other`). Keep the ticket's status current throughout development: `Backlog` → `Todo` → `In Progress` when starting, → `In Review` when the PR is up, → `Done` when merged. Moving a ticket to `In Review`, `Done`, `Canceled`, or `Duplicate` requires the user's explicit permission — you can ask, but the user must authorize. All acceptance criteria must be genuinely checked (actually verified, not assumed) before a ticket can move to `In Review` or `Done`. Before starting work, ensure the ticket is a complete contract (context, description, acceptance criteria, out of scope) — if it lacks structure, write out the ticket first, asking the user for input when needed. See the `ticket-writing` skill for ticket structure and lifecycle rules.

## Repo skills

Deep reference lives in repo skills (`.agents/skills/`) that auto-load on trigger. This is the single canonical source — other agents (e.g. Claude Code) should read from `.agents/skills/` directly:

| Skill | When to use |
|-------|-------------|
| `git-workflow` | ANY git operation — branch/commit/rebase/PR. Encodes trunk-based rules + the SL- ticket rule (branch `feature/SL-XXX-slug`, commit prefix `SL-XXX: `) |
| `deployment` | Deploying, releasing, tagging, rolling back, or touching Vercel/CI-CD config |
| `data-fetching` | Changing how data is fetched/cached — no-store model, no server cache, client-side fetching rules |
| `content-blocks` | Adding/editing a content block, GraphQL fragment/query, page, or component |
| `ticket-writing` | Creating/editing/grooming Linear tickets — structure, status lifecycle, project assignment |
| `to-tickets`, `to-spec`, `triage`, `wayfinder` | Breaking work into tickets, specs, triage, and large-effort planning (tracker config: `docs/agents/issue-tracker.md` — this repo uses Linear, prefer `ticket-writing`) |
| `implement`, `tdd`, `code-review`, `diagnosing-bugs`, `resolving-merge-conflicts` | Implementation, testing, review, debugging, conflict resolution |
| `writing-for-agents`, `research` | Maintaining AGENTS.md/skills; background research |
| `copywriting`, `copy-editing` | Writing/refining copy for pages and tickets |
| `seo-audit`, `ai-seo`, `schema`, `programmatic-seo`, `site-architecture`, `content-strategy`, `competitors`, `analytics`, `directory-submissions`, `marketing-ideas` | SEO & GEO work — audits, AI-search visibility, structured data, content planning |

## MCP servers

Configured in `opencode.json` (all remote, no secrets): `linear` (tickets), `vercel` (deploys), `mdn` (web docs), `specification-website` (agent-readiness audits).

## Where to Look

| Task | Location |
|------|----------|
| Add/edit a content block | `src/content-blocks/`, `src/graphql/*.gql` |
| Add a new page | `src/app/{route}/page.tsx`, `src/app/{route}/query.ts`, `src/app/{route}/api.ts` |
| Edit global styles | `src/assets/styles/global.pcss`, `src/assets/styles/settings/` |
| Component styles | `{Component}/{Component}.pcss` |
| Add GraphQL query/fragment | `src/graphql/*.gql` |
| Regenerate types from schema | `pnpm codegen` (uses committed `schema.graphql`; `SKIP_FETCH_SCHEMA=1` skips live introspection) |
| Edit auth logic | `src/app/api/auth/[...nextauth]/`, `src/middlewares/` |
| Form validation schemas | `src/components/organisms/Forms/*/types.ts` |
| Email templates | `src/emails/templates/` |
| API response cache headers | `src/lib/api/cache.ts` |

## Anti-Patterns

- **Never** rename component props to match CMS field names directly — use GraphQL aliases instead
- **Never** create a new commit for a fixup to the immediately previous commit — amend instead
- **No `@ts-ignore` or `as any`** — strict TypeScript is enforced
- **No `eslint-disable` without justification** — project maintains high code quality standards
- **No HTML `<img>`** — use Next.js `Image` component or custom Image atom
- **No styled-jsx** — use PostCSS files instead

## Import Order

Enforced by ESLint `import/order`. Order matters:
1. **External** — npm packages
2. **Internal** — `@/` aliases, grouped by path:
   - `@/i18n/**` first
   - `@/lib/**` second
   - `@/types/**` after lib
   - `@/assets/**` after types
   - `@/api/**` after assets
   - `@/content-blocks/**` after api
   - `@/components/**` last among internal
3. **Parent/Sibling** — `../` and `./` imports

## Environment Variables

Required for development (see `.env.example`):
- `NEXT_PUBLIC_APP_BACKEND_URL` — Strapi GraphQL endpoint
- `STRAPI_API_TOKEN` — For queries (read-only on production)
- `STRAPI_MUTATION_API_TOKEN` — For mutations
- `STRAPI_UPLOAD_FILE_TOKEN` — For file uploads (server-side only, via `/api/upload` proxy)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Auth
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` — NextAuth
- `MAILGUN_API_KEY` — Email sending
- Various Google service account keys for Calendar, Sheets, Admin

## Build & Development

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (CSS + Next.js)
pnpm run build        # Production build (CSS + Next.js)
pnpm run lint         # Run all linters (eslint, stylelint, tsc, ls-lint)
pnpm run storybook    # Start Storybook
```

**Note**: `pnpm run lint:typescript` runs `tsc` but also triggers `pnpm install` first, which may fail due to build script approval. Use `npx tsc --noEmit` directly for quick checks.

## Architecture (compact)

- **Data fetching**: Strapi → `src/api/strapi.ts` (always `no-store`) → `src/lib/api/{domain}/` → `src/app/{page}/api.ts` → pages. No server-side Data Cache — see the `data-fetching` skill before touching caching.
- **Components**: atomic design `src/components/{atoms,molecules,organisms}/`; content blocks in `src/content-blocks/` (each `index.tsx` + `types.ts`, dynamic importer maps `__typename`). See the `content-blocks` skill.
- **Styling**: PostCSS `.pcss` (NOT Tailwind), global styles in `src/assets/styles/global.pcss`, component styles co-located, CSS custom properties in `src/assets/styles/settings/`.
- **i18n**: next-intl, single locale Dutch (`nl`) — namespaces `common`, `dashboard`, `forms` in `locales/nl/`.
- **Forms**: react-hook-form + yup, custom `FormBuilder`, server-side via API routes, react-turnstile CAPTCHA, @react-email templates.
- **Auth**: next-auth v4 Google OAuth, session types in `src/types/next-auth.d.ts`, route protection via `src/middleware.ts`, dashboard routes under `/dashboard/` with role-based access.

## Tools & Integrations

- **Storybook** — Component development (`src/**/*.stories.ts`)
- **Chromatic** — Visual regression testing
- **react-email** — Email template development (`pnpm run emails`)
- **Vercel** — Hosting with Analytics & Speed Insights
- **Cloudinary** — Image hosting (res.cloudinary.com)
- **Strapi** — Headless CMS (admin.scoutinglommel.be), self-hosted via Coolify on a Hetzner VPS
- **Linear MCP** — Ticket lookup/verification (see `opencode.json`)

## Notes

- **No test framework** is currently configured
- **Image optimization** uses Next.js Image with remotePatterns for Cloudinary and Strapi uploads
- **Fonts**: Montserrat + Nunito Sans via next/font (CSS variables)
- **SVG handling**: `@svgr/webpack` converts SVGs to React components
- **Content freshness & caching**: GraphQL fetches are `no-store` — CMS edits appear on the next page load. Events/activities/files/links are fetched client-side to offload Vercel CPU. Before adding any server-side caching or changing how these are fetched, read the `data-fetching` skill and `documentation/data-fetching-and-caching.md` — the previous cache layer caused 7-day-stale content and was removed
- **pnpm only** — `preinstall` hook enforces pnpm via `only-allow`
- **Vendored skills** — the 24 skills under `.agents/skills/` copied from `mattpocock/skills` + `coreyhaines31/marketingskills` are tracked in `skills-lock.json`. Refresh with `npx skills update -p --copy`, then commit. The 5 custom skills (git-workflow, deployment, data-fetching, content-blocks, ticket-writing) have no upstream and stay `local` in the lock.

## Documentation

- `documentation/getting-started.md` — onboarding (install, run, lint)
- `documentation/deployment.md` — provider map + environment details
- `documentation/data-fetching-and-caching.md` — caching rationale & decision rules
- `documentation/development-and-git-flow.md` — branch/PR workflow
- `docs/agents/issue-tracker.md` — tracker config for the engineering skills (this repo uses Linear)
- `documentation/content-security-policy.md`, `documentation/dns-aid.md`, `documentation/google-workspace.md`, `documentation/performance-troubleshooting.md` — ops reference