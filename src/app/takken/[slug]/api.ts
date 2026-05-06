import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { GROUP_PAGE_QUERY } from './query';

export const getGroupPage = cache((slug: string): Promise<any> => {
  return generateApiQuery({
    variables: { slug: slug },
    query: GROUP_PAGE_QUERY,
  });
});
