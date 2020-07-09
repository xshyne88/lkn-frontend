import React from "react";
import SignIn from "./auth/SignIn";
import Logout from "./auth/Logout";
// import Login from "./auth/Login"
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </AuthProvider>
    </Router>
  );
}

export default App;
// <Route exact path="/register" component={Register} />
