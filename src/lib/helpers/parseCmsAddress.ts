type PostalAddressParts = {
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string;
  addressCountry?: string;
};

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  euml: 'ë',
  eacute: 'é',
  egrave: 'è',
  agrave: 'à',
  ccedil: 'ç',
  uuml: 'ü',
  ouml: 'ö',
  auml: 'ä',
  szlig: 'ß',
  acirc: 'â',
  ecirc: 'ê',
  icirc: 'î',
  ocirc: 'ô',
  ucirc: 'û',
};

// Decode character references so "3920&nbsp;Lommel" and "Belgi&euml;" match the
// same patterns as their plain-text forms. Runs twice to unwrap nested
// references such as "&amp;nbsp;".
const decodeHtmlEntities = (value: string): string => {
  let decoded = value;

  for (let pass = 0; pass < 2; pass += 1) {
    const next = decoded.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match: string, entity: string) => {
      if (entity.startsWith('#')) {
        const code =
          entity[1]?.toLowerCase() === 'x'
            ? Number.parseInt(entity.slice(2), 16)
            : Number.parseInt(entity.slice(1), 10);
        return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
      }
      return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    });

    if (next === decoded) break;
    decoded = next;
  }

  return decoded;
};

const PLACEHOLDER_ADDRESS = /^(adres volgt|n\/?a|onbekend|unknown|tbd|nvt)$/i;

// The CMS stores the group address as free text with <br/> or paragraph breaks,
// e.g. "Nieuwe Kopen 4 <br/>3920 Lommel <br/>België". Schema.org needs a
// structured PostalAddress, so normalise the markup into lines and pick out the
// parts we recognise. Returns null when nothing usable is left.
const parseCmsAddress = (raw?: string | null): PostalAddressParts | null => {
  if (!raw) return null;

  const lines = decodeHtmlEntities(raw)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;
  if (PLACEHOLDER_ADDRESS.test(lines.join(' ').trim())) return null;

  const streetLines: string[] = [];
  const address: PostalAddressParts = {};

  for (const line of lines) {
    // A Belgian locality line is a 4-digit postal code followed by a single
    // name ("3920 Lommel"). Requiring one token rejects ambiguous lines such as
    // "1000 Meter Straat", which is a street, not a locality.
    const postalCodeMatch = line.match(/^([1-9]\d{3})\s+(\S+)$/);
    if (postalCodeMatch) {
      // First match wins: a later line must not overwrite a valid one.
      if (!address.postalCode) {
        address.postalCode = postalCodeMatch[1];
        address.addressLocality = postalCodeMatch[2];
      }
      continue;
    }
    if (!address.addressCountry && /^(belgi[eë]|belgium|be)$/i.test(line)) {
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
