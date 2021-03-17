import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/styles'
import Listings from '../Listings'

const Profile = () => {
  const [left, setLeft] = useState(true)
  const changeSelected = input => {
    setLeft(input)
  }
  return (
    <>
    <div className="profileWrapper">
      <div className="profileContainer">
        <img className="profileImg" src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80" />
        <div className="profileDetailsColumn">
          <span className="username">John Smith</span>
          <span>john.smith@gmail.com</span>
          <span>+64210395224</span>
          <span>Member since 05/02/2021</span>
        </div>
        <Link to="/editprofile" className="button editButton">Edit Profile</Link>
      </div>
    </div>
      <div className="LikesListingsButtons">
        <div onClick={() => changeSelected(true)} className={left ? 'selected' : ''}>Likes</div>
        <div onClick={() => changeSelected(false)} className={!left ? 'selected' : ''}>Your Listings</div>
      </div>
      {left 
        ? <div>
          1) Get array of likes for the current user.
          2) Save as dictionary, where the keys are the listing IDs
          and the values are array indices
          3) Get the listings, filter by whether or not their PK exists
          as a key in the likes dictionary. (DICT = OBJECT)
        </div>
        : <Listings />
      }
      </>
  )
}

export default Profile