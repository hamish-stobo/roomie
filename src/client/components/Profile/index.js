import React from 'react'
import '../../styles/styles'
import Listings from '../Listings'

const Profile = () => {
  return (
    <>
    <div className="profileContainer">
      <img class="profileImg" src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80" />
      <div className="profileDetailsColumn">
        <span>John Smith</span>
        <span>john.smith@gmail.com</span>
        <span>+64210395224</span>
        <span>Member since 04/02/2021</span>
      </div>
      <div className="editButton">Edit Profile</div>
    </div>
    <div className="LikesListingsButtons">
      <div>Likes</div>
      <div>Listings</div>
    </div>
    {/* <Listings /> */}
    </>
  )
}

export default Profile