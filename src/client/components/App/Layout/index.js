import React, { useState } from 'react'
import NavBar from './NavBar'
import Footer from '../../Footer'
import { useAuth } from '../Auth'

const Layout = ({children}) => 
{
    return (
        <>
            <NavBar />
                {children}
            <Footer />
        </>
    )
}
export default Layout
