---
name: ticket-writing
description: "MUST USE when creating, editing, or grooming Linear tickets in this repo — writing ticket titles/descriptions, breaking work into tickets, updating ticket status, or deciding what belongs in a ticket. Combines analyst-style requirements clarity (hidden constraints, ambiguity) with ticket-writing structure and copywriting principles (clarity over cleverness). Triggers: ticket, linear, create issue, edit issue, SL-, backlog, groom, ticket status, ticket description."
---

# Ticket Writing (Linear, scoutinglommel.be)

Every piece of work in this repo is tracked in Linear (`SL-<number>`). This skill governs how tickets are **written, structured, and kept alive** — from creation through completion.

## Non-negotiables

1. **Every ticket lives in a project.** When creating a ticket, always assign it to a project (e.g. Improvements, Documentation, SEO & GEO). A ticket without a project is incomplete.
2. **Status tracks reality.** Update the ticket's status throughout development — never leave it in Backlog while work is happening:
   - `Backlog` → `In Progress` when you start working on it
   - `In Progress` → `In Review` when the PR/branch is up for review
   - `In Review` → `Done` when merged/completed
   - `Canceled` when the work is abandoned (with a comment saying why)
3. **Tickets are written for the next reader** — a human or agent picking it up cold, possibly weeks later.

## Analyst phase (before writing)

Think like an analyst before drafting. For each ticket, resolve:

- **The outcome**: what does "done" look like, in one sentence? If you can't state it, the ticket isn't ready.
- **Hidden constraints**: what must NOT change (existing behavior, API contracts, performance budgets, the no-cache data-fetching rules)?
- **Ambiguity**: any term or scope that could mean two things? Nail it down or flag it as an open question in the ticket.
- **Blast radius**: what else does this touch? Note affected files/areas so the implementer knows the edges.

If the request is vague, ask the user sharp questions BEFORE creating the ticket — a ticket is a contract, not a placeholder.

## Ticket structure

### Title

- Imperative, outcome-shaped: "Add user authentication feature", not "Authentication stuff"
- Include the ticket id context only where useful (the id is automatic — don't duplicate it in the title)
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

Only add a comment if it **absolutely adds to the context of the ticket** — a decision that changes the plan, a blocker, a link to the PR/branch, a reason for canceling. Default is no comments. Never use comments to log progress, restate the description, or record what was done.

### Copywriting principles (from the copywriting skill)

- **Clarity over cleverness** — if a reader has to decode your title or description, rewrite it. Clear beats creative, every time.
- **Concrete over abstract** — name the files, the endpoints, the components. "Improve the hero" is a wish; "Add a variant prop to the Hero block and wire it through the fragment" is a ticket.
- **One ticket, one outcome** — if a description contains "and also", split it. Each ticket is a single, verifiable slice.
- **Scannable** — short paragraphs, lists, checkboxes. The next reader skims first, reads second.

## Breaking work into tickets

When a piece of work is bigger than one ticket:

- Prefer **vertical slices** (see the `to-tickets` skill): each ticket cuts a narrow but complete path through the layers and is verifiable on its own.
- Declare **blocking edges** — ticket B blocked by ticket A when A must land first. A ticket with no blockers can start immediately.
- Keep each ticket sized to fit a single fresh context window.
- For wide mechanical refactors (rename across the codebase), sequence as expand–contract instead of forcing a vertical slice.

## Editing existing tickets

- **Status first**: is the current status accurate? Update it before touching anything else.
- **Description stays a contract**: edit it only when the plan itself changed (scope, acceptance criteria, out of scope). Never turn it into a log.
- **Comments are rare**: add one only when it absolutely adds context (a plan-changing decision, a blocker, a PR link, a cancel reason). Otherwise leave the ticket silent.
- **Close the loop**: when a ticket is Done, the description or a comment should note what actually shipped (and the PR/commit reference if useful) — only if that adds context a future reader needs.

## Related skills

- `to-tickets` — breaking plans/specs into tracer-bullet tickets with blocking edges
- `triage` — moving issues through a state machine, writing agent-ready briefs
- `to-spec` — turning a conversation into a spec published to the tracker
- `wayfinder` — mapping huge efforts as decision tickets
- `copywriting` — the clarity principles this skill borrows
- `git-workflow` — the SL- ticket rule for branches/commits (branch `feature/SL-XXX-slug`, commit prefix `SL-XXX: `)