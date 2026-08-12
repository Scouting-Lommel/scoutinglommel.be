import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { GetGroupPageQuery, GetGroupPageQueryVariables } from '@/types/generated/Graphql';
import { GROUP_PAGE_QUERY } from './query';

export const getGroupPage = cache((slug: string): Promise<GetGroupPageQuery> => {
  return generateApiQuery<GetGroupPageQuery, GetGroupPageQueryVariables>({
    variables: { slug },
    query: GROUP_PAGE_QUERY,
  });
});
