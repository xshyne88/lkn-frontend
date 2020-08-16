import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import queryString from "query-string";
import { UserContext } from "./UserProvider";
import jwtDecode from "jwt-decode";

const signInRedirect = <Redirect to="/sign-in" />;

export default (props) => {
  if (!props?.location?.search) return signInRedirect;
  const queryParams = queryString.parse(props.location.search);

  if (!queryParams) return signInRedirect;

  const { authorization: authToken } = queryParams;
  const decodedToken = jwtDecode(authToken);

  if (!decodedToken) return signInRedirect;

  const setTokens = (token, user) => {
    localStorage.setItem("access-token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const {
    sub: { email, admin, image },
  } = decodedToken;

  const decodedUser = { email, admin, image };

  if (!queryParams || !decodedToken) {
    return signInRedirect;
    // put that login was unsuccessful error ^
  }
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setTokens(queryParams.authorization, decodedUser);
    setUser(decodedUser);
  });

  return <Redirect to="/events" />;
};
