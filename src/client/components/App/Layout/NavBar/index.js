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
                <div className="Logo lowercase">NavBar</div>
                <div className="Hamburger" onClick={() => toggleShow(!show)}>Hamburger</div>
                {show && 
                <div className="menu-container">
                    <button className="exitBtn" onClick={() => toggleShow(false)}>X</button>
                    <ul className="menu-ul">
                        <li className="menu-li">Profile</li>
                        <li className="menu-li">List a Room</li>
                        <li className="menu-li">Logout</li>
                    </ul>
                </div>}
            </div>
        </>
    )
}

export default NavBar