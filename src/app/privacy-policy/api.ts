import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { PRIVACY_PAGE_QUERY } from './query';

export const getPrivacyPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: PRIVACY_PAGE_QUERY,
  });
});
