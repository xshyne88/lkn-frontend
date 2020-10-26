import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ErrorBoundary } from "../router/ErrorBoundary";
import { UserContext } from "../auth/UserProvider";
import AppBar from "../AppBar";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Page>
            <Component {...props} />
          </Page>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;

const Page = ({ children }) => (
  <ErrorBoundary>
    <div id="page-container">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  </ErrorBoundary>
);

// <AppBar />
