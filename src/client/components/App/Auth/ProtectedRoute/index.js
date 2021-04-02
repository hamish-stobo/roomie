import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth()
  // console.log(`isAuthed in protectedroute: ${JSON.stringify(auth)}`)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed) {
          return <Component {...rest} {...props} />;
        } else {
          // console.log(`protectedroute ${JSON.stringify(auth)}`)
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;