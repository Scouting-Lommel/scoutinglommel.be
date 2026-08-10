import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { DrugsAlcoholPolicyPageQuery } from '@/types/generated/Graphql';
import { DA_PAGE_QUERY } from './query';

export const getDAPage = cache((): Promise<DrugsAlcoholPolicyPageQuery> => {
  return generateApiQuery<DrugsAlcoholPolicyPageQuery>({
    query: DA_PAGE_QUERY,
  });
});
