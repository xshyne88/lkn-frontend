import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// TODO: move this
import { green } from "@material-ui/core/colors";

const colorPalette = {
  tan: "#f2b268",
  orange: "#d4503d",
  softBrown: "#94545",
  neonGreen: "#2AB67B",
  tiffanyBlue: "#11A7BB",
  limeGreen: "#10BC10",
  brightNeon: "#7CF47C",
  softGray: "#0e1111",
};

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: "white",
  },
  colorPalette: {
    ...colorPalette,
  },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions && extensions.code) {
          if (extensions.code === "UNAUTHENTICATED") {
            return;
          } else if (extensions.code === "UNAUTHORIZED") {
            return;
          }
        }
      });
    }
  }
);

const isFalsy = (target) => target === "null" || target === "undefined";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("access-token") || "";
  if (isFalsy(token)) return forward(operation);
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));
  return forward(operation);
});

const link = from([
  errorLink,
  authLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
