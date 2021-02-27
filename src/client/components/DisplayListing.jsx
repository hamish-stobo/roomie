import React from 'react'
import '../styles/styles'

const DisplayListing = props => {
  const {listings_user_id, rent, description, suburb, postcode, userLikes } = props.listing
  return (
    <>
      <div className="display-listings">
        <h3>Seller's user ID: {listings_user_id}</h3>
        <ul>
          <li>{description}</li>
          <li>{rent}</li>
          <li>{suburb}</li>
          <li>{postcode}</li>
          <li> The following users are interested in this listing:
            <ul>{
                !!userLikes 
                ? userLikes.map(like => <li key={like}>User ID: {like}</li>) 
                : <span>No users have liked this listing yet.</span>
                }
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DisplayListing