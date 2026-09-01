---
name: ticket-writing
description: "MUST USE when creating, editing, or grooming Linear tickets in this repo — writing ticket titles/descriptions, breaking work into tickets, updating ticket status, or deciding what belongs in a ticket. Combines analyst-style requirements clarity (hidden constraints, ambiguity) with ticket-writing structure and copywriting principles (clarity over cleverness). Triggers: ticket, linear, create issue, edit issue, SL-, backlog, groom, ticket status, ticket description."
---

# Ticket Writing (Linear, scoutinglommel.be)

Every piece of work in this repo is tracked in Linear (`SL-<number>`). This skill governs how tickets are **written, structured, and kept alive** — from creation through completion.

## Non-negotiables

1. **Every ticket lives in a project.** When creating a ticket, always assign it to a project (e.g. Improvements, Documentation, SEO & GEO). A ticket without a project is incomplete.
2. **Status tracks reality.** Update the ticket's status throughout development — never leave it in Backlog or Todo while work is happening:
   - `Backlog` → `Todo` → `In Progress` when you start working on it (a ticket can move into `In Progress` from either `Backlog` or `Todo`)
   - `In Progress` → `In Review` when the PR/branch is up for review — **only with the user's explicit permission**. You can ask for it, but the user must authorize the move.
   - `In Review` → `Done` when merged/completed — **only with the user's explicit permission**. You can ask for it, but the user must authorize the move.
   - `Canceled` when the work is abandoned (with a comment saying why) — only with the user's explicit permission.
   - `Duplicate` when the ticket duplicates another — only with the user's explicit permission.
   - Moving a ticket to `In Review`, `Done`, `Canceled`, or `Duplicate` without user authorization is forbidden.
3. **Acceptance criteria must be genuinely checked before `In Review` or `Done`.** Every acceptance criterion on the ticket must be verified — actually exercised (run the command, test the behavior, check the output), not assumed or claimed — before the ticket can move to `In Review` or `Done`. If a criterion cannot be verified, say so and ask the user how to proceed; never move the ticket forward with unverified criteria.
3. **Tickets are written for the next reader** — a human or agent picking it up cold, possibly weeks later.

## Ticket readiness gate (before starting work)

Before starting work on a ticket, check that it has the required structure: context (Goal), description (What to do), acceptance criteria, and out of scope. If the ticket is missing any of these — or the existing content is vague, ambiguous, or incomplete — **write out the ticket first**: fill in the missing structure so the ticket is a complete contract before any work begins. Ask the user for input when needed (when the missing content is a decision only the user can make, or the request is too vague to resolve yourself). Never start work on a ticket that is not a complete contract.

## Duplicate check (before creating a new ticket)

Before creating a NEW ticket, search Linear for existing tickets that may already cover the work. Use the Linear MCP's server-side search (`list_issues` with a `query` of the intended title/description keywords) — this is one indexed query, fast at any ticket count (20 or 2,000 tickets, same cost). Never fetch the full issue list and scan it client-side — that is the slow path.

If a close match exists (same outcome or scope):

- Do NOT create a duplicate. Surface the existing ticket to the user and let them decide: reuse it, mark the new one as `Duplicate`, or proceed anyway.
- Only flag close matches — same outcome/scope — not loose keyword overlaps.

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