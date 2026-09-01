# Development and GIT Flow

## Overview

We follow a **trunk-based** development approach where `main` is our primary branch. All development work is done in feature branches that are eventually merged back into `main` through Pull Requests (PRs).

> **[Trunk based development](https://trunkbaseddevelopment.com/)**: a source-control branching model, where developers collaborate on code in a single branch called ‘trunk’, resist any pressure to create other long-lived development branches by employing documented techniques. They therefore avoid merge hell, do not break the build, and live happily ever after.

## Workflow Steps

1. **Create a New Branch**

```bash
git checkout main
git pull origin main
git checkout -b your-branch-name
```

2. **Work on Your Changes**

- Make your commits in your feature branch
- Commit messages should be clear and descriptive

3. **Keep Your Branch Updated**

```bash
git fetch origin
git rebase origin/main
```

- This ensures your branch has the latest changes from `main`
- Resolve any conflicts that arise during rebase

4. **Push Your Changes**

```bash
git push origin your-branch-name
```

5. **Create a Pull Request**

- Create a PR from your branch to `main`
- Ensure your PR description clearly explains the changes
- Request review from at least one team member

## Requirements for Merging

- ✅ Branch must be up to date with `main` (rebased)
- ✅ At least 1 approval from another team member
- ✅ All commits will be squashed into a single commit during merge

## Important Notes

- Never push directly to `main`
- Always create a PR for changes
- Keep branches focused and short-lived
- Resolve conflicts through rebasing, not merging
- All commits in the PR will be squashed into a single commit when merging

## Common Commands

```bash
# Update main
git checkout main
git pull origin main

# Create new branch
git checkout -b feature/your-feature-name

# Rebase on main
git fetch origin
git rebase origin/main

# Force push after rebase (if branch is already pushed)
git push --force-with-lease origin your-branch-name
```

## Best Practices

1. **Branch Naming**

- Use descriptive names
- Include the ticket number in the branch name (SL-[number])
- Example: feature/SL-32-add-user-authentication

2. **Commit Messages**

- Write clear, concise commit messages
- Use present tense
- Example: "Add user authentication feature"

3. **Code Review**

- Review PRs promptly
- Provide constructive feedback
- Address review comments in a timely manner

4. **Keep PRs Focused**

- Each PR should represent a single piece of work
- Avoid mixing unrelated changes
- Break down large changes into smaller PRs when possible
