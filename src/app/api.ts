import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { GENERAL_DATA } from './query';

export const getGeneralData = cache((): Promise<any> => {
  return generateApiQuery({
    query: GENERAL_DATA,
  });
});
