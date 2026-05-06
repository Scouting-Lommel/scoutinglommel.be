import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { COOKIE_PAGE_QUERY } from './query';

export const getCookiePage = cache((): Promise<any> => {
  return generateApiQuery({
    query: COOKIE_PAGE_QUERY,
  });
});
