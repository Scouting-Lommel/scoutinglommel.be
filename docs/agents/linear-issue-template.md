# Linear issue template (Scouting Lommel)

Paste the description below into a **Team template** in Linear:
`Settings → Your teams → Scouting Lommel → Templates → New template`.

## Template description

> Set these template properties in the Linear UI:
> - **Labels**: leave blank in the template — the creator applies the Type + Area labels to the issue
> - **Status**: `Todo`
> - Leave assignee/priority/project for the creator to fill

```markdown
## Goal

<The outcome, from the user's perspective — why does this matter?>

## What to do

<The concrete work, in order. Reference files/paths where relevant.>

## Acceptance criteria

- [ ] <checkable criteria — a verifier can tick each one>

## Out of scope

<What this ticket deliberately does NOT do — prevents scope creep>
```

## Labels

Apply the Type and Area labels to the issue in the Linear UI (they are labels, not description content). Every ticket gets one from **each** group (groups are single-select):

**Type** (what kind of work, exactly one):

| Label | Color | Meaning |
|-------|-------|---------|
| `Bug` | red | Something is broken |
| `Feature` | purple | New capability |
| `Improvement` | blue | Refinement of existing behavior |

**Area** (where it touches):

| Label | Color | Meaning |
|-------|-------|---------|
| `Frontend` | blue | Next.js UI, components, content blocks, styles, pages |
| `Backend` | purple | Strapi, API, data model, content types |
| `Manual` | orange | Work on the `manual.scoutinglommel.be` repo — the user manual for groepsleiders |
| `Infra` | red | Vercel, Coolify/Hetzner, DNS, CI/CD, env/config |
| `Other` | grey | Does not fit the above |
