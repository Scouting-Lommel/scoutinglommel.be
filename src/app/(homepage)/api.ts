import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { HomePageQuery } from '@/types/generated/Graphql';
import { HOMEPAGE_QUERY } from './query';

export const getHomePage = cache(async (): Promise<HomePageQuery> => {
  return generateApiQuery<HomePageQuery>({
    query: HOMEPAGE_QUERY,
  });
});
