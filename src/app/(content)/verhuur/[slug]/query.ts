import gql from 'graphql-tag';
import CALENDAR_BLOCK_FRAGMENT from '@/graphql/calendar-block.gql';
import DIVIDER_FRAGMENT from '@/graphql/divider.gql';
import GALLERY_BLOCK_FRAGMENT from '@/graphql/gallery-block.gql';
import HERO_BLOCK_FRAGMENT from '@/graphql/hero-block.gql';
import IMAGE_FRAGMENT from '@/graphql/image-fragment.gql';
import MAP_BLOCK_FRAGMENT from '@/graphql/maps-block.gql';
import PAGE_META_FRAGMENT from '@/graphql/page-meta-fragment.gql';
import TARIFS_BLOCK_FRAGMENT from '@/graphql/tarifs-block.gql';
import TEXT_IMAGE_BLOCK_FRAGMENT from '@/graphql/text-image-block.gql';

const RENTAL_LOCATION_PAGE_QUERY = gql`
  ${HERO_BLOCK_FRAGMENT}
  ${TEXT_IMAGE_BLOCK_FRAGMENT}
  ${GALLERY_BLOCK_FRAGMENT}
  ${TARIFS_BLOCK_FRAGMENT}
  ${CALENDAR_BLOCK_FRAGMENT}
  ${MAP_BLOCK_FRAGMENT}
  ${DIVIDER_FRAGMENT}
  ${PAGE_META_FRAGMENT}
  ${IMAGE_FRAGMENT}

  query GetRentalLocationPage($slug: String) {
    rentalLocations(filters: { slug: { eq: $slug } }) {
      documentId
      pageMeta {
        ...PageMetaFragment
      }
      pageTitle
      slug
      description
      blocks {
        __typename
        ...HeroBlockFragment
        ...TextImageBlockFragment
        ...GalleryBlockFragment
        ...TarifsBlockFragment
        ...CalendarBlockFragment
        ...MapBlockFragment
        ...DividerFragment
      }
    }
  }
`;

export { RENTAL_LOCATION_PAGE_QUERY };
