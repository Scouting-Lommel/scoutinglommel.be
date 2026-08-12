import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { CookiePolicyPageQuery } from '@/types/generated/Graphql';
import { COOKIE_PAGE_QUERY } from './query';

export const getCookiePage = cache((): Promise<CookiePolicyPageQuery> => {
  return generateApiQuery<CookiePolicyPageQuery>({
    query: COOKIE_PAGE_QUERY,
  });
});
