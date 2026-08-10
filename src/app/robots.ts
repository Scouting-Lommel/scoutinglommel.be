import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

const robots = async (): Promise<MetadataRoute.Robots> => {
  const siteUrl = await getSiteUrl();
  const isProduction = process.env.APP_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? ['/'] : [],
      disallow: isProduction
        ? ['/dashboard', '/dashboard/*', '/inloggen', '/geen-toegang', '/playground']
        : ['/*'],
    },
    sitemap: isProduction ? `${siteUrl}/sitemap.xml` : undefined,
  };
};

export default robots;
