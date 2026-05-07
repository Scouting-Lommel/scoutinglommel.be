import type { SitemapQuery } from '@/types/generated/Graphql';

type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
};

type SitemapPage = {
  slug?: string | null;
  updatedAt?: string | null;
  pageMeta?: { noIndex?: boolean | null } | null;
};

type SitemapSource = {
  page: SitemapPage | null | undefined;
  /** Overrides the URL built from `path` + `slug` (used for the home page, which lives at `/`). */
  url?: string;
  /** URL prefix, e.g. `takken` or `verhuur`. */
  path?: string;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
};

const generateSitemap = (sitemapData: SitemapQuery): SitemapEntry[] => {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) return [];

  const {
    homePage,
    groupsPage,
    groups,
    rentalPage,
    rentalLocations,
    infoPage,
    registerPage,
    contactPage,
    articlesPage,
    drugsAlcoholPolicyPage,
    privacyPolicyPage,
  } = sitemapData;

  const sources: SitemapSource[] = [
    { page: homePage, url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { page: groupsPage, changeFrequency: 'monthly', priority: 0.9 },
    ...(groups ?? []).map<SitemapSource>((page) => ({ page, path: 'takken', changeFrequency: 'monthly', priority: 0.8 })),
    { page: rentalPage, changeFrequency: 'monthly', priority: 0.7 },
    ...(rentalLocations ?? []).map<SitemapSource>((page) => ({ page, path: 'verhuur', changeFrequency: 'monthly', priority: 0.7 })),
    { page: infoPage, changeFrequency: 'monthly', priority: 0.8 },
    { page: registerPage, changeFrequency: 'monthly', priority: 0.9 },
    { page: contactPage, changeFrequency: 'yearly', priority: 0.7 },
    { page: articlesPage, changeFrequency: 'monthly', priority: 0.5 },
    { page: drugsAlcoholPolicyPage, changeFrequency: 'yearly', priority: 0.3 },
    { page: privacyPolicyPage, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return sources.flatMap(({ page, url, path, changeFrequency, priority }) => {
    if (!page || page.pageMeta?.noIndex) return [];
    const slug = page.slug;
    if (!url && !slug) return [];

    const entryUrl = url ?? (path ? `${siteUrl}/${path}/${slug}` : `${siteUrl}/${slug}`);

    return [
      {
        url: entryUrl,
        ...(page.updatedAt ? { lastModified: page.updatedAt } : {}),
        changeFrequency,
        priority,
      },
    ];
  });
};

export default generateSitemap;