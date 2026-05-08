import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import type { Group } from '@/types/generated/Graphql';

const WIE_IS_WIE_QUERY = gql`
  ${IMAGE_FRAGMENT}

  query GetWieIsWie {
    groups {
      documentId
      name
      slug
      leaders(filters: { active: { eq: true } }) {
        documentId
        firstName
        lastName
        isGroupLeader
        image {
          ...ImageFragment
        }
        groupFunction {
          title
          description
        }
      }
    }
  }
`;

type GetWieIsWieQuery = {
  groups: Array<Group | null>;
};

export { WIE_IS_WIE_QUERY };
export type { GetWieIsWieQuery };
