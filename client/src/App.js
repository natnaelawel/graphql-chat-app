// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.scss";
import SignIn from "./components/pages/Signin";
import SignUp from "./components/pages/Signup";
import Home from "./components/pages/Index";

import DynamicRoute from "./RouteHandler/DynamicRoute";
import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";

function App() {
  // const client = new ApolloClient({
  //   uri: "http://localhost:4000",
  //   cache: new InMemoryCache(),
  // });
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Switch>
              <DynamicRoute path="/register" exact component={SignUp} guest />
              <DynamicRoute path="/login" exact component={SignIn} guest />
              <DynamicRoute path="/" component={Home} authenticated />
            </Switch>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
