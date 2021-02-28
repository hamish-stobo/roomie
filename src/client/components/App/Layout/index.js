import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <div>
            <NavBar className="grid-container"/>
                {children}
            <Footer />
        </div>
    )
}

export default Layout
