import gql from 'graphql-tag';

const GROUP_PAGE_QUERY = gql`
  query GetDashboardGroupPage($slug: String) {
    groups(filters: { slug: { eq: $slug } }) {
      documentId
      pageTitle
      slug
    }
  }
`;

const ACTIVITIES_QUERY = gql`
  query GetDashboardActivities($slug: String, $currDate: Date) {
    activities(
      filters: { group: { slug: { eq: $slug } }, endDate: { gte: $currDate } }
      sort: "startDate:asc"
    ) {
      documentId
      title
      startDate
      startTime
      endDate
      endTime
      description
    }
  }
`;

export { GROUP_PAGE_QUERY, ACTIVITIES_QUERY };
