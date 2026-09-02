# Linear project template (Scouting Lommel)

A **project** is a bigger feature or story that contains issues. Issues belong to exactly one project; a project is done when its issues are done. Use a project when work spans multiple issues (e.g. "Articles page", "Leaders page", "Rental improvements"), a single issue does not need a project of its own, but every issue must live in a project.

## When to create a project

- The work is a **feature/story** that will be broken into multiple issues.
- The work spans multiple areas or multiple PRs over time.
- You want a single place to track progress toward a named outcome.

If the work fits in one issue, create the issue and put it in an existing project (e.g. Improvements, Documentation, SEO & GEO), don't create a project for a single issue.

## Project structure

Paste the description below into a **Team project** in Linear:
`Settings → Your teams → Scouting Lommel → Projects → New project`.

> Set these project properties in the Linear UI:
> - **Lead**: the person responsible for the project
> - **Status**: `Backlog` (or `Planned` when scheduled)
> - **Target date**: optional, set when the outcome should ship
> - **Teams**: Scouting Lommel
> - Labels: leave blank, labels are issue-level, not project-level

```markdown
## Goal

<The outcome this project delivers, from the user's perspective — why does it matter?>

## Scope

<What the project covers — the feature/story in a few lines.>

## Out of scope

<What this project deliberately does NOT cover — prevents scope creep>
```

Issues are attached to the project natively in Linear (via the project field on each issue), do not list them in the description. Only mention issues here when they come from *another* project and provide context for this one.

## Project lifecycle

Projects have their own status, separate from issues:

- `Backlog` → `Planned` → `In Progress` when work starts
- `In Progress` → `Completed` when all issues are done, **only with the user's explicit permission** (you can ask, but the user must authorize)
- `Canceled` when the project is abandoned, only with the user's explicit permission

A project's status tracks its issues: don't mark a project `Completed` while issues are still open, and don't leave it in `Backlog` while issues are `In Progress`.

## Relationship to issues

- Every issue belongs to exactly one project (see the `ticket-writing` skill, a ticket without a project is incomplete). Issues attach to the project via the project field, no need to list them in the project description.
- Issues carry the **Type** and **Area** labels; projects do not need labels.
- A project is complete when all its issues are complete (and each issue's acceptance criteria are genuinely checked).