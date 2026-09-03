import { headers } from 'next/headers';
import type { JSX } from 'react';
import { generateBreadcrumbSchema } from '@/lib/helpers/generateBreadcrumbSchema';
import { getBreadcrumbs } from '@/lib/helpers/getBreadcrumbs';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

const BreadcrumbJsonLd = async (): Promise<JSX.Element | null> => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');

  if (!pathname || pathname === '/') return null;

  const rawBreadcrumbs = getBreadcrumbs(pathname);
  if (rawBreadcrumbs.length <= 1) return null;

  // Resolve href-less crumbs (typically the current page) to the canonical URL
  // so every ListItem in the schema carries an `item`.
  const canonicalPath = pathname.replace(/\/+$/, '') || pathname;
  const breadcrumbs = rawBreadcrumbs.map((crumb) =>
    crumb.href ? crumb : { ...crumb, href: canonicalPath },
  );

  const siteUrl = await getSiteUrl();
  const schema = generateBreadcrumbSchema(breadcrumbs, siteUrl);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
};

export default BreadcrumbJsonLd;
