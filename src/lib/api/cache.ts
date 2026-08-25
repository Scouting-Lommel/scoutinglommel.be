// Cache-Control headers for API route responses
export const CACHE_CONFIG = {
  // Static data that rarely changes
  STATIC: {
    headers: {
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=600',
      'CDN-Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=600',
    },
  },
  // Dynamic content that changes frequently
  DYNAMIC: {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=120',
      'CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=120',
    },
  },
  // User-specific data
  USER: {
    headers: {
      'Cache-Control': 'private, max-age=1800, stale-while-revalidate=300',
      Vary: 'Authorization, Cookie',
    },
  },
  // Write operations - no cache
  WRITE: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
} as const;

// Helper function to get appropriate cache headers
export function getCacheHeaders(type: keyof typeof CACHE_CONFIG) {
  return CACHE_CONFIG[type].headers;
}
