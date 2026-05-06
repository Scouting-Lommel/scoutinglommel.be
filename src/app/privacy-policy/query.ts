import gql from 'graphql-tag';
import DIVIDER_FRAGMENT from '@/graphql/divider.gql';
import HERO_BLOCK_FRAGMENT from '@/graphql/hero-block.gql';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';
import POLICY_BLOCK_FRAGMENT from '@/graphql/policy-block.gql';

const PRIVACY_PAGE_QUERY = gql`
  ${HERO_BLOCK_FRAGMENT}
  ${POLICY_BLOCK_FRAGMENT}
  ${DIVIDER_FRAGMENT}
  ${PAGE_META_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query PrivacyPolicyPage {
    privacyPolicyPage {
      pageMeta {
        ...PageMetaFragment
      }
      blocks {
        __typename
        ...HeroBlockFragment
        ...PolicyBlockFragment
        ...DividerFragment
      }
    }
  }
`;

export { PRIVACY_PAGE_QUERY };
