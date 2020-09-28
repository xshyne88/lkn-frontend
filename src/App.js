import React from "react";
import SignIn from "./auth/SignIn";
import Logout from "./auth/Logout";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";
import OauthLogin from "./auth/OauthLogin";
import EventDetails from "./EventDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/oauth" component={OauthLogin} />
        <PrivateRoute exact path="/events" component={Home} />
        <PrivateRoute exact path="/event/:id" component={EventDetails} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </AuthProvider>
    </Router>
  );
}

export default App;
