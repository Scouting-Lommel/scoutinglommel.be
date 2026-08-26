import type { SitemapQuery } from '@/types/generated/Graphql';
import { getSiteUrl } from './getSiteUrl';

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

type SitemapManual = NonNullable<NonNullable<SitemapQuery['manuals']>[number]>;

type SitemapSource = {
  page?: SitemapPage | null;
  /** Overrides the URL built from `path` + `slug` (used for the home page, which lives at `/`). */
  url?: string;
  /** URL prefix, e.g. `takken` or `verhuur`. */
  path?: string;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
};

const generateSitemap = async (sitemapData: SitemapQuery): Promise<SitemapEntry[]> => {
  const siteUrl = await getSiteUrl();
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
    manualsOverviewPage,
    manuals,
    cookiePolicyPage,
    drugsAlcoholPolicyPage,
    privacyPolicyPage,
  } = sitemapData;

  const sources: SitemapSource[] = [
    { page: homePage, url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { page: groupsPage, changeFrequency: 'monthly', priority: 0.9 },
    ...(groups ?? []).map<SitemapSource>((page) => ({
      page,
      path: 'takken',
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { page: rentalPage, changeFrequency: 'monthly', priority: 0.7 },
    ...(rentalLocations ?? []).map<SitemapSource>((page) => ({
      page,
      path: 'verhuur',
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    { page: infoPage, changeFrequency: 'monthly', priority: 0.8 },
    { page: registerPage, changeFrequency: 'monthly', priority: 0.9 },
    { page: contactPage, changeFrequency: 'yearly', priority: 0.7 },
    { page: manualsOverviewPage, changeFrequency: 'monthly', priority: 0.5 },
    ...(manuals ?? [])
      .filter((page): page is SitemapManual => !!page && !page.locked)
      .map<SitemapSource>((page) => ({
        page,
        path: 'handleidingen',
        changeFrequency: 'yearly',
        priority: 0.4,
      })),
    { page: cookiePolicyPage, changeFrequency: 'yearly', priority: 0.3 },
    { page: drugsAlcoholPolicyPage, changeFrequency: 'yearly', priority: 0.3 },
    { page: privacyPolicyPage, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return sources.flatMap(({ page, url, path, changeFrequency, priority }) => {
    if (page) {
      if (page.pageMeta?.noIndex) return [];
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
    }

    if (!url) return [];
    return [{ url, changeFrequency, priority }];
  });
};

export default generateSitemap;
