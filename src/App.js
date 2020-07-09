import React from "react";
import Appbar from "./AppBar";
import SignIn from "./auth/SignIn";
import Logout from "./auth/Logout";
// import Login from "./auth/Login"
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <Router>
      {
        //<AuthProvider>
        // <Route exact path="/register" component={Register} />
      }
      <Route exact path="/" component={SignIn} />
      <Route exact path="/sign-in" component={SignIn} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/logout" component={Logout} />
      <Appbar />
      <SignIn />
      {
        // </AuthProvider>
      }
    </Router>
  );
}

export default App;
