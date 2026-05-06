import gql from 'graphql-tag';

const REGISTER_MEMBER_MUTATION = gql`
  mutation RegisterMember(
    $firstName: String
    $lastName: String
    $birthday: Date
    $address: String
    $postalCode: String
    $city: String
    $telephoneNumber: String
    $email: String
    $isAkabe: Boolean
    $gender: ENUM_MEMBER_GENDER
    $comments: String
    $workingYear: String
  ) {
    createMember(
      data: {
        firstName: $firstName
        lastName: $lastName
        birthday: $birthday
        address: $address
        postCode: $postalCode
        locality: $city
        phone: $telephoneNumber
        email: $email
        isAkabe: $isAkabe
        gender: $gender
        comments: $comments
        workingYear: $workingYear
      }
    ) {
      documentId
    }
  }
`;

export { REGISTER_MEMBER_MUTATION };
