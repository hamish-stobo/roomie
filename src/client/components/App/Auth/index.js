import React, { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext)
  };

const useProvideAuth = () => {
    const [user, setUser] = useState({id: "12345"})
    const isAuthed = user?.id ? true : false
    // setUser({...user, id: "12345"})
    // useEffect(() => {+
    // //   setTimeout(2000, setUser({...user, }))
    // }, []);
    const signin = () => {console.log('hello')}
    // const signin = (email, password) => {
    //   return fetch("/api/v1/login", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   })
    //     .then((res) => res.json())
    //     .then(
    //       (user) => setUser(user.user),
    //       (error) => setUser(null),
    //       user
    //     )
    //     .catch((error) => error)
    // };
  
    return { user, setUser, isAuthed, signin }
  }
