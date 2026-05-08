import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';

const WIE_IS_WIE_QUERY = gql`
  ${IMAGE_FRAGMENT}

  query getWieIsWie {
    groups {
      data {
        attributes {
          name
          slug
          leaders(filters: { active: { eq: true } }) {
            data {
              attributes {
                firstName
                lastName
                isGroupLeader
                image {
                  data {
                    attributes {
                      ...ImageFragment
                    }
                  }
                }
                groupFunction {
                  data {
                    attributes {
                      title
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { WIE_IS_WIE_QUERY };
