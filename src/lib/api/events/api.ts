import { generateApiQuery } from '@/lib/api';
import type { GetEventsQuery, GetEventsQueryVariables } from '@/types/generated/Graphql';
import { GET_EVENTS_QUERY } from './queries';

export const getEvents = (date: string): Promise<GetEventsQuery> => {
  return generateApiQuery<GetEventsQuery, GetEventsQueryVariables>({
    variables: { currDate: date },
    query: GET_EVENTS_QUERY,
  });
};
