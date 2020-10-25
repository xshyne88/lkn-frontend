import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "./auth/UserProvider";
import Logout from "./auth/Logout";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  const previousPath = location.from;
  /* if (previousPath) history.push(previousPath); */

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIcon onClick={() => history.goBack()} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            LKN Volleyball
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              Logout();
              history.push("/");
            }}
          >
            <Typography variant="h6" className={classes.title}>
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
