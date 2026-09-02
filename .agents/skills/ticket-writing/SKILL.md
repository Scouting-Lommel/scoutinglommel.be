---
name: ticket-writing
description: 'MUST USE when creating, editing, or grooming Linear tickets in this repo — writing ticket titles/descriptions, breaking work into tickets, updating ticket status, or deciding what belongs in a ticket. ALWAYS load the copywriting skill before writing ticket text. Combines analyst-style requirements clarity (hidden constraints, ambiguity) with ticket-writing structure and copywriting principles (clarity over cleverness). Triggers: ticket, linear, create issue, edit issue, SL-, backlog, groom, ticket status, ticket description.'
---

# Ticket Writing (Linear, scoutinglommel.be)

Every piece of work in this repo is tracked in Linear (`SL-<number>`). This skill governs how tickets are **written, structured, and kept alive**, from creation through completion.

## Non-negotiables

1. **Every ticket lives in a project.** When creating a ticket, always assign it to a project (e.g. Improvements, Documentation, SEO & GEO). A ticket without a project is incomplete. A project is a bigger feature/story containing issues — see `docs/agents/linear-project-template.md` for when to create a project and its lifecycle.
2. **Every new ticket is assigned to the authenticated MCP user.** When creating a ticket, set `assignee` to `me` (which resolves to whoever is authenticated with the Linear MCP). A ticket without an assignee is incomplete.
3. **Every ticket carries at least one Type label AND one Area label.**
   - **Type** (what kind of work, exactly one): `Bug`, `Feature`, or `Improvement`.
   - **Area** (where it touches, exactly one): `Frontend` (Next.js UI/components/blocks/styles), `Backend` (Strapi/API/data), `Manual` (work on the `manual.scoutinglommel.be` repo — the user manual for groepsleiders), `Infra` (Vercel/Coolify/DNS/CI/CD), `Other` (does not fit the above), or `Multi` (spans multiple areas — see the multi-area rule below).
   - A ticket missing either a Type or an Area label is incomplete. Fix it before any work starts.
   - **A lowest-level ticket should have exactly ONE Area label.** Multi-area work is expressed with the `Multi` label: a ticket with `Area/Multi` must have sub-issues, one per area, each carrying its own single Area label, and only with the user's explicit approval. Prefer splitting into separate single-area tickets unless the user says otherwise.
4. **Status tracks reality.** Update the ticket's status throughout development — never leave it in Backlog or Todo while work is happening:
   - `Backlog` → `Todo` → `In Progress` when you start working on it (a ticket can move into `In Progress` from either `Backlog` or `Todo`)
   - `In Progress` → `In Review` when the PR/branch is up for review. No explicit permission needed, but only valid while a PR is open. If no PR is open, the ticket stays `In Progress`.
   - `In Review` → `Acceptancy` when the change is live on staging. **Only with the user's explicit permission.** You can ask for it, but the user must authorize the move.
   - `Acceptancy` → `Done` when the change is live on production. **Only with the user's explicit permission.** You can ask for it, but the user must authorize the move.
   - `Canceled` when the work is abandoned (with a comment saying why). Only with the user's explicit permission.
   - `Duplicate` when the ticket duplicates another. Only with the user's explicit permission.
   - Moving a ticket to `Acceptancy`, `Done`, `Canceled`, or `Duplicate` without user authorization is forbidden.
5. **Acceptance criteria must be genuinely checked before `Acceptancy` or `Done`.** Every acceptance criterion on the ticket must be verified, actually exercised (run the command, test the behavior, check the output), not assumed or claimed, before the ticket can move to `Acceptancy` or `Done`. If a criterion cannot be verified, say so and ask the user how to proceed; never move the ticket forward with unverified criteria.
6. **Tickets are written for the next reader**: a human or agent picking it up cold, possibly weeks later.

## Multi-area tickets (Multi label + sub-issues)

A ticket that spans multiple areas carries the **`Area/Multi`** label instead of a single area label. This is allowed **only with the user's explicit approval** (see non-negotiable #3), and the ticket **must** have sub-issues covering every area:

- **One sub-issue per area, minimum.** Every area in the work maps to at least one sub-issue (in Linear, via the parent ticket's sub-issues) covering that area's slice. Never let a single sub-issue silently absorb multiple areas.
- **Sub-issues carry the real area labels.** Each sub-issue gets its own single Area label (`Frontend`, `Backend`, etc.) — the parent carries `Multi`, the sub-issues carry the specifics.
- **Verify per area.** Acceptance criteria touching an area are checked against that area's sub-issue before the ticket can move to `Acceptancy` or `Done`.
- **Prefer splitting.** If the areas are independent enough, split the ticket into separate top-level single-area tickets instead of a `Multi` ticket with sub-issues — that is the default; `Multi` is the exception.

(Execution orchestration — e.g. one agent per area — is the orchestrator's concern, not the ticket's.)

## Ticket readiness gate (before starting work)

Before starting work on a ticket, check that it has the required structure: context (Goal), description (What to do), acceptance criteria, and out of scope, plus a project, an assignee (set `me` for new tickets — resolves to the authenticated MCP user), and at least one **Type** label (`Bug`/`Feature`/`Improvement`) and at least one **Area** label (`Frontend`/`Backend`/`Manual`/`Infra`/`Other`/`Multi`). A lowest-level ticket should have exactly ONE Area label — if it carries `Multi`, confirm the user explicitly approved the multi-area scope AND that sub-issues exist for every area before starting. If the ticket is missing any of these, or the existing content is vague, ambiguous, or incomplete, **write out the ticket first**: fill in the missing structure so the ticket is a complete contract before any work begins. Ask the user for input when needed (when the missing content is a decision only the user can make, or the request is too vague to resolve yourself). Never start work on a ticket that is not a complete contract.

The canonical ticket structure lives in the Linear team template (`docs/agents/linear-issue-template.md`). Prefer its shape when writing tickets.

## Duplicate check (before creating a new ticket)

Before creating a NEW ticket, search Linear for existing tickets that may already cover the work. Use the Linear MCP's server-side search (`list_issues` with a `query` of the intended title/description keywords). This is one indexed query, fast at any ticket count (20 or 2,000 tickets, same cost). Never fetch the full issue list and scan it client-side — that is the slow path.

If a close match exists (same outcome or scope):

- Do NOT create a duplicate. Surface the existing ticket to the user and let them decide: reuse it, mark the new one as `Duplicate`, or proceed anyway.
- Only flag close matches (same outcome/scope), not loose keyword overlaps.

## Analyst phase (before writing)

Think like an analyst before drafting. For each ticket, resolve:

- **The outcome**: what does "done" look like, in one sentence? If you can't state it, the ticket isn't ready.
- **Hidden constraints**: what must NOT change (existing behavior, API contracts, performance budgets, the no-cache data-fetching rules)?
- **Ambiguity**: any term or scope that could mean two things? Nail it down or flag it as an open question in the ticket.
- **Blast radius**: what else does this touch? Note affected files/areas so the implementer knows the edges.

If the request is vague, ask the user sharp questions BEFORE creating the ticket. A ticket is a contract, not a placeholder.

## Ticket structure

### Title

- Imperative, outcome-shaped: "Add user authentication feature", not "Authentication stuff"
- Include the ticket id context only where useful (the id is automatic; don't duplicate it in the title)
- Under ~60 characters; scannable in a list

### Description

The description is the **issue contract** — what the problem is, what must be done, and how we know it's done. It is NOT a development log: do not write "what was done" content (implementation history, verification results, commit lists) into the description. That belongs nowhere unless it adds context — and if it does, it goes in a comment, not the description.

Follow this shape (markdown):

```markdown
## Goal

<the outcome, from the user's perspective — why does this matter?>

## What to do

<the concrete work, in order. Reference files/paths where relevant.>

## Acceptance criteria

- [ ] <checkable, agent-executable criteria — a verifier can tick each one>
- [ ] <each criterion is a testable behavior, not an activity>

## Out of scope

<what this ticket deliberately does NOT do — prevents scope creep>
```

### Comments

Only add a comment if it **absolutely adds to the context of the ticket**: a decision that changes the plan, a blocker, a link to the PR/branch, a reason for canceling. Default is no comments. Never use comments to log progress, restate the description, or record what was done.

### Copywriting (mandatory before writing tickets)

**Load the `copywriting` skill before writing or editing any ticket**. Titles and descriptions are written with the copywriting skill applied, every time. Do not write ticket text from the raw principles alone; invoke the skill and follow its process. Its core rules:

- **Clarity over cleverness**: if a reader has to decode your title or description, rewrite it. Clear beats creative, every time.
- **Concrete over abstract**: name the files, the endpoints, the components. "Improve the hero" is a wish; "Add a variant prop to the Hero block and wire it through the fragment" is a ticket.
- **One ticket, one outcome**: if a description contains "and also", split it. Each ticket is a single, verifiable slice.
- **Scannable**: short paragraphs, lists, checkboxes. The next reader skims first, reads second.

## Breaking work into tickets

When a piece of work is bigger than one ticket:

- Prefer **vertical slices** (see the `to-tickets` skill): each ticket cuts a narrow but complete path through the layers and is verifiable on its own.
- Declare **blocking edges**: ticket B blocked by ticket A when A must land first. A ticket with no blockers can start immediately.
- Keep each ticket sized to fit a single fresh context window.
- For wide mechanical refactors (rename across the codebase), sequence as expand-contract instead of forcing a vertical slice.

## Editing existing tickets

- **Status first**: is the current status accurate? Update it before touching anything else.
- **Description stays a contract**: edit it only when the plan itself changed (scope, acceptance criteria, out of scope). Never turn it into a log.
- **Comments are rare**: add one only when it absolutely adds context (a plan-changing decision, a blocker, a PR link, a cancel reason). Otherwise leave the ticket silent.
- **Close the loop**: when a ticket is Done, the description or a comment should note what actually shipped (and the PR/commit reference if useful), only if that adds context a future reader needs.

## Related skills

- `to-tickets` — breaking plans/specs into tracer-bullet tickets with blocking edges
- `triage` — moving issues through a state machine, writing agent-ready briefs
- `to-spec` — turning a conversation into a spec published to the tracker
- `wayfinder` — mapping huge efforts as decision tickets
- `copywriting` — MANDATORY: load before writing/editing any ticket
- `git-workflow` — the SL- ticket rule for branches (branch `feature/SL-XXX-slug`, plain imperative commits)
