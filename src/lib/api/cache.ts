// Cache configuration for different types of data
export const CACHE_CONFIG = {
  // Static data that rarely changes
  STATIC: {
    revalidate: 604800, // 7 days
    tags: ['static-data'],
    headers: {
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=600',
      'CDN-Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=600',
    },
  },
  // Dynamic content that changes frequently
  DYNAMIC: {
    revalidate: 3600, // 1 hour
    tags: ['dynamic-data'],
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=120',
      'CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=120',
    },
  },
  // User-specific data
  USER: {
    revalidate: 1800, // 30 minutes
    tags: ['user-data'],
    headers: {
      'Cache-Control': 'private, max-age=1800, stale-while-revalidate=300',
      Vary: 'Authorization, Cookie',
    },
  },
  // Write operations - no cache
  WRITE: {
    revalidate: 0,
    tags: [],
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

// Helper function to get Next.js cache options
export function getCacheOptions(type: keyof typeof CACHE_CONFIG): {
  cache: 'force-cache' | 'no-store';
  next: { revalidate: number; tags: string[] };
} {
  const config = CACHE_CONFIG[type];
  return {
    cache: type === 'USER' || type === 'WRITE' ? 'no-store' : 'force-cache',
    next: {
      revalidate: config.revalidate,
      tags: [...config.tags],
    },
  };
}
