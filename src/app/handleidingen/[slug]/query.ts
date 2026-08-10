import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';

const MANUAL_PAGE_QUERY = gql`
  ${PAGE_META_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query GetManualPage($slug: String!) {
    manuals(filters: { slug: { eq: $slug } }) {
      documentId
      pageMeta {
        ...PageMetaFragment
      }
      updatedAt
      title
      slug
      locked
      description
      body
    }
  }
`;

export { MANUAL_PAGE_QUERY };
