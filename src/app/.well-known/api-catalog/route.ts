import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export const runtime = 'nodejs';

export async function GET() {
  const siteUrl = await getSiteUrl();

  const linkset = {
    linkset: [
      {
        rel: 'sitemap',
        href: `${siteUrl}/sitemap.xml`,
      },
      {
        rel: 'service-desc',
        type: 'text/markdown',
        href: `${siteUrl}/api/markdown`,
      },
      {
        rel: 'service-desc',
        type: 'text/plain',
        href: `${siteUrl}/robots.txt`,
      },
    ],
  };

  return NextResponse.json(linkset, {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
