import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { GENERAL_DATA_FOR_REGISTER_PAGE, REGISTER_PAGE_QUERY } from './query';

export const getRegisterPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: REGISTER_PAGE_QUERY,
  });
});

export const getGeneralDataForRegisterPage = cache((): Promise<any> => {
  return generateApiQuery({
    query: GENERAL_DATA_FOR_REGISTER_PAGE,
  });
});
