type StructuredDataInput = {
  url?: string | null;
  siteName?: string | null;
  logo?: { url?: string | null } | null;
  image?: { url?: string | null } | null;
  siteDescription?: string | null;
  contactItems?: Array<{ label?: string | null; link?: string | null } | null> | null;
  socials?: Array<{ title?: string | null; link?: string | null } | null> | null;
};

const generateStructuredData = (data: StructuredDataInput | null | undefined) => {
  if (!data) return {};

const phoneItem = (data.contactItems ?? []).find((item) => item?.link?.startsWith('tel:'));
  const telephone = phoneItem?.link?.replace('tel:', '') ?? undefined;

  // socials is a v5 flat array: [{ title, link, icon }]
  const sameAs = (data.socials ?? []).flatMap((social) => (social?.link ? [social.link] : []));

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': data.url,
    name: data.siteName,
    email: 'info@scoutinglommel.be',
    ...(telephone ? { telephone } : {}),
    logo: data.logo?.url,
    image: data.image?.url,
    description: data.siteDescription,
    url: data.url,
    foundingDate: '1958-11-18',
    knowsAbout: [
      'Scouting Lommel',
      'Scouting Sint-Pieter Lommel',
      'Scouting Sint-Pieter',
      'Scouts Lommel',
      'Scouts Sint-Pieter Lommel',
      'Scouts Sint-Pieter',
      'Scouting',
      'Scouts',
      'Gidsen',
      'Scouts en Gidsen',
      'Scouts & Gidsen',
      'Jeugdbeweging',
      'Scouts & Gidsen Vlaanderen',
      'Scouts en Gidsen Vlaanderen',
      'Lommel Sahara',
      'Lommelse Sahara',
      'Sahara Lommel',
      'Sahara',
      'Kampplaats',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nieuwe Kopen 4',
      addressLocality: 'Lommel',
      postalCode: '3920',
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // TODO: verify exact coordinates for Nieuwe Kopen 4, 3920 Lommel via Google Maps
      latitude: 51.24558081692069,
      longitude: 5.301134634828866,
    },
    areaServed: [
      { '@type': 'City', name: 'Lommel', sameAs: 'https://www.wikidata.org/wiki/Q194366' },
      { '@type': 'AdministrativeArea', name: 'Limburg' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@scoutinglommel.be',
      ...(telephone ? { telephone } : {}),
      availableLanguage: { '@type': 'Language', name: 'Dutch' },
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Scouts & Gidsen Vlaanderen',
      url: 'https://www.scoutsengidsenvlaanderen.be',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
};

export { generateStructuredData };

export const generateWebSiteSchema = (data: StructuredDataInput | null | undefined) => {
  if (!data?.url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${data.url}/#website`,
    name: data.siteName,
    url: data.url,
    description: data.siteDescription,
    inLanguage: 'nl-BE',
    publisher: {
      '@type': 'Organization',
      '@id': data.url,
    },
  };
};

export const generateFaqSchema = (
  faqItems: Array<{ question?: string | null; answer?: string | null }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems
    .filter((item) => item.question && item.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // answer may be plain text or HTML depending on Strapi field type
        text: item.answer,
      },
    })),
});
