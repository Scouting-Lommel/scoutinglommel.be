import { generateApiQuery } from '@/lib/api';
import type {
  UpdateGroupFilesMutation,
  UpdateGroupFilesMutationVariables,
  UpdateGroupLinkMutation,
  UpdateGroupLinkMutationVariables,
} from '@/types/generated/Graphql';
import { ADD_FILE_MUTATION, EDIT_LINKS_MUTATION } from './mutations';

export function addFile(id: string, files: string[]): Promise<UpdateGroupFilesMutation> {
  return generateApiQuery<UpdateGroupFilesMutation, UpdateGroupFilesMutationVariables>({
    variables: { documentId: id, files },
    query: ADD_FILE_MUTATION,
    operation: 'mutation',
  });
}

export function editLinks(id: string, links: any[]): Promise<UpdateGroupLinkMutation> {
  return generateApiQuery<UpdateGroupLinkMutation, UpdateGroupLinkMutationVariables>({
    variables: { documentId: id, links },
    query: EDIT_LINKS_MUTATION,
    operation: 'mutation',
  });
}
