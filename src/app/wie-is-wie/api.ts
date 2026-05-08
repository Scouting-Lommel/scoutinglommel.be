import { generateApiQuery } from '@/lib/api';
import { WIE_IS_WIE_QUERY } from './query';

export const getWieIsWie = (): Promise<any> => {
  return generateApiQuery({
    query: WIE_IS_WIE_QUERY,
  });
};
