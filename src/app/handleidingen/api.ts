import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { MANUALS_PAGE_QUERY, MANUALS_QUERY } from './query';

export const getManualsPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: MANUALS_PAGE_QUERY,
  });
});

export const getManuals = cache((): Promise<any> => {
  return generateApiQuery({
    query: MANUALS_QUERY,
  });
});
