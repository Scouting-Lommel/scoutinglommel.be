import gql from 'graphql-tag';

const SITEMAP_QUERY = gql`
  query Sitemap {
    homePage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    groupsPage {
      updatedAt
      slug
      pageMeta {
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
      slug
      pageMeta {
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
      slug
      pageMeta {
        noIndex
      }
    }
    registerPage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    contactPage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    articlesPage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    drugsAlcoholPolicyPage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
    privacyPolicyPage {
      updatedAt
      slug
      pageMeta {
        noIndex
      }
    }
  }
`;

export { SITEMAP_QUERY };
