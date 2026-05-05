import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

/**
 * Gets the site URL, preferring the request origin when available.
 * Works in both middleware (with NextRequest) and server components (with headers).
 * Falls back to SITE_URL environment variable if neither is available.
 *
 * This provides a more reliable way to get the site URL that works across
 * different environments without requiring SITE_URL to be set.
 *
 * @param req - Optional NextRequest object (available in middleware). If provided, uses req.nextUrl.origin directly.
 * @returns The site URL (e.g., "https://example.com")
 */
export async function getSiteUrl(req?: NextRequest): Promise<string> {
  // If request object is provided (middleware context), use it directly
  if (req) {
    return req.nextUrl.origin;
  }

  // Prefer the env var so static pages don't opt into dynamic rendering by calling headers()
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  // Fall back to request headers (this opts the route into dynamic rendering)
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'https';

    if (host) {
      return `${protocol}://${host}`;
    }
  } catch {
    // headers() may not be available in all contexts (e.g., static generation)
  }

  return 'http://localhost:3000';
}
