import React from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FakeImages from "./FakeImages";
import Spinner from "./Spinner";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import signUpMutation from "./graphql/mutations/signUpMutation";
import cancelSignUpMutation from "./graphql/mutations/cancelSignUpMutation";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    width: "100%",
    margin: "15px auto",
    backgroundColor: theme.colorPalette.softGray,
  },
  orangeColor: {
    color: theme.colorPalette.orange,
  },
  brightNeonColor: {
    color: theme.colorPalette.brightNeon,
  },
  neonGreenColor: {
    color: theme.colorPalette.neonGreen,
  },
  softGray: {
    backgroundColor: theme.colorPalette.softGray,
  },
  button: {
    color: theme.colorPalette.neonGreen,
    border: `solid 1px ${theme.colorPalette.neonGreen}`,
  },
  cancel: {
    color: "crimson",
    border: `solid 1px crimson`,
    position: "absolute",
    right: 16,
  },
}));

const AttendingBanner = (classes) => {
  return (
    <div
      style={{
        marginTop: 8,
        display: "flex",
      }}
    >
      <Typography className={classes.classes.brightNeonColor}>
        I'm going
      </Typography>
      <EmojiPeopleIcon className={classes.classes.brightNeonColor} />
    </div>
  );
};

const handleSignUp = (eventId, signUp) => {
  signUp({
    variables: {
      input: {
        eventId: eventId,
      },
    },
  })
    .then((r) => console.log(r))
    .catch((e) => console.error(e));
};

export default function EventCard({ event, idx = 0 }) {
  const classes = useStyles();
  let history = useHistory();
  const [signUp, { loading, error, data }] = useMutation(signUpMutation);
  const [cancelSignUp] = useMutation(cancelSignUpMutation);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.softGray}>
        <CardMedia
          component="img"
          alt="Event"
          height="80"
          image={FakeImages[idx % 4]}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.birghtNeonColor}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {event.name}
          </Typography>
          <Typography
            className={classes.neonGreenColor}
            variant="body2"
            color="textSecondary"
          >
            {dayjs(event.startTime).format("dddd, MMMM D h:mm A")}
          </Typography>
          {event.attending && <AttendingBanner classes={classes} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {event.attending ? (
          <Button
            onClick={(_e) => handleSignUp(event.id, cancelSignUp)}
            className={classes.cancel}
            size="small"
          >
            Cancel Attendance
          </Button>
        ) : loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={(_e) => handleSignUp(event.id, signUp)}
            className={classes.button}
            size="small"
            color="primary"
          >
            Sign Up
          </Button>
        )}
        <Button
          onClick={() => history.push(`/event/${event.id}`)}
          className={classes.button}
          size="small"
          color="primary"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
