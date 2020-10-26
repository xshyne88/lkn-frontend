import gql from "graphql-tag";
import { isTokenValid } from "../../auth/helpers";
export default gql`
  query eventDetailsQuery($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      cost
      attending
      startTime
      participants(first: 100) {
        edges {
          node {
            id
            paid
            user {
              email
              image
            }
          }
        }
      }
    }
  }
`;
