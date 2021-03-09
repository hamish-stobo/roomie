import React, { useState } from 'react'
import '../../../../styles/styles'

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
                ?
                <svg width="35" height="35" viewBox="0 0 43 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="3" y1="3" x2="40" y2="3" stroke="#DB00FF" stroke-opacity="0.74" stroke-width="6" stroke-linecap="round"/>
                    <line x1="3" y1="15" x2="40" y2="15" stroke="#DB00FF" stroke-opacity="0.74" stroke-width="6" stroke-linecap="round"/>
                    <line x1="3" y1="27" x2="40" y2="27" stroke="#DB00FF" stroke-opacity="0.74" stroke-width="6" stroke-linecap="round"/>
                </svg>
                : 
                <svg width="30" height="30" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="4.29718" y1="30.96" x2="30.4601" y2="4.79704" stroke="#DB00FF" stroke-opacity="0.74" stroke-width="6" stroke-linecap="round"/>
                    <line x1="4.53982" y1="4.79688" x2="30.7028" y2="30.9598" stroke="#DB00FF" stroke-opacity="0.74" stroke-width="6" stroke-linecap="round"/>
                </svg>
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