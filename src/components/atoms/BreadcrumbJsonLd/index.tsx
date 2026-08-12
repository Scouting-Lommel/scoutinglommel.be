import { headers } from 'next/headers';
import type { JSX } from 'react';
import { generateBreadcrumbSchema } from '@/lib/helpers/generateBreadcrumbSchema';
import { getBreadcrumbs } from '@/lib/helpers/getBreadcrumbs';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

const BreadcrumbJsonLd = async (): Promise<JSX.Element | null> => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');

  if (!pathname || pathname === '/') return null;

  const breadcrumbs = getBreadcrumbs(pathname);
  if (breadcrumbs.length <= 1) return null;

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
