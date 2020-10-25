import gql from "graphql-tag";

export default gql`
  mutation signUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
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
