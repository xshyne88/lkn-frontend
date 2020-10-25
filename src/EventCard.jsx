import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FakeImages from "./FakeImages";
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
  softGray: {
    backgroundColor: theme.colorPalette.softGray,
  },
}));

export default function EventCard({ event, idx = 0 }) {
  const classes = useStyles();

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
            className={classes.orangeColor}
            variant="body2"
            color="textSecondary"
          >
            {event.startTime}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Sign Up
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
