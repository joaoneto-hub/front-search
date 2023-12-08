import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }


  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
