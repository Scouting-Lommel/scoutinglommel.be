import type { MetadataRoute } from 'next';
import generateSitemap from '@/lib/helpers/generateSitemap';
import { getSitemap } from './api';

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const data = await getSitemap();
    const sitemap = await generateSitemap(data);
    return sitemap;
  } catch (error) {
    console.warn('[sitemap] Failed to fetch sitemap data, returning empty sitemap:', error);
    return [];
  }
};

export default Sitemap;
