#!/usr/bin/env node

import { execSync } from 'node:child_process';

const skip = process.env.SKIP_CODEGEN === '1';
const skipFetch = process.env.SKIP_FETCH_SCHEMA === '1';
const watch = process.argv.includes('--watch');

if (skip) {
  console.log('SKIP_CODEGEN=1 — skipping GraphQL codegen');
  process.exit(0);
}

// schema.graphql is committed and refreshed by CI on push to main
// (see .github/workflows/update-schema.yml). SKIP_FETCH_SCHEMA=1 lets the
// build run codegen against the committed schema without live introspection,
// which is disabled on the production Strapi backend.
const fetchStep = skipFetch ? '' : 'pnpm fetch-schema && ';
if (skipFetch) {
  console.log('SKIP_FETCH_SCHEMA=1 — using committed schema.graphql');
}

const command = `${fetchStep}graphql-codegen --config codegen.ts${watch ? ' --watch' : ''}`;
execSync(command, { stdio: 'inherit' });
