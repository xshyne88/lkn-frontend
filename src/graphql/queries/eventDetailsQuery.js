import gql from "graphql-tag";
export default gql`
  query eventDetailsQuery($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      cost
    }
  }
`;
