import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { GROUPS_PAGE_QUERY } from './query';

export const getGroupsPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: GROUPS_PAGE_QUERY,
  });
});
