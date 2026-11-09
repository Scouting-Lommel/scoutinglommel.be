// `new URL` handles protocol-relative paths, root-relative paths, and bases
// that contain a path. Anything it cannot resolve is returned unchanged.
const resolveUrl = (value: string, baseUrl?: string | null): string => {
  if (!baseUrl) return value;

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
};

export { resolveUrl };
