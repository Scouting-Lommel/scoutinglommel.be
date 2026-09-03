import { NextRequest, NextResponse } from 'next/server';
import {
  IS_STAGING,
  authMiddleware,
  authMiddlewareConfig,
  groupsMiddleware,
  groupsMiddlewareConfig,
  signinMiddleware,
  signinMiddlewareConfig,
  stagingMiddleware,
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

export default async function middleware(req: NextRequest) {
  const url: string = req.nextUrl.pathname;

  if (IS_STAGING) {
    const gate = await stagingMiddleware(req);
    if (gate) return gate;
  }

  if (signinMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return signinMiddleware(req);
  }

  if (authMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return authMiddleware(req);
  }

  if (groupsMiddlewareConfig.some((item: string) => matchesPattern(url, item))) {
    return groupsMiddleware(req);
  }

  // Never negotiate markdown for API routes, protected pages or static files.
  // The x-markdown-agent header marks internal fetches from the markdown route
  // so they are never rewritten back into themselves.
  const skipMarkdown =
    /^\/(api|dashboard|inloggen|geen-toegang|playground)\b|^\/\.well-known\/|^\/llms\.txt$|^\/favicon\.ico$|^\/robots\.txt$|^\/sitemap\.xml$|\.[a-z0-9]{2,5}$/i;
  const wantsMarkdown = (req.headers.get('accept') ?? '').includes('text/markdown');

  if (wantsMarkdown && !req.headers.has('x-markdown-agent') && !skipMarkdown.test(url)) {
    // Serve a markdown representation of the same URL (RFC 9309 content negotiation).
    // Preserve the original query string so agents can reach parameterized pages.
    const markdownUrl = req.nextUrl.clone();
    markdownUrl.pathname = '/api/markdown';
    markdownUrl.search = '';
    const path = url === '/' ? '/' : url.replace(/\/+$/, '') || '/';
    markdownUrl.searchParams.set('path', `${path}${req.nextUrl.search}`);
    return NextResponse.rewrite(markdownUrl);
  }

  // Inject pathname so server components (e.g. BreadcrumbJsonLd) can read the current route
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', url);

  // RFC 8288 Link headers: point agents at the sitemap, the markdown
  // alternative representation of every page (same URL, Accept: text/markdown),
  // the API catalog (RFC 9727) and the curated LLM index.
  const responseHeaders = new Headers();
  if (!wantsMarkdown && !skipMarkdown.test(url)) {
    const self = url === '/' ? '</>' : `</${url.slice(1).replace(/\/+$/, '')}>`;
    responseHeaders.set(
      'Link',
      `</sitemap.xml>; rel="https://www.iana.org/assignments/link-relations/sitemap", ${self}; rel="alternate"; type="text/markdown", ` +
        `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", ` +
        `</llms.txt>; rel="describedby"; type="text/markdown"`,
    );
  }

  return NextResponse.next({ request: { headers: requestHeaders }, headers: responseHeaders });
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
