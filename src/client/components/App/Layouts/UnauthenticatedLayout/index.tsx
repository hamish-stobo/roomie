import '../../../../styles/styles'

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Footer from '../../../Footer'

interface LayoutProps {
    children: React.ReactNode
}
//used on login and register page
const UnauthenticatedLayout = ({ children }: LayoutProps): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null)
    useEffect(() => {
        //check if auth cookie exists and if so, redirect to /listingsv
        const accessTokenExists = !!Cookies.get('accessToken')
        setIsAuthenticated(accessTokenExists)
    }, [])
    return (
        <div className="flex flex-col items-center justify-center xl:items-start h-screen w-screen pb-12 bg-white sm:bg-gradient-to-r sm:from-purpScurp sm:to-d33pPurple sm:animate-gradient-x">
            {isAuthenticated && <Redirect to="/listings" />}
            {children}
            <Footer />
        </div>
    )
}
export default UnauthenticatedLayout
