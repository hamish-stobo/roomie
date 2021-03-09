import React from 'react'
import '../../../styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Listing = ({listing}) => {
  // const {listings_user_id, listings_id, rent, description, suburb, postcode, userLikes } = listing
  
  
  //this function needs the id of the listing which is being liked,
  //and the ID of the user who is currently logged in.
  // const buttonClick = (listingId, userId) => {
  //   console.log(`listings_listing_id: ${listingId}\nlistings_user_id: ${userId}`)
  //   // axios.post('api/v1/likes', 
  //   // data: {
  //   //   listings_listing_id: listingId,
  //   //   listings_user_id: userId
  //   // })
  // }

  return (
    <div className="ListingContainer">
      <div className="cardTop">
        <img className="profileImage" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80" />
        <div className="nameDate">
          <span className="userName">John Smith</span>
          <span className="postedDate">Listed Today</span>
        </div>
      </div>
      <div className="image-carousel">
        
      </div>
      {/* <h3>Seller's user ID: {listings_user_id}</h3>
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
      </ul> */}
    </div>
  )
}

export default Listing