import gql from 'graphql-tag';

const ADD_FILE_MUTATION = gql`
  mutation UpdateGroupFiles($documentId: ID!, $files: [ID]!) {
    updateGroup(documentId: $documentId, data: { files: $files }) {
      documentId
      files {
        documentId
        url
      }
    }
  }
`;

const EDIT_LINKS_MUTATION = gql`
  mutation UpdateGroupLink($documentId: ID!, $links: [ComponentGeneralLinkInput]!) {
    updateGroup(documentId: $documentId, data: { links: $links }) {
      documentId
    }
  }
`;

export { ADD_FILE_MUTATION, EDIT_LINKS_MUTATION };
