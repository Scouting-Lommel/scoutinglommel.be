import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { RentalPageQuery } from '@/types/generated/Graphql';
import { RENTAL_PAGE_QUERY } from './query';

export const getRentalPage = cache((): Promise<RentalPageQuery> => {
  return generateApiQuery<RentalPageQuery>({
    query: RENTAL_PAGE_QUERY,
  });
});
