import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ErrorBoundary } from "../router/ErrorBoundary";
import { UserContext } from "../UserProvider";
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
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

const Page = ({ children }) => (
  <ErrorBoundary>
    <AppBar />
    <ErrorBoundary>{children}</ErrorBoundary>
  </ErrorBoundary>
);
