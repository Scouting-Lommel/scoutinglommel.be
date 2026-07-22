import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type {
  GetRentalLocationPageQuery,
  GetRentalLocationPageQueryVariables,
} from '@/types/generated/Graphql';
import { RENTAL_LOCATION_PAGE_QUERY } from './query';

export const getRentalLocationPage = cache((slug: string): Promise<GetRentalLocationPageQuery> => {
  return generateApiQuery<GetRentalLocationPageQuery, GetRentalLocationPageQueryVariables>({
    variables: { slug },
    query: RENTAL_LOCATION_PAGE_QUERY,
  });
});
