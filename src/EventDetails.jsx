import React from "react";
import { useQuery } from "@apollo/react-hooks";
import EVENT_DETAILS_QUERY from "./graphql/queries/eventDetailsQuery";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

export default () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(EVENT_DETAILS_QUERY, {
    variables: { eventId: id },
  });
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return <pre>{JSON.stringify(data, 0, 2)}</pre>;
};
