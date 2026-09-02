# Linear issue template (Scouting Lommel)

Paste the description below into a **Team template** in Linear:
`Settings → Your teams → Scouting Lommel → Templates → New template`.

## Template description

> Set these template properties in the Linear UI:
> - **Labels**: leave blank in the template — the creator picks the area label(s) at creation time (see below)
> - **Status**: `Todo`
> - Leave assignee/priority/project for the creator to fill

```markdown
## Goal

<The outcome, from the user's perspective — why does this matter?>

## Area (required — pick at least one label)

- [ ] Frontend — Next.js UI, components, content blocks, styles, pages
- [ ] Backend — Strapi, API, data model, content types
- [ ] Manual — work on the `manual.scoutinglommel.be` repo (user manual for groepsleiders)
- [ ] Infra — Vercel, Coolify/Hetzner, DNS, CI/CD, env/config
- [ ] Other — does not fit the above

## What to do

<The concrete work, in order. Reference files/paths where relevant.>

## Acceptance criteria

- [ ] <checkable, agent-executable criteria — a verifier can tick each one>

## Out of scope

<What this ticket deliberately does NOT do — prevents scope creep>
```

## Area labels

These workspace labels exist (created via the Linear API). Apply at least one per ticket so the work area is visible at a glance on the board:

| Label | Color | Meaning |
|-------|-------|---------|
| `Frontend` | blue | Next.js UI, components, content blocks, styles, pages |
| `Backend` | purple | Strapi, API, data model, content types |
| `Manual` | orange | Work on the `manual.scoutinglommel.be` repo — the user manual for groepsleiders |
| `Infra` | red | Vercel, Coolify/Hetzner, DNS, CI/CD, env/config |
| `Other` | grey | Does not fit the above |
