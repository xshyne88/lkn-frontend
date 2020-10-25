import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import prune from "./prune";
import homeQuery from "./graphql/queries/homeQuery";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { UserContext } from "./auth/UserProvider";
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
  },
  listItem: {
    color: "white",
  },
  listContainer: {
    backgroundColor: "black",
    height: "100%",
  },
}));

const GreetingsBanner = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  return (
    <ListItem>
      <ListItemText
        className={classes.listItem}
        primary={"Hi Chase, "}
        primaryTypographyProps={{ variant: "h4" }}
      ></ListItemText>
      <ListItemSecondaryAction>
        <Avatar
          style={{ float: "right", height: "100%", marginTop: 16 }}
          alt="FB Avatar"
          src={user.image}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default function CheckboxListSecondary() {
  const classes = useStyles();
  let history = useHistory();

  const { loading, error, data } = useQuery(homeQuery);
  if (error || loading) return <Loading />;

  const { events } = prune(data);

  return (
    <div className={classes.listContainer}>
      <GreetingsBanner />
      <div></div>
      <List dense className={classes.root}>
        {events.map((event, idx) => {
          return <EventCard event={event} key={event.id} idx={idx} />;
          // return (
          //   <ListItem
          //     key={event.id}
          //     button
          //     onClick={() => history.push(`/event/${event.id}`)}
          //   >
          //     <ListItemText
          //       id={labelId}
          //       primary={event.name}
          //       secondary={
          //         <Typography>{event.startTime || "Jan 1"}</Typography>
          //       }
          //     />
          //     <ListItemSecondaryAction>
          //       <Button>Sign Up</Button>
          //       {/* <Checkbox
          //         edge="end"
          //         onChange={handleToggle(event.id)}
          //         checked={checked.indexOf(event.id) !== -1}
          //         inputProps={{ "aria-labelledby": labelId }}
          //         /> */}
          //     </ListItemSecondaryAction>
          //   </ListItem>
          // );
        })}
      </List>
    </div>
  );
}
