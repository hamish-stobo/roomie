import React from 'react'
import '../../../styles/styles'

const DisplayListing = props => {
  const {user_id, rent, description, suburb, postcode, userLikes } = props.listing
  return (
    <>
      <div className="display-listings">
        <h3>THIS IS THE LISTING FROM {user_id}</h3>
        <ul>
          <li>{description}</li>
          <li>{rent}</li>
          <li>{suburb}</li>
          <li>{postcode}</li>
          <ul>{
              !!userLikes 
              ? userLikes.map(like => {
                    let { user_id } = like
                    return <li>{user_id}</li>
                }) 
              : <span>No users have liked this listing yet.</span>
              }
          </ul>
        </ul>
      </div>
    </>
  )
}

export default DisplayListing