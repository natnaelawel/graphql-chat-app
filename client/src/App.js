import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import SignIn from "./components/pages/Signin";
import SignUp from "./components/pages/Signup";
import Home from "./components/pages/Index";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/register" exact component={SignUp} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
