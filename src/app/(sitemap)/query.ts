import gql from 'graphql-tag';

const SITEMAP_QUERY = gql`
  query Sitemap {
    homePage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    groupsPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    groups {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    rentalPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    rentalLocations {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    infoPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    registerPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    contactPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    drugsAlcoholPolicyPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
    privacyPolicyPage {
      updatedAt
      pageMeta {
        slug
        noIndex
      }
    }
  }
`;

export { SITEMAP_QUERY };
