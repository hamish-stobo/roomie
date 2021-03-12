import React, { useState } from 'react'
import '../../../styles/styles'
import ChevronRight from './ChevronRight'
import ChevronLeft from './ChevronLeft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faLikeBold } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons"

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
  const [selected, setSelected] = useState(0)
  const imgsArr = ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/flagged/photo-1573168710865-2e4c680d921a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1039&q=80"]
  const userLikes = ["id1", "id2", "id3", "currentUserId"];
  const currentUserHasLiked = userLikes.includes("currentUserId");
  const changeSelected = idx => {
    setSelected(idx)
  }

  const counter = difference => {
    const current = selected + difference
    setSelected(current)
  }

  return (
    <div className="ListingContainer">
      <div className="cardTop">
        <img className="profileImage" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
        <div className="nameDate">
          <span className="userName">John Smith</span>
          <span className="postedDate">Listed Today</span>
        </div>
      </div>
      <div className="imageCarousel">
        <img className="bedroomImage" src={imgsArr[selected]} />
        {selected !== 0 && <ChevronLeft counter={counter} />}
        {selected !== imgsArr.length - 1 && <ChevronRight counter={counter} />}
        {/* <div className="indexCount" >{`${selected + 1}/${imgsArr.length}`}</div> */}
      </div>
      <div className="underImage">
        <div className="Likes">
          <span>{userLikes.length}</span>
          {currentUserHasLiked
            ? <FontAwesomeIcon className="likeIcon" icon={faLikeBold} />
            : <FontAwesomeIcon className="likeIcon" icon={faThumbsUp} />
          }
        </div> 
        <div className="dots" style={{width: `${25*imgsArr.length}px`}}>
          {imgsArr.map((item, idx) => <div onClick={(() => changeSelected(idx))} className={`dot ${idx == selected ? 'selected' : ''}`} key={idx} > </div>)}
        </div>
        <FontAwesomeIcon className="message" icon={faComments} />
      </div>
    </div>
  )
}

export default Listing