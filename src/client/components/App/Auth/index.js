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
    const [popup, setPopup] = useState(null)
    const isAuthed = !!Cookies.get('accessToken')
    const signin = async () => {
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
    return { user, setUser, isAuthed, signin, popup, setPopup }
  }
