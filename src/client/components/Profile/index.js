import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCog, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import ProfileMenu from './ProfileMenu'

import '../../styles/styles'
import Listings from '../Listings'

const Profile = () => {
  const [profile, setProfile] = useState({})
  const profileImg = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
  const [left, setLeft] = useState(true)
  const [displayMenu, setDisplayMenu] = useState(false)
  const changeSelected = input => {
    setLeft(input)
  }
  const toggleProfileMenu = input => {
    console.log(`Clicked: ${input}`)
    setDisplayMenu(input)
  }

  const getProfile = async userID => {
    try {
      if(userID === 'logged in user') {
        //setProfile(authedUser)
      }  else {
        const profileRes = await axios.get(`/api/v1/users/${userID}`)
        const { data } = profileRes
        if(!data || data == '{}') throw 'No profile found'
        data.created_at = data.created_at.split('T')[0]
        setProfile(data)
      }
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getProfile('fb534fb6-e285-4e83-a50f-ab32abed0bc6')
  }, [])
  return (
    <>
    <div className="profileWrapper">
      <div className="profileContainer">
      <FontAwesomeIcon onClick={() => toggleProfileMenu(!displayMenu)} className="faCog sm-element" icon={faCog} />
        {!!profileImg 
          ? <img className="profileImg" src={profile.profile_picture} />
          : <FontAwesomeIcon className="profileImg iconImg" icon={faCamera} />
        }
        <div className="profileDetailsColumn">
          <span className="username">{profile.first_name} {profile.last_name}</span>
          <span><strong>Email:</strong> {profile.email}</span>
          <span><strong>Location:</strong> {profile.user_location}</span>
          <span><strong>Member since:</strong> {profile.created_at}</span>
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
        ? <div style={{background: "rgba(255,255,255,0.59)"}}>
          1) Get array of likes - map to object of listing IDs found in table where user ID equals currently logged in user.
          2) Get listings, filter by whether or not the likes object contains listing ID in current iteration of filter loop.
        </div>
        : <Listings />
      }
      </>
  )
}

export default Profile