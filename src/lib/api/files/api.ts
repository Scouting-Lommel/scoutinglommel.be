import { generateApiQuery } from '@/lib/api';
import type {
  GetGroupWithFilesQuery,
  GetGroupWithFilesQueryVariables,
} from '@/types/generated/Graphql';
import { GET_FILES_QUERY } from './queries';

export const getFiles = (slug: string): Promise<GetGroupWithFilesQuery> => {
  return generateApiQuery<GetGroupWithFilesQuery, GetGroupWithFilesQueryVariables>({
    variables: { slug },
    query: GET_FILES_QUERY,
  });
};
