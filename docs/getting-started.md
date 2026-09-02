# Getting started

## Table of contents

- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running locally](#running-locally)
- [Building the project](#building-the-project)
  - [Local build](#local-build)
  - [Production build](#deployment)
- [Development](#development)
- [Trunk-based development](#trunk-based-development)

## Tech stack

- [NextJS](https://nextjs.org/) frontend application
- [Strapi](https://strapi.io/) headless CMS backend
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://postcss.org/) for CSS processing
- [Storybook](https://storybook.js.org/) for component development
- [next-intl](https://next-intl-docs.vercel.app/) for internationalization
- [react-hook-form](https://react-hook-form.com/) for form handling
- [next-auth](https://next-auth.js.org/) for authentication

## Requirements

- [Node.js](https://nodejs.org) (v18 or higher, recommended v20)
- [pnpm](https://pnpm.io) (v8 and up)
- [NVM](https://github.com/nvm-sh/nvm) (optional but recommended)

> **Important**: pnpm is the only allowed package manager (enforced by the preinstall script). Attempting to use npm or Yarn will fail.

### Environment variables

Create a `.env` file with the required environment variables — see `.env.example` for the complete list.

Contact the project maintainer for the actual values to use in development.

## Installation

1. Clone this repo and navigate into it:

   ```bash
   git clone https://github.com/Scouting-Lommel/scoutinglommel.be.git
   cd scoutinglommel.be
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Fill in `.env`. For environment values, contact the repo owner.

4. Set the `Node.js` version (optional but recommended):

   ```bash
   nvm use
   ```

5. Install pnpm (if not already installed):

   ```bash
   npm install -g pnpm
   ```

6. Install dependencies:

   ```bash
   pnpm install
   ```

## Running locally

1. [Clone and install](#installation) this repo
2. Start the development server:

   ```bash
   pnpm run dev
   ```

   This starts:
   - Next.js development server
   - PostCSS watcher for component styles
   - PostCSS watcher for global styles

3. Visit the website's frontend on [port 3000](http://localhost:3000).

### Running Storybook

To run Storybook for component development:

```bash
pnpm run storybook
```

This starts Storybook on [port 6006](http://localhost:6006) with CSS processing enabled.

## Code quality & testing

### Linting and formatting

```bash
pnpm run lint                   # Run all linters (ESLint, TypeScript, Stylelint, ls-lint)
pnpm run lint:eslint            # ESLint with auto-fix
pnpm run lint:typescript        # TypeScript type checking
pnpm run lint:stylelint         # Stylelint for .pcss files with auto-fix
pnpm run lint:ls-lint           # File/directory naming conventions
```

### Linting rules

- **Import order**: Strictly enforced ESLint rule with specific path group ordering
- **TypeScript**: Strict mode enabled, all types must be properly defined
- **CSS**: PostCSS files must follow naming conventions
- **File naming**: Directory and file names must follow ls-lint rules

### Manual code quality checks

Before committing, run the linting commands:

```bash
pnpm run lint              # Run all quality checks
```

This checks:

- ESLint rules and auto-fix issues
- TypeScript type checking
- Stylelint for CSS files
- File naming conventions (ls-lint)

**Best practice**: always run `pnpm run lint` before committing to ensure code quality.

## Building the project

### Local build

1. [Clone and install](#installation) this repo
2. Produce a production build using `pnpm`:

   ```bash
   pnpm run build
   ```

   This:
   - Runs the prebuild script
   - Builds CSS for components
   - Builds global CSS
   - Builds the Next.js application

3. Start the app with:

   ```bash
   pnpm start
   ```

### Deployment

Deployments are fully automated using [Vercel](https://vercel.com). Every push to the `main` branch triggers a staging deployment; production deploys on `v*` tags. For more info, see the [deployment docs](/docs/deployment.md).

## Development and git flow

We follow a trunk-based development approach where `main` is our primary branch. All development work happens in feature branches that are merged back into `main` through Pull Requests (PRs).

For more information, read the [Development and git flow documentation](./development-and-git-flow.md).
