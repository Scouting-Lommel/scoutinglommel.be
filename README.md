# Scouting Lommel Frontend

Frontend for the [Scouting Lommel website](https://www.scoutinglommel.be).

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
- **Staging** — https://staging.scoutinglommel.be — deploys automatically on every push to `main`.

## Getting started

### Installation

```bash
pnpm install
```

For detailed instructions and requirements, see the [getting started docs](/docs/getting-started.md).

### Running locally

```bash
pnpm run dev
```

For detailed instructions, see the [getting started docs](/docs/getting-started.md#running-locally).

## Credits

- [Vincent Wijshoff](https://github.com/VincentWijshoff)
- [Seppe Alaerts](https://github.com/seppealaerts)

> Deployment flow: staging auto-deploys on main push; production deploys on v* tags.
