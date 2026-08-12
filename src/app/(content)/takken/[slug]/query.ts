import gql from 'graphql-tag';
import ACTIVITY_BLOCK_FRAGMENT from '@/graphql/activities-block.gql';
import DIVIDER_FRAGMENT from '@/graphql/divider.gql';
import FILES_BLOCK_FRAGMENT from '@/graphql/files-block.gql';
import HERO_BLOCK_FRAGMENT from '@/graphql/hero-block.gql';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import LEADER_BLOCK_FRAGMENT from '@/graphql/leaders-block.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';
import TEXT_IMAGE_BLOCK_FRAGMENT from '@/graphql/text-image-block.gql';

const GROUP_PAGE_QUERY = gql`
  ${HERO_BLOCK_FRAGMENT}
  ${TEXT_IMAGE_BLOCK_FRAGMENT}
  ${LEADER_BLOCK_FRAGMENT}
  ${FILES_BLOCK_FRAGMENT}
  ${ACTIVITY_BLOCK_FRAGMENT}
  ${DIVIDER_FRAGMENT}
  ${PAGE_META_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query GetGroupPage($slug: String) {
    groups(filters: { slug: { eq: $slug } }) {
      documentId
      slug
      pageMeta {
        ...PageMetaFragment
      }
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
      pageTitle
      subtitle
      leaders {
        documentId
        active
        firstName
        lastName
        image {
          ...ImageFragment
        }
      }
      blocks {
        __typename
        ...HeroBlockFragment
        ...TextImageBlockFragment
        ...LeadersBlockFragment
        ...FilesBlockFragment
        ...ActivityBlockFragment
        ...DividerFragment
      }
    }
  }
`;

export { GROUP_PAGE_QUERY };
