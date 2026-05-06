import gql from 'graphql-tag';

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFile($id: ID!) {
    deleteUploadFile(id: $id) {
      documentId
    }
  }
`;

export { DELETE_FILE_MUTATION };
