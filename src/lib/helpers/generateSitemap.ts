import type { SitemapQuery } from '@/types/generated/Graphql';

const generateSitemap = (sitemapData: SitemapQuery): Array<{ url: string; lastModified?: string | null }> => {
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

  const out = [];

  // Home page
  if (homePage && homePage.slug && !homePage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${homePage.slug}`,
      lastModified: homePage.updatedAt,
    });
  }

  // Groups page
  if (groupsPage && groupsPage.slug && !groupsPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${groupsPage.slug}`,
      lastModified: groupsPage.updatedAt,
    });
  }

  // Group pages
  groups?.forEach((group) => {
    if (group && group.slug && !group.pageMeta?.noIndex) {
      out.push({
        url: `${siteUrl}/takken/${group.slug}`,
        lastModified: group.updatedAt,
      });
    }
  });

  // Rental page
  if (rentalPage && rentalPage.slug && !rentalPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${rentalPage.slug}`,
      lastModified: rentalPage.updatedAt,
    });
  }

  // Rental location pages
  rentalLocations?.forEach((location) => {
    if (location && location.slug && !location.pageMeta?.noIndex) {
      out.push({
        url: `${siteUrl}/verhuur/${location.slug}`,
        lastModified: location.updatedAt,
      });
    }
  });

  // Info page
  if (infoPage && infoPage.slug && !infoPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${infoPage.slug}`,
      lastModified: infoPage.updatedAt,
    });
  }

  // Register page
  if (registerPage && registerPage.slug && !registerPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${registerPage.slug}`,
      lastModified: registerPage.updatedAt,
    });
  }

  // Contact page
  if (contactPage && contactPage.slug && !contactPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${contactPage.slug}`,
      lastModified: contactPage.updatedAt,
    });
  }

  // Articles page
  if (articlesPage && articlesPage.slug && !articlesPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${articlesPage.slug}`,
      lastModified: articlesPage.updatedAt,
    });
  }

  // Drugs and alcohol policy page
  if (
    drugsAlcoholPolicyPage &&
    drugsAlcoholPolicyPage.slug &&
    !drugsAlcoholPolicyPage.pageMeta?.noIndex
  ) {
    out.push({
      url: `${siteUrl}/${drugsAlcoholPolicyPage.slug}`,
      lastModified: drugsAlcoholPolicyPage.updatedAt,
    });
  }

  // Privacy policy page
  if (privacyPolicyPage && privacyPolicyPage.slug && !privacyPolicyPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${privacyPolicyPage.slug}`,
      lastModified: privacyPolicyPage.updatedAt,
    });
  }

  return out;
};

export default generateSitemap;
