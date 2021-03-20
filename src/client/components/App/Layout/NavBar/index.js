import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
                <Link to="/listings" className="Logo lowercase" onClick={() => toggleShow(false)}>rOOmie</Link>
                <div className="Hamburger sm" onClick={() => toggleShow(!show)}>
                {!show
                    ? <Hamburger />
                    : <X />
                }
                </div>
                {show && 
                <div className="menu-container sm">
                    <ul className="menu-ul sm">
                        <li onClick={() => toggleShow(false)} className="menu-li sm"><Link to="/profile" style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}}>Profile</Link></li>
                        <li onClick={() => toggleShow(false)} className="menu-li sm"><Link to="/addlisting" style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}}>List a Room</Link></li>
                        <li onClick={() => toggleShow(false)} className="menu-li sm"><Link to="/logout" style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}}>Logout</Link></li>
                    </ul>
                </div>}
                <div className="menu-container lg">
                    <ul className="menu-ul lg">
                        <li className="menu-li lg"><Link to="/profile" style={{textDecoration: 'none', color: '#DB00FF'}}>Profile</Link></li>
                        <li className="menu-li lg"><Link to="/addlisting" style={{textDecoration: 'none', color: '#DB00FF'}}>List a Room</Link></li>
                        <li className="menu-li lg"><Link to="/logout" style={{textDecoration: 'none', color: '#DB00FF'}}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}



export default NavBar