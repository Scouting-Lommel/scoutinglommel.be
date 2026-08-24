# Project Knowledge Base

**Project:** scoutinglommel.be
**Stack:** Next.js 15 (App Router), React 19, TypeScript, GraphQL (Strapi CMS), PostCSS
**Package Manager:** pnpm
**Node Manager:** nvm (see .nvmrc)

## Git Workflow

### General Rules
- **Always fetch** before doing any git operation (`git fetch` or `git pull`)
- **Always branch from the latest remote** — never branch from a stale local branch
- **Always branch from `main`** or the current feature branch, except when explicitly instructed or when there is a logical reason to do otherwise
- **Use atomic commits** — each commit should represent a single, complete, reversible change
- **Work trunk-based** — prefer `rebase` over `merge` to keep history linear and clean

### Commit Amend Rule
When a change is a direct refinement, correction, or closely related follow-up to the **immediately preceding commit**, amend it rather than creating a new commit.

**Use `git commit --amend` when:**
- The change fixes a bug in the previous commit
- The change completes something started in the previous commit
- The change is a minor adjustment that logically belongs with the previous commit
- The previous commit has not been pushed to a shared branch yet

**Do NOT amend when:**
- The previous commit has already been pushed to origin and others may have pulled it
- The change is substantial and deserves its own context in history
- You need to preserve the history for audit/debugging purposes

## Architecture

### Next.js App Router
- Route groups: `(homepage)`, `(sitemap)` — used for organization without affecting URL
- Dynamic routes: `[slug]`, `[key]` — for content pages
- API routes under `src/app/api/` — NextAuth, form handling, revalidation, email
- `src/middleware.ts` — route protection with pattern matching for `/inloggen`, `/dashboard/:path*`, `/playground`

### Data Fetching Stack
```
Strapi CMS (GraphQL endpoint)
    ↓
src/api/strapi.ts (core fetcher)
    ↓
src/lib/api/{domain}/ (cached wrappers with React cache())
    ↓
src/app/{page}/api.ts (page-specific data functions)
    ↓
Pages call data functions + pass to Blocks/components
```

**Key files:**
- `src/api/strapi.ts` — Core GraphQL fetcher with token auth and cache strategy detection
- `src/lib/api/cache.ts` — Cache configurations: STATIC (7d), DYNAMIC (1h), USER (30m), WRITE (none)
- `src/lib/api.ts` — `generateApiQuery()` wrapper for type-safe queries
- `codegen.ts` — GraphQL Code Generator config, outputs to `src/types/generated/Graphql.ts`
- `schema.graphql` — **committed**; refreshed by CI on push to main (`.github/workflows/update-schema.yml` introspects Strapi **staging**, whose schema mirrors production). Production introspection is disabled, so builds run codegen against the committed schema with `SKIP_FETCH_SCHEMA=1` instead of fetching live.

### GraphQL Patterns
- **Fragments** in `src/graphql/*.gql` — one per content block type
- **Page queries** in `src/app/{page}/query.ts` — compose fragments with `gql` tag
- **Fragment naming**: `HeroBlockFragment` on `ComponentContentBlocksHeroBlock`
- **Field aliases** for namespaced CMS fields:
  ```graphql
  fragment HeroBlockFragment on ComponentContentBlocksHeroBlock {
    title: heroTitle
    subtitle: heroSubtitle
    variant: heroVariant
  }
  ```
- `.gql` files loaded via `graphql-tag/loader` in webpack config

### Component Architecture
**Atomic design:** `src/components/{atoms,molecules,organisms}/`
- **Atoms** — smallest reusable pieces (Button, Icon, Input, Divider)
- **Molecules** — composite components (ArticleCard, Breadcrumbs, FaqItem)
- **Organisms** — complex sections (Hero, Footer, Forms, FileSection)

**Content Blocks:** `src/content-blocks/` — dynamic block components matching GraphQL fragments
- Each block has `index.tsx` + `types.ts`
- Blocks receive props directly from GraphQL response (via aliases)
- `src/content-blocks/index.tsx` — dynamic importer mapping `__typename` to components

**Type definitions:** Each component directory has `types.ts` with exported types
- Export pattern: `export type Button = { ... }`
- Component props imported as: `import { Button as ButtonProps } from './types'`

### Styling
- **PostCSS** with `.pcss` files (NOT Tailwind)
- **Global styles**: `src/assets/styles/global.pcss` — imports settings, elements, typography, layouts, utilities
- **Component styles**: `{Component}/{Component}.pcss` alongside component file
- **CSS Custom Properties** in `src/assets/styles/settings/` (colors, spacing, typography, z-index)
- **Build**: `pnpm run build:css` compiles .pcss to .css
- **No CSS-in-JS** — uses PostCSS + CSS custom properties

### i18n
- **next-intl** for internationalization
- Single locale: Dutch (`nl`) — `src/i18n/locales.ts`
- Namespaces: `common`, `dashboard`, `forms` — JSON files in `locales/nl/`
- Messages loaded in root layout for client components

### Forms
- **react-hook-form** + **yup** validation
- Custom `FormBuilder` with configurable field arrays
- Server-side handling via API routes (`src/app/api/*/route.ts`)
- **react-turnstile** for CAPTCHA
- Email templates with **@react-email/components**

### Authentication
- **next-auth** v4 with Google OAuth
- Custom session types in `src/types/next-auth.d.ts`
- Route protection via `src/middleware.ts` (authMiddleware, groupsMiddleware, signinMiddleware)
- Dashboard routes under `/dashboard/` with role-based access

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

## Anti-Patterns

- **Never** rename component props to match CMS field names directly — use GraphQL aliases instead
- **Never** create a new commit for a fixup to the immediately previous commit — amend instead
- **No `@ts-ignore` or `as any`** — strict TypeScript is enforced
- **No `eslint-disable` without justification** — project maintains high code quality standards
- **No HTML `<img>`** — use Next.js `Image` component or custom Image atom
- **No styled-jsx** — use PostCSS files instead

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
| Cache config | `src/lib/api/cache.ts` |

## Tools & Integrations

- **Storybook** — Component development (`src/**/*.stories.ts`)
- **Chromatic** — Visual regression testing
- **react-email** — Email template development (`pnpm run emails`)
- **Vercel** — Hosting with Analytics & Speed Insights
- **Cloudinary** — Image hosting (res.cloudinary.com)
- **Strapi** — Headless CMS (admin.scoutinglommel.be)

## Notes

- **No test framework** is currently configured
- **Image optimization** uses Next.js Image with remotePatterns for Cloudinary and Strapi uploads
- **Fonts**: Montserrat + Nunito Sans via next/font (CSS variables)
- **SVG handling**: `@svgr/webpack` converts SVGs to React components
- **Route revalidation**: Pages use `export const revalidate = 3600` (1 hour) by default
- **pnpm only** — `preinstall` hook enforces pnpm via `only-allow`
