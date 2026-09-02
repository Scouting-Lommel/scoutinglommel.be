# Development and git flow

## Overview

We follow a **trunk-based** development approach where `main` is our primary branch. All development happens in feature branches that are merged back into `main` through Pull Requests (PRs).

> **[Trunk-based development](https://trunkbaseddevelopment.com/)**: a branching model where developers collaborate on a single branch called the 'trunk' and resist creating long-lived development branches. This avoids merge hell, keeps the build green, and keeps history linear.

## Workflow

1. **Create a branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b your-branch-name
   ```

2. **Work on your changes**

   - Make commits in your feature branch
   - Keep commit messages clear and descriptive

3. **Keep your branch updated**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

   - This keeps your branch in sync with the latest `main`
   - Resolve any conflicts during the rebase

4. **Push your changes**

   ```bash
   git push origin your-branch-name
   ```

5. **Create a pull request**

   - Open a PR from your branch to `main`
   - Make sure the PR description clearly explains the changes
   - Request review from at least one team member

## Merging requirements

- ✅ Branch is up to date with `main` (rebased)
- ✅ At least one approval from another team member
- ✅ All commits are squashed into a single commit on merge

## Important notes

- Never push directly to `main`
- Always open a PR for changes
- Keep branches focused and short-lived
- Resolve conflicts by rebasing, not merging

## Common commands

```bash
# Update main
git checkout main
git pull origin main

# Create a new branch
git checkout -b feature/your-feature-name

# Rebase on main
git fetch origin
git rebase origin/main

# Force push after rebase (only if the branch is already pushed)
git push --force-with-lease origin your-branch-name
```

## Best practices

1. **Branch naming**

   - Use descriptive names
   - Include the ticket number in the branch name (`SL-<number>`)
   - Example: `feature/SL-32-add-user-authentication`

2. **Commit messages**

   - Write clear, concise commit messages
   - Use present tense
   - Example: "Add user authentication feature"

3. **Code review**

   - Review PRs promptly
   - Provide constructive feedback
   - Address review comments in a timely manner

4. **Keep PRs focused**

   - Each PR represents a single piece of work
   - Avoid mixing unrelated changes
   - Break large changes into smaller PRs when possible
