// Resolve a reference against a base URL. `new URL` handles protocol-relative
// paths, root-relative paths, and bases that contain a path; anything that
// cannot be resolved is returned unchanged so callers never throw.
const toAbsoluteUrl = (value: string, baseUrl?: string | null): string => {
  if (!baseUrl) return value;

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
};

export { toAbsoluteUrl };
