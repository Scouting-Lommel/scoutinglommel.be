import gql from 'graphql-tag';
import DIVIDER_FRAGMENT from '@/graphql/divider.gql';
import HERO_BLOCK_FRAGMENT from '@/graphql/hero-block.gql';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';

const MANUALS_PAGE_QUERY = gql`
  ${PAGE_META_FRAGMENT}
  ${HERO_BLOCK_FRAGMENT}
  ${DIVIDER_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query ManualsOverviewPage {
    manualsOverviewPage {
      slug
      pageMeta {
        ...PageMetaFragment
      }
      blocks {
        __typename
        ...HeroBlockFragment
        ...DividerFragment
      }
    }
  }
`;

const MANUALS_QUERY = gql`
  query Manuals {
    manuals {
      documentId
      title
      description
      slug
      locked
      body
      updatedAt
    }
  }
`;

export { MANUALS_PAGE_QUERY, MANUALS_QUERY };
