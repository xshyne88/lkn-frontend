import React from "react";
import { Redirect } from "react-router-dom";

export default ({ error }) => {
  if (error) {
    console.error("an error has occurred: ", error);
  }
  return <Redirect to="/" />;
};
