import gql from 'graphql-tag';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';

const GENERAL_DATA = gql`
  ${IMAGE_FRAGMENT}

  query GeneralData {
    generalData {
      updatedAt
      siteName
      siteDescription
      url
      logo {
        ...ImageFragment
      }
      image {
        ...ImageFragment
      }
      address
      groupNumber
      bankAccountNumber
      vatNumber
      globalAlert {
        label
        variant
        enabled
      }
      contactItems {
        label
        link
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

export { GENERAL_DATA };
