import React from 'react'
import { useAuth } from '../App/Auth'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

const Logout = () => {
    const { setUser } = useAuth()
    Cookies.remove('accessToken')
    setUser(null)
    return (
        <>
            <Redirect to='/' />
        </>
    )
}

export default Logout
