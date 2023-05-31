import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from '../../Footer'
import { useAuth } from '../Auth'
import axios from 'axios'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const { user, setUser } = useAuth()
    const getProfile = async () => {
        try {
            const profileRes = await axios.get('/api/v1/users/fromcookie')
            const { data } = profileRes
            if (!data || data == '{}') throw 'No profile found'
            data.created_at = data?.created_at.split('T')[0]
            setUser(data)
        } catch (err) {
            alert(`layout: ${err}`)
        }
    }
    useEffect(() => {
        //we only want to put the user profile from server into context if it hasn't
        //already been put there in login/signup.
        if (user == null || !user) {
            getProfile()
        }
    }, [])
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
export default Layout
