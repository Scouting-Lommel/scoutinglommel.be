import type { SitemapQuery } from '@/types/generated/Graphql';

type SitemapEntry = { url: string; lastModified?: string };

type SitemapPage = {
  slug?: string | null;
  updatedAt?: string | null;
  pageMeta?: { noIndex?: boolean | null } | null;
};

const createEntry = (siteUrl: string, slug: string, updatedAt?: string | null): SitemapEntry => {
  return updatedAt ? { url: `${siteUrl}/${slug}`, lastModified: updatedAt } : { url: `${siteUrl}/${slug}` };
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

  const out: SitemapEntry[] = [];

  const pushIfIndexable = (page?: SitemapPage | null, path?: string) => {
    if (!page || page.pageMeta?.noIndex) return;
    const slug = page.slug;
    if (!slug) return;

    out.push(createEntry(siteUrl, path ? `${path}/${slug}` : slug, page.updatedAt));
  };

  // Home page
  pushIfIndexable(homePage);

  // Groups page
  pushIfIndexable(groupsPage);

  // Group pages
  groups?.forEach((group) => pushIfIndexable(group, 'takken'));

  // Rental page
  pushIfIndexable(rentalPage);

  // Rental location pages
  rentalLocations?.forEach((location) => pushIfIndexable(location, 'verhuur'));

  // Info page
  pushIfIndexable(infoPage);

  // Register page
  pushIfIndexable(registerPage);

  // Contact page
  pushIfIndexable(contactPage);

  // Articles page
  pushIfIndexable(articlesPage);

  // Drugs and alcohol policy page
  pushIfIndexable(drugsAlcoholPolicyPage);

  // Privacy policy page
  pushIfIndexable(privacyPolicyPage);

  return out;
};

export default generateSitemap;
