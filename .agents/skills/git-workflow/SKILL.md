---
name: git-workflow
description: "MUST USE for ANY git operation in this repo — committing, staging, branching, checkout, rebase, squash, merge, push, pull, fetch, amend, stash, revert, cherry-pick, creating or reviewing PRs, or any git history investigation. Encodes THIS repo's workflow (trunk-based, atomic commits, prettier-format before commit) and the Linear-ticket rule (every branch and commit must reference an SL- ticket). Triggers: commit, branch, rebase, merge, push, pull, fetch, amend, PR, git history, blame, bisect."
---

# Git Workflow (scoutinglommel.be)

This repo's git conventions. Apply them to **every** git operation here. These repo rules win over any personal git skill.

## Hard rule: Linear ticket required

Every piece of work MUST be linked to a Linear ticket (`SL-<number>`). Working without a ticket is FORBIDDEN unless the user explicitly says so.

- **Before starting any work**: verify the ticket exists via the Linear MCP (look up `SL-XXX` by identifier, use its title for the branch slug). If no ticket exists, STOP and ask the user.
- **Branch name**: `feature/SL-XXX-short-slug` (e.g. `feature/SL-32-add-user-authentication`).
- **Commit message**: prefix with the ticket id — `SL-XXX: <imperative summary>` (e.g. `SL-32: add user authentication feature`).

## Ticket lifecycle (keep status current)

Update the ticket's status in Linear throughout development — never leave it in Backlog while work is happening:

- `Backlog` → `In Progress` when you start working on it
- `In Progress` → `In Review` when the branch/PR is up for review
- `In Review` → `Done` when merged/completed
- `Canceled` when the work is abandoned (add a comment saying why)

Every ticket must live in a project (e.g. Improvements, Documentation, SEO & GEO) — a ticket without a project is incomplete. See the `ticket-writing` skill for how to write/edit tickets.

## Core rules

1. **Fetch before any git operation.** Always `git fetch` (or `git pull`) before creating branches, rebasing, or reviewing PRs — never branch from a stale local branch.
2. **Branch from `main`** (or the current feature branch), always from the latest remote state.
3. **Atomic commits.** Each commit is one logical, complete, reversible change. Never bundle unrelated changes.
4. **Trunk-based, rebase never merge.** No merge commits. Integrate `main` with `git fetch origin && git rebase origin/main`. Resolve conflicts through rebasing.
5. **Format before committing.** Run `pnpm exec prettier --write <changed files>` on changed files and verify `pnpm exec prettier --check <files>` passes before committing.
6. **Squash on PR merge.** PRs merge squashed onto `main`; keep trunk history linear.

## Commit amend rule

Amend the **immediately preceding commit** when the change is a direct refinement, correction, or closely related follow-up:

**Use `git commit --amend` when:**
- The change fixes a bug in the previous commit
- The change completes something started in the previous commit
- The change is a minor adjustment that logically belongs with the previous commit
- The previous commit has not been pushed to a shared branch yet

**Do NOT amend when:**
- The previous commit has already been pushed to origin and others may have pulled it
- The change is substantial and deserves its own context in history
- You need to preserve the history for audit/debugging purposes

## Workflow steps

1. **Create a branch** (from latest main):
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/SL-XXX-short-slug
   ```
2. **Work + commit atomically** — clear, descriptive, present-tense messages prefixed with the ticket id.
3. **Keep the branch updated**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
4. **Push** (force-push after rebase only if the branch is already pushed):
   ```bash
   git push origin feature/SL-XXX-short-slug
   git push --force-with-lease origin feature/SL-XXX-short-slug
   ```
5. **Create a PR** to `main` — clear description, request review from at least one team member. All commits are squashed into a single commit on merge.

## Never

- Push directly to `main` — always a PR.
- Use `git add .` blindly — stage only intended files; never commit secrets.
- Create a new commit for a fixup to the immediately previous commit — amend instead.