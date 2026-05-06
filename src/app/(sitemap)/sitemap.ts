import generateSitemap from '@/lib/helpers/generateSitemap';
import { getSitemap } from './api';

const Sitemap = async (): Promise<any> => {
  try {
    const data = await getSitemap();
    return generateSitemap(data);
  } catch (error) {
    console.warn('[sitemap] Failed to fetch sitemap data, returning empty sitemap:', error);
    return [];
  }
};

export default Sitemap;
