import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { ContactPageQuery } from '@/types/generated/Graphql';
import { CONTACT_PAGE_QUERY } from './query';

export const getContactPage = cache((): Promise<ContactPageQuery> => {
  return generateApiQuery<ContactPageQuery>({
    query: CONTACT_PAGE_QUERY,
  });
});
