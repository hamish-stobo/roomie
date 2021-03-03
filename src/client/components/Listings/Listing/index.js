import React from 'react'
import '../../../styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Listing = ({listing}) => {
  const {listings_user_id, listings_id, rent, description, suburb, postcode, userLikes } = listing
  
  
  //this function needs the id of the listing which is being liked,
  //and the ID of the user who is currently logged in.
  const buttonClick = (listingId, userId) => {
    console.log(`listings_listing_id: ${listingId}\nlistings_user_id: ${userId}`)
    // axios.post('api/v1/likes', 
    // data: {
    //   listings_listing_id: listingId,
    //   listings_user_id: userId
    // })
  }

  return (
    <div className="Listing">
      <h3>Seller's user ID: {listings_user_id}</h3>
      <ul>
        <li>Description: {description}</li>
        <li>Rent per week: ${rent}</li>
        <li>Suburb: {suburb}</li>
        <li>Postcode: {postcode}</li>
        <li> There are {!!userLikes && userLikes.length > 0 ? userLikes.length : 0} users interested in this listing:
          <ul>{
              !!userLikes 
              ? userLikes.map(like => <li key={like}>User ID: {like}</li>) 
              : <span>No users have liked this listing yet.</span>
              }
          </ul>
        </li>
        <FontAwesomeIcon onClick={() => buttonClick(listings_id, listings_user_id)} icon={faCoffee} />
      </ul>
    </div>
  )
}

export default Listing