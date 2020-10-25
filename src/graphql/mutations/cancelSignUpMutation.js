import gql from "graphql-tag";

export default gql`
  mutation cancelSignUp($input: SignUpInput!) {
    cancelSignUp(input: $input) {
      successful
      messages {
        code
        field
        message
      }
      result {
        attending
        cost
        id
        attending
        participants(first: 100) {
          edges {
            node {
              id
              paid
            }
          }
        }
      }
    }
  }
`;
