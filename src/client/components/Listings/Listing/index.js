import React from 'react'
import '../../../styles/styles'

const Listing = ({listing}) => {
  const {listings_user_id, rent, description, suburb, postcode, userLikes } = listing
  return (
    <div className="Listing">
      <h3>Seller's user ID: {listings_user_id}</h3>
      <ul>
        <li>Description: {description}</li>
        <li>Rent per week: ${rent}</li>
        <li>Suburb: {suburb}</li>
        <li>Postcode: {postcode}</li>
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
  )
}

export default Listing