import React from "react";
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
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const { loading, error, data } = useQuery(homeQuery);
  if (error || loading) return <Loading />;

  const { events } = prune(data);
  return (
    <List dense className={classes.root}>
      {events.map((event) => {
        const labelId = `checkbox-list-secondary-label-${event.id}`;
        return (
          <ListItem key={event.id} button>
            <ListItemText
              id={labelId}
              primary={event.name}
              secondary={event.startTime || "Jan 1"}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(event.id)}
                checked={checked.indexOf(event.id) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
