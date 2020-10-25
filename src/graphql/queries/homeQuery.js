import gql from "graphql-tag";
import eventFragment from "../fragments/eventFragment";

export default gql`
  query eventsQuery {
    events(first: 100) {
      edges {
        node {
          ...eventFragment
        }
      }
    }
  }
  ${eventFragment}
`;
