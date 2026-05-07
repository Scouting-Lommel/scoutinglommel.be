import { generateApiQuery } from '@/lib/api';
import type {
  GetDashboardActivitiesQuery,
  GetDashboardActivitiesQueryVariables,
  GetDashboardGroupPageQuery,
  GetDashboardGroupPageQueryVariables,
} from '@/types/generated/Graphql';
import { GROUP_PAGE_QUERY, ACTIVITIES_QUERY } from './query';

export const getGroupPage = (slug: string): Promise<GetDashboardGroupPageQuery> => {
  return generateApiQuery<GetDashboardGroupPageQuery, GetDashboardGroupPageQueryVariables>({
    variables: { slug },
    query: GROUP_PAGE_QUERY,
  });
};

export const getActivities = (slug: string, date: string): Promise<GetDashboardActivitiesQuery> => {
  return generateApiQuery<GetDashboardActivitiesQuery, GetDashboardActivitiesQueryVariables>({
    variables: { slug, currDate: date },
    query: ACTIVITIES_QUERY,
  });
};
