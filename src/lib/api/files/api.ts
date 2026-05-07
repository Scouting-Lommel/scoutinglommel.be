import { generateApiQuery } from '@/lib/api';
import type {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  GetGroupWithFilesQuery,
  GetGroupWithFilesQueryVariables,
} from '@/types/generated/Graphql';
import { DELETE_FILE_MUTATION } from './mutations';
import { GET_FILES_QUERY } from './queries';

export const getFiles = (slug: string): Promise<GetGroupWithFilesQuery> => {
  return generateApiQuery<GetGroupWithFilesQuery, GetGroupWithFilesQueryVariables>({
    variables: { slug },
    query: GET_FILES_QUERY,
  });
};

export function deleteFile(id: string): Promise<DeleteFileMutation> {
  return generateApiQuery<DeleteFileMutation, DeleteFileMutationVariables>({
    variables: { id },
    query: DELETE_FILE_MUTATION,
    operation: 'mutation',
  });
}
