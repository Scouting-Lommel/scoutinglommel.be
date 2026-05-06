import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';

export const NAVIGATION_DATA = gql`
  ${IMAGE_FRAGMENT}

  query NavigationData {
    generalData {
      logo {
        ...ImageFragment
      }
      mainNavigation {
        label
        link
        page
        dropdownItems {
          label
          page
          link
        }
        dropdownCta {
          title
          intro
          ctaLink
          ctaLabel
        }
        dropdownTitle
        dropdownButton {
          label
          link
          variant
        }
      }
      globalAlert {
        label
        variant
        enabled
      }
    }
    groups {
      documentId
      name
      description
      slug
    }
    rentalLocations {
      documentId
      name
      description
      slug
    }
  }
`;

export const FOOTER_DATA = gql`
  query FooterData {
    generalData {
      siteName
      address
      groupNumber
      bankAccountNumber
      vatNumber
      contactItems {
        label
        link
      }
      footerNavigation {
        title
        navItems {
          label
          link
        }
      }
      socials {
        documentId
        title
        link
        icon
      }
    }
  }
`;

export const SEO_DATA = gql`
  ${IMAGE_FRAGMENT}

  query SeoData {
    generalData {
      updatedAt
      siteName
      siteDescription
      url
      image {
        ...ImageFragment
      }
    }
  }
`;
