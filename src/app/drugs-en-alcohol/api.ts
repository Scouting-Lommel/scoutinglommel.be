import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { DA_PAGE_QUERY } from './query';

export const getDAPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: DA_PAGE_QUERY,
  });
});
