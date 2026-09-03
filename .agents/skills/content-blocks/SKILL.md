---
name: content-blocks
description: "MUST USE when adding or editing a content block, GraphQL fragment/query, page, or component in this repo. Covers the Next.js App Router layout, GraphQL fragment + field-alias patterns, atomic component architecture, content-block dynamic importer, and PostCSS styling conventions. Triggers: content block, fragment, graphql query, add page, component, atomic design, pcss, styling, content-blocks."
---

# Content Blocks & Architecture (scoutinglommel.be)

## Next.js App Router layout

- Route groups: `(homepage)`, `(sitemap)`, organization without affecting URL.
- Dynamic routes: `[slug]`, `[key]`, for content pages.
- API routes under `src/app/api/`, NextAuth, form handling, revalidation, email.
- `src/middleware.ts`, route protection with pattern matching for `/inloggen`, `/dashboard/:path*`, `/playground`.

## GraphQL patterns

- **Fragments** in `src/graphql/*.gql`, one per content block type.
- **Page queries** in `src/app/{page}/query.ts`, compose fragments with `gql` tag.
- **Fragment naming**: `HeroBlockFragment` on `ComponentContentBlocksHeroBlock`.
- **Field aliases** for namespaced CMS fields, never rename component props to match CMS field names; use GraphQL aliases instead:
  ```graphql
  fragment HeroBlockFragment on ComponentContentBlocksHeroBlock {
    title: heroTitle
    subtitle: heroSubtitle
    variant: heroVariant
  }
  ```
- `.gql` files loaded via `graphql-tag/loader` in webpack config.

## Component architecture

**Atomic design:** `src/components/{atoms,molecules,organisms}/`
- **Atoms**, smallest reusable pieces (Button, Icon, Input, Divider)
- **Molecules**, composite components (ArticleCard, Breadcrumbs, FaqItem)
- **Organisms**, complex sections (Hero, Footer, Forms, FileSection)

**Content Blocks:** `src/content-blocks/`, dynamic block components matching GraphQL fragments
- Each block has `index.tsx` + `types.ts`
- Blocks receive props directly from GraphQL response (via aliases)
- `src/content-blocks/index.tsx`, dynamic importer mapping `__typename` to components

**Type definitions:** Each component directory has `types.ts` with exported types
- Export pattern: `export type Button = { ... }`
- Component props imported as: `import { Button as ButtonProps } from './types'`

## Styling

- **PostCSS** with `.pcss` files (NOT Tailwind, no CSS-in-JS, no styled-jsx).
- **Global styles**: `src/assets/styles/global.pcss`, imports settings, elements, typography, layouts, utilities.
- **Component styles**: `{Component}/{Component}.pcss` alongside component file.
- **CSS Custom Properties** in `src/assets/styles/settings/` (colors, spacing, typography, z-index).
- **Build**: `pnpm run build:css` compiles .pcss to .css.

## Where to look

| Task | Location |
|------|----------|
| Add/edit a content block | `src/content-blocks/`, `src/graphql/*.gql` |
| Add a new page | `src/app/{route}/page.tsx`, `src/app/{route}/query.ts`, `src/app/{route}/api.ts` |
| Edit global styles | `src/assets/styles/global.pcss`, `src/assets/styles/settings/` |
| Component styles | `{Component}/{Component}.pcss` |
| Add GraphQL query/fragment | `src/graphql/*.gql` |
| Regenerate types from schema | `pnpm codegen` (uses committed `schema.graphql`; `SKIP_FETCH_SCHEMA=1` skips live introspection) |

## Related

- Data fetching/caching rules: the `data-fetching` skill.
- i18n: next-intl, single locale Dutch (`nl`), namespaces `common`, `dashboard`, `forms` in `locales/nl/`.
- Forms: react-hook-form + yup, custom `FormBuilder`, server-side via API routes, react-turnstile CAPTCHA, @react-email templates.
- Auth: next-auth v4 Google OAuth, session types in `src/types/next-auth.d.ts`, route protection via `src/middleware.ts`, dashboard routes under `/dashboard/` with role-based access.