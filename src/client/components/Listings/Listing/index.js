import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
const axios = require('axios')
import '../../../styles/styles'
import ChevronRight from './ChevronRight'
import ChevronLeft from './ChevronLeft'
import BathroomIcon from './BathroomIcon'
import BedroomIcon from './BedroomIcon'
import ListingMenu from './ListingMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faLikeBold } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons"

const Listing = ({idx, uniqueKey, listing}) => {
    
  const [selected, setSelected] = useState(0)
  const [likes, setLikes] = useState(listing.userLikes)
  const [imgsArr, setImgsArr] = useState(listing.listing_photos)
  const [elHeight, setElHeight] = useState('')
  const [displayMenu, setDisplayMenu] = useState(false)
  const [currUser, setCurrUser] = useState('fb534fb6-e285-4e83-a50f-ab32abed0bc6')
  const element = useRef('null')
  const [listingAuthor, setListingAuthor] = useState('')

  const redirectToAuthor = user_id => {
    setListingAuthor(user_id)
  }

  const addLike = async userID => {
    try {
      const addLike = await axios.post('api/v1/likes', 
        {
          likes_listing_id: listing.listing_id,
          likes_user_id: userID
      })
      if(!addLike || addLike == '{}') throw Error('Add like failed in the server')
      setLikes([...likes, userID])
    } catch (e) {
        alert(e)
    }
  }

  const removeLike = async userID => {
    try {
      const deleteLike = await axios.delete(`api/v1/likes/${listing.listing_id}/${userID}`)
      if(!deleteLike || deleteLike == 0) throw Error('Delete like failed in the server')
      setLikes(likes.filter(item => item !== userID))
    } catch (e) {
        alert(e)
    }
  }
  
  const toggleLike = userID => {
    likes.includes(userID)
    //this will eventually be set up to call a delete on the likes table.
      ? removeLike(userID)
    //this will eventually be set up to call a post on the likes table.
      : addLike(userID)
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

  const getElHeight = (element) => {
    const yPosition = window.pageYOffset + element.getBoundingClientRect().top
    setElHeight(yPosition)
  }
  
  useEffect(() => {
    element.current = document.querySelector(`#listingMenu${uniqueKey}`)
    getElHeight(element.current)
  }, [])
  return (
    <div className="ListingContainer" id={`listingMenu${uniqueKey}`}>
      {listingAuthor && <Redirect to={`profile/${listingAuthor}`} />}
      <div className="cardTop">
        <img onClick={() => redirectToAuthor(listing.listings_user_id)} className="profileImage" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
        <div onClick={() => redirectToAuthor(listing.listings_user_id)} className="nameDate">
          <span className="userName">John Smith</span>
          <span className="postedDate">Listed Today</span>
        </div>
        <div className="listingMenuDots" onClick={() => toggleListingMenu(!displayMenu)} >
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
        </div>
        {displayMenu && <ListingMenu elHeight={elHeight} toggleListingMenu={toggleListingMenu} listing_id={listing.listing_id}/>}
      </div>
      <div className="imageCarousel">
        <img className="bedroomImage" src={imgsArr[selected]} />
        {selected !== 0 && <ChevronLeft counter={counter} />}
        {selected !== imgsArr.length - 1 && <ChevronRight counter={counter} />}
        <span className="indexCount" style={{right: `${selected == imgsArr.length - 1 ? '29' : '0'}px`}}>{`${selected + 1}/${imgsArr.length}`}</span>
      </div>
      <div className="socialContainer">
        <div className="Likes" onClick={() => toggleLike(currUser)}>
            <span>{likes.length}</span>
            {likes.includes(currUser)
              ? <FontAwesomeIcon className="likeIcon Icon" icon={faLikeBold} />
              : <FontAwesomeIcon className="likeIcon Icon" icon={faThumbsUp} />
            }
        </div> 
        <div className="tagline">{listing.tagline}</div>
        {/* <FontAwesomeIcon className="message Icon" icon={faComments} title="Contact Seller" /> */}
      </div>
        {/* <div className="dots" style={{width: `${25*imgsArr.length}px`}}>
          {imgsArr.map((item, idx) => <div onClick={(() => changeSelected(idx))} className={`dot ${idx == selected ? 'selected' : ''}`} key={idx} > </div>)}
        </div> */}
      <div className="detailsContainer">
          <div className="location-rent-col">
            <span className="location">{listing.listing_location}</span>
            <span className="rent">${listing.rent} per week</span>
          </div>
          <div className="iconContainer roomsContainer">
            <span>3</span>
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