import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import type { Group } from '@/types/generated/Graphql';

const WIE_IS_WIE_QUERY = gql`
  ${IMAGE_FRAGMENT}

  query GetWieIsWie {
    groups(pagination: { limit: 100 }) {
      documentId
      name
      slug
      leaders(filters: { active: { eq: true } }, pagination: { limit: 100 }) {
        documentId
        firstName
        lastName
        totem
        dateOfBirth
        occupation
        isStudent
        fieldOfStudy
        memberSince
        leaderSince
        bio
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
