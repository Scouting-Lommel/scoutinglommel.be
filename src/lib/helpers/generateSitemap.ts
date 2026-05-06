const generateSitemap = (sitemapData: any): Array<object> => {
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
      url: `${process.env.SITE_URL}/`,
      lastModified: homePage.updatedAt,
    });
  }

  // Groups page
  if (groupsPage && !groupsPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${groupsPage.pageMeta.slug}`,
      lastModified: groupsPage.updatedAt,
    });
  }

  // Group pages
  groups?.forEach((group: any) => {
    if (group && !group.pageMeta?.noIndex) {
      out.push({
        url: `${process.env.SITE_URL}/takken/${group.slug}`,
        lastModified: group.updatedAt,
      });
    }
  });

  // Rental page
  if (rentalPage && !rentalPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${rentalPage.pageMeta.slug}`,
      lastModified: rentalPage.updatedAt,
    });
  }

  // Rental location pages
  rentalLocations?.forEach((location: any) => {
    if (location && !location.pageMeta?.noIndex) {
      out.push({
        url: `${process.env.SITE_URL}/verhuur/${location.slug}`,
        lastModified: location.updatedAt,
      });
    }
  });

  // Info page
  if (infoPage && !infoPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${infoPage.pageMeta.slug}`,
      lastModified: infoPage.updatedAt,
    });
  }

  // Register page
  if (registerPage && !registerPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${registerPage.pageMeta.slug}`,
      lastModified: registerPage.updatedAt,
    });
  }

  // Contact page
  if (contactPage && !contactPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${contactPage.pageMeta.slug}`,
      lastModified: contactPage.updatedAt,
    });
  }

  // Articles page
  if (articlesPage && !articlesPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${articlesPage.pageMeta.slug}`,
      lastModified: articlesPage.updatedAt,
    });
  }

  // Drugs and alcohol policy page
  if (drugsAlcoholPolicyPage && !drugsAlcoholPolicyPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${drugsAlcoholPolicyPage.pageMeta.slug}`,
      lastModified: drugsAlcoholPolicyPage.updatedAt,
    });
  }

  // Privacy policy page
  if (privacyPolicyPage && !privacyPolicyPage.pageMeta?.noIndex) {
    out.push({
      url: `${process.env.SITE_URL}/${privacyPolicyPage.pageMeta.slug}`,
      lastModified: privacyPolicyPage.updatedAt,
    });
  }

  return out;
};

export default generateSitemap;
