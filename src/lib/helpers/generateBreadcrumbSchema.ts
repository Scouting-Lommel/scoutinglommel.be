import type { Breadcrumb } from '@/components/molecules/Breadcrumbs/types';

type BreadcrumbWithHref = Breadcrumb & { href: string };

const hasUsableHref = (crumb: Breadcrumb): crumb is BreadcrumbWithHref =>
  typeof crumb.href === 'string' && crumb.href.trim() !== '';

const toItemUrl = (href: string, origin: string): string | null => {
  try {
    const url = new URL(href.trim(), `${origin}/`);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
};

/**
 * Omits crumbs with a blank label or without a usable `href` (Google reports those
 * as "N/A" item names in Search Console). Callers should resolve the
 * current-page crumb to its canonical URL beforehand so nothing is dropped
 * in practice (see BreadcrumbJsonLd).
 */
export const generateBreadcrumbSchema = (breadcrumbs: Breadcrumb[], siteUrl: string) => {
  const origin = siteUrl.replace(/\/+$/, '');

  const itemListElement = breadcrumbs
    .filter((crumb) => crumb.label.trim() !== '')
    .flatMap((crumb) => {
      if (!hasUsableHref(crumb)) return [];
      const item = toItemUrl(crumb.href, origin);
      return item === null ? [] : [{ name: crumb.label.trim(), item }];
    })
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      ...item,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};
