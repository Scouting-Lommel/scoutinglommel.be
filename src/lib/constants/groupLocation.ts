// The group's physical location. The CMS stays the source of truth for the
// footer and map blocks; this constant backs the structured-data fallback and
// the pages that do not read the address from the CMS.
const groupLocation = {
  postalAddress: {
    streetAddress: 'Nieuwe Kopen 4',
    postalCode: '3920',
    addressLocality: 'Lommel',
    addressCountry: 'BE',
  },
  coordinates: {
    latitude: 51.2454667,
    longitude: 5.3011239,
  },
};

export { groupLocation };
