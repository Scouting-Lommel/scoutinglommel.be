import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { GetManualPageQuery, GetManualPageQueryVariables } from '@/types/generated/Graphql';
import { MANUAL_PAGE_QUERY } from './query';

export const getManualPage = cache((slug: string): Promise<GetManualPageQuery> => {
  return generateApiQuery<GetManualPageQuery, GetManualPageQueryVariables>({
    variables: { slug },
    query: MANUAL_PAGE_QUERY,
  });
});
