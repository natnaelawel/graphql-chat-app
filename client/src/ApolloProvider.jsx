import React from "react";
import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
function ApolloProvider(props) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={client} {...props}></Provider>;
}

export default ApolloProvider;
