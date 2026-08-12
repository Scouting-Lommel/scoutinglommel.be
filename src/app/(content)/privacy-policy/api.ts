import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { PrivacyPolicyPageQuery } from '@/types/generated/Graphql';
import { PRIVACY_PAGE_QUERY } from './query';

export const getPrivacyPage = cache((): Promise<PrivacyPolicyPageQuery> => {
  return generateApiQuery<PrivacyPolicyPageQuery>({
    query: PRIVACY_PAGE_QUERY,
  });
});
