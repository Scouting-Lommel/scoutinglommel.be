const generateSitemap = (sitemapData: any): Array<object> => {
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
  if (homePage && !homePage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/`,
      lastModified: homePage.updatedAt,
    });
  }

  // Groups page
  if (groupsPage && groupsPage.pageMeta?.slug && !groupsPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${groupsPage.pageMeta.slug}`,
      lastModified: groupsPage.updatedAt,
    });
  }

  // Group pages
  groups?.forEach((group: any) => {
    if (group && !group.pageMeta?.noIndex) {
      out.push({
        url: `${siteUrl}/takken/${group.slug}`,
        lastModified: group.updatedAt,
      });
    }
  });

  // Rental page
  if (rentalPage && rentalPage.pageMeta?.slug && !rentalPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${rentalPage.pageMeta.slug}`,
      lastModified: rentalPage.updatedAt,
    });
  }

  // Rental location pages
  rentalLocations?.forEach((location: any) => {
    if (location && !location.pageMeta?.noIndex) {
      out.push({
        url: `${siteUrl}/verhuur/${location.slug}`,
        lastModified: location.updatedAt,
      });
    }
  });

  // Info page
  if (infoPage && infoPage.pageMeta?.slug && !infoPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${infoPage.pageMeta.slug}`,
      lastModified: infoPage.updatedAt,
    });
  }

  // Register page
  if (registerPage && registerPage.pageMeta?.slug && !registerPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${registerPage.pageMeta.slug}`,
      lastModified: registerPage.updatedAt,
    });
  }

  // Contact page
  if (contactPage && contactPage.pageMeta?.slug && !contactPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${contactPage.pageMeta.slug}`,
      lastModified: contactPage.updatedAt,
    });
  }

  // Articles page
  if (articlesPage && articlesPage.pageMeta?.slug && !articlesPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${articlesPage.pageMeta.slug}`,
      lastModified: articlesPage.updatedAt,
    });
  }

  // Drugs and alcohol policy page
  if (drugsAlcoholPolicyPage && drugsAlcoholPolicyPage.pageMeta?.slug && !drugsAlcoholPolicyPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${drugsAlcoholPolicyPage.pageMeta.slug}`,
      lastModified: drugsAlcoholPolicyPage.updatedAt,
    });
  }

  // Privacy policy page
  if (privacyPolicyPage && privacyPolicyPage.pageMeta?.slug && !privacyPolicyPage.pageMeta?.noIndex) {
    out.push({
      url: `${siteUrl}/${privacyPolicyPage.pageMeta.slug}`,
      lastModified: privacyPolicyPage.updatedAt,
    });
  }

  return out;
};

export default generateSitemap;
