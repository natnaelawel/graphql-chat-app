import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/auth";

const DynamicRoute = (props) => {
  const { user } = useAuthState();
  if (props.authenticated && !user) {
    return <Redirect to="/login" />;
  } else if (props.guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route {...props} component={props.component} />;
  }
};

export default DynamicRoute;
