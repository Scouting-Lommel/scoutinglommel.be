import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { ManualsOverviewPageQuery, ManualsQuery } from '@/types/generated/Graphql';
import { MANUALS_PAGE_QUERY, MANUALS_QUERY } from './query';

export const getManualsPage = cache((): Promise<ManualsOverviewPageQuery> => {
  return generateApiQuery<ManualsOverviewPageQuery>({
    query: MANUALS_PAGE_QUERY,
  });
});

export const getManuals = cache((): Promise<ManualsQuery> => {
  return generateApiQuery<ManualsQuery>({
    query: MANUALS_QUERY,
  });
});
