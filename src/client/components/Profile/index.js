import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCog, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import ProfileMenu from './ProfileMenu'
import { useAuth } from '../App/Auth'

import '../../styles/styles'
import Listings from '../Listings'
import LikedListings from '../LikedListings'

const Profile = () => {
  const [profile, setProfile] = useState({})
  const [left, setLeft] = useState(true)
  const [displayMenu, setDisplayMenu] = useState(false)
  const { user_id } = useParams()
  const { user } = useAuth()

  const toggleProfileMenu = input => {
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

  const populateProfilePage = () => {
    if(user_id === user?.user_id) {
      setProfile(user)
    } else {
      getProfile(!!user?.user_id ? user?.user_id : user_id)
    }
  }

  useEffect(() => {
    //if user is viewing own profile, load profile from context, else get profile from server
    populateProfilePage()
  }, [])
  return (
    <>
    {user_id !== profile.user_id && populateProfilePage()}
    <div className="profileWrapper">
      <div className="profileContainer">
      {user_id === profile?.user_id && <FontAwesomeIcon onClick={() => toggleProfileMenu(!displayMenu)} className="faCog sm-element" icon={faCog} />}
        {!!profile.profile_picture 
          ? <img className="profileImg" src={profile.profile_picture} />
          : <FontAwesomeIcon className="profileImg iconImg" icon={faCamera} />
        }
        <div className="profileDetailsColumn">
          <span className="username">{profile.first_name} {profile.last_name}</span>
          <span><strong>Email:</strong> {profile.email}</span>
          <span><strong>Location:</strong> {profile.user_location}</span>
          <span><strong>Member since:</strong> {profile.created_at}</span>
        </div>
        {user_id === profile?.user_id && <div className="lg-element profileButtonsContainer">
          <Link to="/editprofile" className="button editButton">
            <FontAwesomeIcon icon={faEdit} />
            <span> Update</span>
          </Link>
          <Link to="/deleteprofile" className="button deleteButton">
            <FontAwesomeIcon icon={faTrashAlt} />
            <span> Delete</span>
          </Link>
        </div>}
      </div>
    </div>
    {displayMenu && user_id === user?.user_id && <ProfileMenu toggleProfileMenu={toggleProfileMenu} />}
    <div className="LikesListingsButtons">
      <div onClick={() => setLeft(true)} className={left ? 'selected' : ''}>Your Listings</div>
      <div onClick={() => setLeft(false)} className={!left ? 'selected' : ''}>Likes</div>
    </div>
      {left 
        ? <Listings user_id={user_id} />
        : <LikedListings user_id={user_id} />
      }
      </>
  )
}

export default Profile