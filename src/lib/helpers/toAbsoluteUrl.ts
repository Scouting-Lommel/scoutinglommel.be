// Strapi can return relative upload paths; schema.org consumers expect absolute URLs.
const toAbsoluteUrl = (value: string, baseUrl?: string | null): string => {
  if (/^https?:\/\//i.test(value)) return value;
  if (!baseUrl) return value;
  return `${baseUrl.replace(/\/+$/, '')}${value.startsWith('/') ? '' : '/'}${value}`;
};

export { toAbsoluteUrl };
