import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export const runtime = 'nodejs';

// Internal marker so the middleware never rewrites the page fetch back into this route
const INTERNAL_AGENT_HEADER = 'x-markdown-agent';

/**
 * Extracts the `<main>` region of a rendered page. Falls back to the full
 * document when no main element is present.
 *
 * @param html - The full rendered HTML of the page
 * @returns The HTML of the main content region
 */
const getMainContent = (html: string): string => {
  const mainStart = html.indexOf('<main');
  const mainEnd = html.indexOf('</main>');

  if (mainStart !== -1 && mainEnd !== -1 && mainEnd > mainStart) {
    return html.slice(mainStart, mainEnd + '</main>'.length);
  }

  return html;
};

/**
 * Markdown content negotiation endpoint (used by the middleware for
 * `Accept: text/markdown` requests). Fetches the rendered page HTML, converts
 * the main content region to Markdown and returns it as `text/markdown` with
 * an `x-markdown-tokens` count.
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // Middleware rewrites lose the query param on same-origin requests, but keep
  // the original pathname — so fall back to it (with query string) when missing.
  const pathParam = req.nextUrl.searchParams.get('path');
  const requestedPath =
    pathParam ??
    (req.nextUrl.pathname === '/api/markdown'
      ? '/'
      : `${req.nextUrl.pathname}${req.nextUrl.search}`);
  const siteUrl = (await getSiteUrl(req)).replace(/\/+$/, '');

  let target: URL;
  try {
    target = new URL(requestedPath, `${siteUrl}/`);
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }

  // Only ever refetch pages on our own origin
  if (target.origin !== new URL(siteUrl).origin) {
    return new NextResponse('Bad request', { status: 400 });
  }

  const pageResponse = await fetch(target.toString(), {
    headers: {
      accept: 'text/html',
      [INTERNAL_AGENT_HEADER]: '1',
    },
    next: { revalidate: 3600 },
  });

  if (!pageResponse.ok) {
    return new NextResponse('Page not found', { status: 404 });
  }

  const html = (await pageResponse.text())
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
  });

  // Absolute links so agents can resolve them from the markdown document
  let markdown = turndownService.turndown(getMainContent(html));
  markdown = markdown
    .replace(/\]\(\/(?!\/)/g, `](${siteUrl}/`)
    .replace(/^#+\s*$/gm, '')
    .replace(/^\d+\.\s+(?<!!)\[\]\([^)]*\)\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n');

  const tokenCount = markdown.trim().split(/\s+/).filter(Boolean).length;

  const response = new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(tokenCount),
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });

  const existingVary = response.headers.get('vary');
  response.headers.set('vary', existingVary ? `${existingVary}, Accept` : 'Accept');

  return response;
};
