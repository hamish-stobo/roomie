import React from 'react'
import '../../../styles/styles'

const DisplayListing = props => {
  const {user_id, rent, description, suburb, postcode, userLikes } = props.listing
  return (
    <>
      <div class="display-listings">
        <h3>THIS IS THE LISTING FROM {user_id}</h3>
        <ul>
          <li>{rent}</li>
          <li>{description}</li>
          <li>{suburb}</li>
          <li>{postcode}</li>
          <ul>{userLikes.length > 0 ? userLikes.map(like => {
                  const { user_id } = like
                  return <li>{user_id}</li>
              }) : <span>No users have liked this listing yet.</span>
              }
          </ul>
          <li>{user.email}</li>
        </ul>
      </div>
    </>
  )
}

export default DisplayListing