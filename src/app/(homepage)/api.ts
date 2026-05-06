import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { HOMEPAGE_QUERY } from './query';

export const getHomePage = cache(async (): Promise<any> => {
  return generateApiQuery({
    query: HOMEPAGE_QUERY,
  });
});
