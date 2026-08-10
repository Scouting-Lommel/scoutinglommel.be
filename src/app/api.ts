import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { GeneralDataQuery } from '@/types/generated/Graphql';
import { GENERAL_DATA } from './query';

export const getGeneralData = cache((): Promise<GeneralDataQuery> => {
  return generateApiQuery<GeneralDataQuery>({
    query: GENERAL_DATA,
  });
});
