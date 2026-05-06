import gql from 'graphql-tag';

const GET_FILES_QUERY = gql`
  query GetGroupWithFiles($slug: String) {
    groups(filters: { slug: { eq: $slug } }) {
      documentId
      files {
        documentId
        ext
        url
        name
        size
      }
      links {
        id
        label
        link
      }
    }
  }
`;

export { GET_FILES_QUERY };
