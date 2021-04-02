import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

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
    console.log(`Cookies.get() ${JSON.stringify(Cookies.get())}`)
    console.log(document.cookie)
    const isAuthed = user?.user_id ? true : false
    const signin = async userID => {
      try {
          const profileRes = await axios.get(`/api/v1/users/${userID}`)
          const { data } = profileRes
          if(!data || data == '{}') throw 'No profile found'
          data.created_at = data.created_at.split('T')[0]
          setUser(data)
      } catch (e) {
        alert(e)
      }
    }
  
    return { user, setUser, isAuthed, signin }
  }