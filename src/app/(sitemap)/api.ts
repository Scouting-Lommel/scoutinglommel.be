import { generateApiQuery } from '@/lib/api';
import type { SitemapQuery } from '@/types/generated/Graphql';
import { SITEMAP_QUERY } from './query';

export const getSitemap = async (): Promise<SitemapQuery> => {
  return generateApiQuery<SitemapQuery>({
    query: SITEMAP_QUERY,
  });
};
