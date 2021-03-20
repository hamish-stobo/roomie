import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import ProfileMenu from './ProfileMenu'

import '../../styles/styles'
import Listings from '../Listings'

const Profile = () => {
  const [left, setLeft] = useState(true)
  const [displayMenu, setDisplayMenu] = useState(false)
  const changeSelected = input => {
    setLeft(input)
  }
  const toggleProfileMenu = input => {
    console.log(`Clicked: ${input}`)
    setDisplayMenu(input)
  }
  return (
    <>
    <div className="profileWrapper">
      <div className="profileContainer">
      <FontAwesomeIcon onClick={() => toggleProfileMenu(!displayMenu)} className="faCog sm-element" icon={faCog} />
        <img className="profileImg" src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80" />
        <div className="profileDetailsColumn">
          <span className="username">John Smith</span>
          <span><strong>Email:</strong> john.smith@gmail.com</span>
          <span><strong>Ph:</strong> +64210395224</span>
          <span><strong>Member since:</strong> 05/02/2021</span>
        </div>
        <div className="lg-element profileButtonsContainer">
          <Link to="/editprofile" className="button editButton">
            <FontAwesomeIcon icon={faEdit} />
            <span> Edit</span>
          </Link>
          <Link to="/deleteprofile" className="button deleteButton">
            <FontAwesomeIcon icon={faTrashAlt} />
            <span> Delete</span>
          </Link>
        </div>
      </div>
    </div>
    {displayMenu && <ProfileMenu toggleProfileMenu={toggleProfileMenu} />}
    <div className="LikesListingsButtons">
      <div onClick={() => changeSelected(true)} className={left ? 'selected' : ''}>Likes</div>
      <div onClick={() => changeSelected(false)} className={!left ? 'selected' : ''}>Your Listings</div>
    </div>
      {left 
        ? <div>
          1) Get array of likes - map to object of listing IDs found in table where user ID equals currently logged in user.
          2) Get listings, filter by whether or not the likes object contains listing ID in current iteration of filter loop.
        </div>
        : <Listings />
      }
      </>
  )
}

export default Profile