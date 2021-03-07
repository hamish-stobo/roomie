import React from 'react'
import NavBar from './NavBar'

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
