type PostalAddressParts = {
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string;
  addressCountry?: string;
};

// The CMS stores the group address as free text with <br/> line breaks, e.g.
// "Nieuwe Kopen 4 <br/>3920 Lommel <br/>België". Schema.org needs a structured
// PostalAddress, so normalise the markup into lines and pick out the parts we
// recognise. Returns null when nothing usable is left.
const parseCmsAddress = (raw?: string | null): PostalAddressParts | null => {
  if (!raw) return null;

  const lines = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const streetLines: string[] = [];
  const address: PostalAddressParts = {};

  for (const line of lines) {
    // A locality line looks like "3920 Lommel": a postal code followed by a name.
    const postalCodeMatch = line.match(/^([1-9]\d{3,4})\s+([A-Za-zÀ-ÖØ-öø-ÿ].*)$/);
    if (postalCodeMatch) {
      address.postalCode = postalCodeMatch[1];
      address.addressLocality = postalCodeMatch[2];
      continue;
    }
    if (/^(belgi[eë]|belgium|be)$/i.test(line)) {
      address.addressCountry = 'BE';
      continue;
    }
    streetLines.push(line);
  }

  if (streetLines.length > 0) address.streetAddress = streetLines.join(', ');

  return Object.keys(address).length > 0 ? address : null;
};

export { parseCmsAddress };
export type { PostalAddressParts };
