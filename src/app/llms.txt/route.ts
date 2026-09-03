import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

const body = readFileSync(join(process.cwd(), 'src/content/llms.txt'), 'utf-8');

export function GET() {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
