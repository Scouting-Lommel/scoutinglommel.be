import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { GeneralDataForRegisterPageQuery, RegisterPageQuery } from '@/types/generated/Graphql';
import { GENERAL_DATA_FOR_REGISTER_PAGE, REGISTER_PAGE_QUERY } from './query';

export const getRegisterPage = cache((): Promise<RegisterPageQuery> => {
  return generateApiQuery<RegisterPageQuery>({
    query: REGISTER_PAGE_QUERY,
  });
});

export const getGeneralDataForRegisterPage = cache((): Promise<GeneralDataForRegisterPageQuery> => {
  return generateApiQuery<GeneralDataForRegisterPageQuery>({
    query: GENERAL_DATA_FOR_REGISTER_PAGE,
  });
});
