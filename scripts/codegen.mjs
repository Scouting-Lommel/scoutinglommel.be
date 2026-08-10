#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from 'node:child_process';

const skip = process.env.SKIP_CODEGEN === '1';
const watch = process.argv.includes('--watch');

if (skip) {
  console.log('SKIP_CODEGEN=1 — skipping GraphQL codegen');
  process.exit(0);
}

const command = `pnpm fetch-schema && graphql-codegen --config codegen.ts${watch ? ' --watch' : ''}`;
execSync(command, { stdio: 'inherit' });