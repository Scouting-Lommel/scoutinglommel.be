import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import { WIE_IS_WIE_QUERY } from './query';
import type { GetWieIsWieQuery } from './query';

export const getWieIsWie = cache((): Promise<GetWieIsWieQuery> => {
  return generateApiQuery<GetWieIsWieQuery>({
    query: WIE_IS_WIE_QUERY,
  });
});
