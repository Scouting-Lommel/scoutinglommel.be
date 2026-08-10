import gql from 'graphql-tag';

const CREATE_ACTIVITY_MUTATION = gql`
  mutation CreateActivity(
    $title: String!
    $startDate: Date!
    $startTime: Time!
    $endDate: Date!
    $endTime: Time!
    $description: String!
    $groupDocumentId: ID!
  ) {
    createActivity(
      data: {
        title: $title
        startDate: $startDate
        startTime: $startTime
        endDate: $endDate
        endTime: $endTime
        description: $description
        group: $groupDocumentId
      }
    ) {
      documentId
      title
      startDate
      startTime
      endDate
      endTime
      description
      group {
        documentId
      }
    }
  }
`;

const UPDATE_ACTIVITY_MUTATION = gql`
  mutation UpdateActivity(
    $documentId: ID!
    $title: String!
    $startDate: Date!
    $startTime: Time!
    $endDate: Date!
    $endTime: Time!
    $description: String!
  ) {
    updateActivity(
      documentId: $documentId
      data: {
        title: $title
        startDate: $startDate
        startTime: $startTime
        endDate: $endDate
        endTime: $endTime
        description: $description
      }
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

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivity($documentId: ID!) {
    deleteActivity(documentId: $documentId) {
      documentId
    }
  }
`;

export { CREATE_ACTIVITY_MUTATION, UPDATE_ACTIVITY_MUTATION, DELETE_ACTIVITY_MUTATION };
