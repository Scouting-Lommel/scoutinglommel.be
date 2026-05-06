import gql from 'graphql-tag';

const GET_EVENTS_QUERY = gql`
  query GetEvents($currDate: Date) {
    events(filters: { startDate: { gte: $currDate } }, sort: "startDate:asc") {
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

export { GET_EVENTS_QUERY };
