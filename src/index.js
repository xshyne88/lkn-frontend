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
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
