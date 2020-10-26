import React from "react";
import { useQuery } from "@apollo/react-hooks";
import EVENT_DETAILS_QUERY from "./graphql/queries/eventDetailsQuery";
import { useParams, useHistory } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { formatDateTime } from "./helpers";
import prune from "./prune";
export default () => {
  let history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(EVENT_DETAILS_QUERY, {
    variables: { eventId: id },
  });
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  const { event } = data;
  const { participants } = prune(event);
  console.log(participants);
  return (
    <div
      style={{
        height: "250px",
        width: "100%",
        background: `linear-gradient(110deg, black 25%, #3b1361 80%)`,
        borderBottomLeftRadius: `50% 20%`,
        borderBottomRightRadius: `70% 20%`,
      }}
    >
      <div style={{ display: "flex" }}>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </div>
      <div style={{ marginBottom: 30 }}></div>
      <Typography style={{ color: "white" }} align="left" variant="h4">
        {event.name}
      </Typography>
      <Divider style={{ margin: "20px 0px", backgroundColor: "white" }} />

      <Typography variant="h6" style={{ marginTop: 24, color: "white" }}>
        Time
      </Typography>
      <Typography variant="body2">{formatDateTime(event.startTime)}</Typography>
      <Typography style={{ marginTop: 24, color: "white" }} variant="h6">
        Cost
      </Typography>
      <Typography variant="body2">{`${event.cost}$`}</Typography>

      {participants.length ? (
        <Typography style={{ marginTop: 24, color: "white" }} variant="h6">
          Participants
        </Typography>
      ) : null}
      {participants.map((p) => (
        <Typography style={{ color: "white" }} variant="body2" key={p.id}>
          {p.user.email}
        </Typography>
      ))}
      <Typography style={{ marginTop: 24, color: "white" }} variant="h6">
        Where
      </Typography>
      <Typography variant="body2">some location</Typography>
    </div>
  );
};
