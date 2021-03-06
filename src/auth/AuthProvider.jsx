import React from "react";
import { useHistory } from "react-router-dom";
import { isAccessTokenValid } from "./helpers";
import { UserProvider } from "./UserProvider";

export default ({ children }) => {
  const history = useHistory();

  const handleLogout = () => history.push("/");
  return (
    <UserProvider
      onLogout={handleLogout}
      history={history}
      isAuthenticated={isAccessTokenValid()}
    >
      {children}
    </UserProvider>
  );
};
