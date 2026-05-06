import gql from 'graphql-tag';

const GET_ACTIVITIES_QUERY = gql`
  query GetActivities($slug: String, $currDate: Date) {
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

export { GET_ACTIVITIES_QUERY };
