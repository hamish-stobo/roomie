import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth()
  // console.log(`isAuthed in protectedroute: ${JSON.stringify(auth)}`)
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