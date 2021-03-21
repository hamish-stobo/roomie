import React, { useState, useEffect, useRef } from 'react'
import '../../../styles/styles'
import ChevronRight from './ChevronRight'
import ChevronLeft from './ChevronLeft'
import BathroomIcon from './BathroomIcon'
import BedroomIcon from './BedroomIcon'
import ListingMenu from './ListingMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faLikeBold } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons"

const Listing = ({uniqueKey}) => {
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
  const [likes, setLikes] = useState(["id1", "id2", "id3"])
  const imgsArr = ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/flagged/photo-1573168710865-2e4c680d921a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1039&q=80"]
  const [elHeight, setElHeight] = useState('')
  const [displayMenu, setDisplayMenu] = useState(false)
  
  const toggleLike = userID => {
    likes.includes(userID)
    //this will eventually be set up to call a delete on the likes table.
      ? setLikes(likes.filter(item => item !== userID))
    //this will eventually be set up to call a post on the likes table.
      : setLikes([...likes, userID])
  }
  const changeSelected = idx => {
    setSelected(idx)
  }

  const counter = difference => {
    const current = selected + difference
    setSelected(current)
  }

  const toggleListingMenu = input => {
    setDisplayMenu(input)
  }

  const element = useRef('null')
  const getElHeight = (element) => {
    const yPosition = window.pageYOffset + element.getBoundingClientRect().top
    setElHeight(yPosition)
  }
  
  useEffect(() => {
    element.current = document.querySelector(`#listingMenu${uniqueKey}`)
    // window.addEventListener('scroll', () => setTimeout(() => getElHeight(element.current), 200))
    getElHeight(element.current)
  })
  return (
    <div className="ListingContainer" id={`listingMenu${uniqueKey}`}>
      <div className="cardTop">
        <img className="profileImage" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
        <div className="nameDate">
          <span className="userName">John Smith</span>
          <span className="postedDate">Listed Today</span>
        </div>
        <div className="listingMenuDots" onClick={() => toggleListingMenu(!displayMenu)} >
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
        </div>
        {displayMenu && <ListingMenu elHeight={elHeight} toggleListingMenu={toggleListingMenu}/>}
      </div>
      <div className="imageCarousel">
        <img className="bedroomImage" src={imgsArr[selected]} />
        {selected !== 0 && <ChevronLeft counter={counter} />}
        {selected !== imgsArr.length - 1 && <ChevronRight counter={counter} />}
        <span className="indexCount" style={{right: `${selected == imgsArr.length - 1 ? '29' : '0'}px`}}>{`${selected + 1}/${imgsArr.length}`}</span>
      </div>
      <div className="socialContainer">
        <div className="Likes" onClick={() => toggleLike('myID')}>
            <span>{likes.length}</span>
            {likes.includes('myID')
              ? <FontAwesomeIcon className="likeIcon Icon" icon={faLikeBold} />
              : <FontAwesomeIcon className="likeIcon Icon" icon={faThumbsUp} />
            }
        </div> 
        <div className="tagline">Come and join our lovely home!</div>
        {/* <FontAwesomeIcon className="message Icon" icon={faComments} title="Contact Seller" /> */}
      </div>
        {/* <div className="dots" style={{width: `${25*imgsArr.length}px`}}>
          {imgsArr.map((item, idx) => <div onClick={(() => changeSelected(idx))} className={`dot ${idx == selected ? 'selected' : ''}`} key={idx} > </div>)}
        </div> */}
      <div className="detailsContainer">
          <div className="location-rent-col">
            <span className="location">Remuera, Auckland</span>
            <span className="rent">$225 per week</span>
          </div>
          <div className="iconContainer roomsContainer">
            <span>4</span>
            <BedroomIcon />
          </div>
          <div className="iconContainer bathroomsContainer">
            <span>2</span>
            <BathroomIcon />
          </div>
      </div>
    </div>
  )
}

export default Listing