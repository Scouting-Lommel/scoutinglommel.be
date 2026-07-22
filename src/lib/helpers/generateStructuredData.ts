type StructuredDataInput = {
  url?: string | null;
  siteName?: string | null;
  logo?: { url?: string | null } | null;
  image?: { url?: string | null } | null;
  siteDescription?: string | null;
};

const generateStructuredData = (data: StructuredDataInput | null | undefined) => {
  if (!data) return {};

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': data.url,
    name: data.siteName,
    email: 'info@scoutinglommel.be',
    logo: data.logo?.url,
    image: data.image?.url,
    description: data.siteDescription,
    url: data.url,
    foundingDate: '1958-11-18',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nieuwe Kopen 4',
      addressLocality: 'Lommel',
      postalCode: '3920',
      addressCountry: 'BE',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Scouts & Gidsen Vlaanderen',
      url: 'https://www.scoutsengidsenvlaanderen.be',
    },
  };
};

export { generateStructuredData };
