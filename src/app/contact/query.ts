import gql from 'graphql-tag';
import DIVIDER_FRAGMENT from '@/graphql/divider.gql';
import HERO_BLOCK_FRAGMENT from '@/graphql/hero-block.gql';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';

const CONTACT_PAGE_QUERY = gql`
  ${HERO_BLOCK_FRAGMENT}
  ${DIVIDER_FRAGMENT}
  ${PAGE_META_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query ContactPage {
    contactPage {
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

export { CONTACT_PAGE_QUERY };
