import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth()
  const [auth, setAuth] = useState(true)
  setAuth(isAuthed)
  // console.log(`isAuthed in protectedroute: ${JSON.stringify(auth)}`)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) {
          return <Component {...rest} {...props} />;
        } else {
          console.log(`isAuthed ${auth}`)
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