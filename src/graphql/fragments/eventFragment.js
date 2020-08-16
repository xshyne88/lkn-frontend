import { gql } from "@apollo/client";

export default gql`
  fragment eventFragment on Event {
    id
    name
    startTime
    cost
    image
  }
`;
