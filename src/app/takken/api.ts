import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { GroupsPageQuery } from '@/types/generated/Graphql';
import { GROUPS_PAGE_QUERY } from './query';

export const getGroupsPage = cache((): Promise<GroupsPageQuery> => {
  return generateApiQuery<GroupsPageQuery>({
    query: GROUPS_PAGE_QUERY,
  });
});
