import type { Breadcrumb } from '@/components/molecules/Breadcrumbs/types';

export const generateBreadcrumbSchema = (breadcrumbs: Breadcrumb[], siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
  })),
});
