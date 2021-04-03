import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../../../styles/styles'
import { useAuth } from '../../Auth'
import Hamburger from './Hamburger'
import X from './X'

const NavBar = () => {
    const auth = useAuth()
    const [show, setShow] = useState(false)
    const image = auth?.user?.profile_picture
    const userID = auth?.user?.user_id
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
                    <ul className="menu-ul-sm sm">
                        <Link style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}} onClick={() => toggleShow(false)} className="menu-li sm navProfileLnk" to={`/profile/${userID}`} >
                            <img className="navbar-profileImage" src={image} /> 
                            Profile
                        </Link>
                        <Link style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}} onClick={() => toggleShow(false)} className="menu-li sm" to="/addlisting">List a Room</Link>
                        <Link style={{textDecoration: 'none', color: 'rgb(63, 63, 63)'}} onClick={() => toggleShow(false)} className="menu-li sm" to="/logout">Logout</Link>
                    </ul>
                </div>}
                <div className="menu-container lg">
                    <ul className="menu-ul lg">
                        <Link className="menu-li lg navProfileLnk" to={`/profile/${userID}`} style={{textDecoration: 'none', color: '#DB00FF'}}>
                            <img className="navbar-profileImage" src={image} />
                            Profile
                        </Link>
                        <Link className="menu-li lg" to="/addlisting" style={{textDecoration: 'none', color: '#DB00FF'}}>List a Room</Link>
                        <Link className="menu-li lg" to="/logout" style={{textDecoration: 'none', color: '#DB00FF'}}>Logout</Link>
                    </ul>
                </div>
            </div>
        </>
    )
}



export default NavBar