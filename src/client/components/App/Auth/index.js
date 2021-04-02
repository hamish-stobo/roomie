import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext)
  };

const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const isAuthed = user?.user_id ? true : false
    const { user_id } = useParams()
    const getProfile = async userID => {
        try {
          if(userID === 'logged in user') {
            //setProfile(authedUser)
          }  else {
            const profileRes = await axios.get(`/api/v1/users/${userID}`)
            const { data } = profileRes
            if(!data || data == '{}') throw 'No profile found'
            data.created_at = data.created_at.split('T')[0]
            setUser(data)
            console.log(`user data: ${JSON.stringify(data)}`)
          }
        } catch (e) {
          alert(e)
        }
      }
    // setUser({...user, id: "12345"})
    useEffect(() => {
        getProfile(user_id)
    }, [])
    const signin = userId => {getProfile(userId)}
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
