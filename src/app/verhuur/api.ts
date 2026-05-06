import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { RENTAL_PAGE_QUERY } from './query';

export const getRentalPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: RENTAL_PAGE_QUERY,
  });
});
