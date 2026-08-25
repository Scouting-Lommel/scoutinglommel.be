# Scouting Lommel Frontend

Frontend to the new and refreshed [Scouting Lommel website](https://www.scoutinglommel.be).

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Running locally](#running-locally)
- [Credits](#credits)

## Tech stack

- [NextJS](https://nextjs.org/) frontend application
- [Strapi](https://strapi.io/) headless CMS backend

## Environments

- **Production** — https://www.scoutinglommel.be — deploys when a `v*` git tag is pushed (see `.github/workflows/deploy-production.yml`).
- **Staging** — https://staging.scoutinglommel.be — auto-deploys on every push to `main`.

## Getting started

### Installation

```bash
pnpm install
```

For detailed instructions and requirements, check out the [getting started docs](/documentation/getting-started.md).

### Running locally

```bash
pnpm run dev
```

For detailed instructions, check out the [getting started docs](/documentation/getting-started.md#running-locally).

## Credits

- [Vincent Wijshoff](https://github.com/VincentWijshoff)
- [Seppe Alaerts](https://github.com/seppealaerts)
