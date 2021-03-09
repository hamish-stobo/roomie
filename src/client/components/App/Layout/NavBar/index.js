import React, { useState } from 'react'
import '../../../../styles/styles'
import Hamburger from './Hamburger'
import X from './X'

const NavBar = () => {
    const [show, setShow] = useState(false);
    const toggleShow = input => {
        setShow(input)
    }


    return (
        <>
            <div className="NavBar">
                <div className="Logo lowercase">rOOmie</div>
                <div className="Hamburger sm" onClick={() => toggleShow(!show)}>
                {!show
                    ? <Hamburger />
                    : <X />
                }
                </div>
                {show && 
                <div className="menu-container sm">
                    <ul className="menu-ul sm">
                        <li className="menu-li sm">Profile</li>
                        <li className="menu-li sm">List a Room</li>
                        <li className="menu-li sm">Logout</li>
                    </ul>
                </div>}
                <div className="menu-container lg">
                    <ul className="menu-ul lg">
                        <li className="menu-li lg">Profile</li>
                        <li className="menu-li lg">List a Room</li>
                        <li className="menu-li lg">Logout</li>
                    </ul>
                </div>
            </div>
        </>
    )
}



export default NavBar