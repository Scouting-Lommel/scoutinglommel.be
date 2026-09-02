# Issue tracker

Work for this repo is tracked in **Linear** (workspace: Scouting Lommel, team key `SL-`).

- Tickets are created/edited via the **Linear MCP** (see `opencode.json`) — not `gh issue create`, not local markdown.
- Ticket structure, lifecycle, and status rules: see the `ticket-writing` skill (`.agents/skills/ticket-writing/SKILL.md`) and the canonical templates at `docs/agents/linear-issue-template.md` (issues) and `docs/agents/linear-project-template.md` (projects).
- Every piece of work MUST be linked to a Linear ticket (`SL-<number>`); working without a ticket is forbidden unless the user explicitly says so.
- Every ticket must carry at least one **Type** label and at least one **Area** label:
  - **Type** (what kind of work, exactly one): `Bug`, `Feature`, or `Improvement`
  - **Area** (where it touches): `Frontend`, `Backend`, `Manual` (work on the `manual.scoutinglommel.be` repo — the user manual for groepsleiders), `Infra`, or `Other`
  - So both the work kind and the work area are visible at a glance on the board.
- Branch naming: `feature/SL-XXX-short-slug`. Commit messages are plain imperative summaries (no ticket prefix — the branch carries the ticket; commits are squashed on merge).

## For the engineering skills (to-tickets, triage, to-spec, wayfinder)

These skills assume a GitHub/GitLab/local tracker. This repo uses **Linear** instead:

- **Publishing tickets** (`to-tickets`): publish via the Linear MCP (`linear_save_issue`), one issue per ticket in dependency order, using Linear's native blocking/sub-issue relationships. Apply the `ready-for-agent` triage label if the repo uses it.
- **Triage** (`triage`): the Linear statuses are `Backlog`, `Todo`, `In Progress`, `In Review`, `Done`, `Canceled`, `Duplicate`. Map the triage roles onto these + Linear labels rather than GitHub issue labels.
- **Specs** (`to-spec`): publish the spec as a Linear ticket description (Goal / What to do / Acceptance criteria / Out of scope).
- When in doubt, prefer the `ticket-writing` skill — it is Linear-native and encodes this repo's exact rules.
