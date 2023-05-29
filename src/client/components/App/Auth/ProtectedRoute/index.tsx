import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "..";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth()
  return (
    <Route
      {...rest}
      render={props => isAuthed 
          ? <Component {...rest} {...props} />
          : <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
      }
    />
  )
}

export default ProtectedRoute;