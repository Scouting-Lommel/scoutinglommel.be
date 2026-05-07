import { NextRequest, NextResponse } from 'next/server';
import {
  authMiddleware,
  authMiddlewareConfig,
  groupsMiddleware,
  groupsMiddlewareConfig,
  signinMiddleware,
  signinMiddlewareConfig,
} from './middlewares';

/**
 * Checks if a URL matches a pattern. Handles both literal strings and regex patterns.
 * Patterns containing regex special characters (like parentheses, dots, asterisks) are treated as regex.
 * Simple literal strings are matched exactly.
 *
 * @param url - The URL path to test
 * @param pattern - The pattern to match against (can be literal string or regex pattern)
 * @returns `true` if the URL matches the pattern, otherwise `false`
 */
function matchesPattern(url: string, pattern: string): boolean {
  // Check if pattern contains regex special characters (excluding ^ and $ which we add)
  const hasRegexChars = /[.*+?^${}()|[\]\\]/.test(pattern);

  if (hasRegexChars) {
    // Treat as regex pattern - wrap with ^ and $ for full match
    try {
      return new RegExp(`^${pattern}$`).test(url);
    } catch {
      // If regex is invalid, fall back to literal match
      return url === pattern;
    }
  } else {
    // Treat as literal string - simple equality check
    return url === pattern;
  }
}

export default function middleware(req: NextRequest) {
  const url: string = req.nextUrl.pathname;

  if (signinMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return signinMiddleware(req);
  }

  if (authMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return authMiddleware(req);
  }

  if (groupsMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return groupsMiddleware(req);
  }

  // Inject pathname so server components (e.g. BreadcrumbJsonLd) can read the current route
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', url);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
