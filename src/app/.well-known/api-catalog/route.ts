import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export const runtime = 'nodejs';

export async function GET() {
  const siteUrl = await getSiteUrl();

  const linkset = {
    linkset: [
      {
        anchor: siteUrl,
        'https://www.iana.org/assignments/link-relations/sitemap': [
          { href: `${siteUrl}/sitemap.xml` },
        ],
        'service-desc': [
          { href: `${siteUrl}/api/markdown`, type: 'text/markdown' },
          { href: `${siteUrl}/robots.txt`, type: 'text/plain' },
        ],
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
      Link: `</.well-known/api-catalog>; rel="api-catalog"`,
    },
  });
}
