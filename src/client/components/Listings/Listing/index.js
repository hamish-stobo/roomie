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
import { useAuth } from '../../App/Auth'

const Listing = ({idx, uniqueKey, listing}) => {
    
  const [selected, setSelected] = useState(0)
  const [likes, setLikes] = useState(listing.userLikes)
  const [imgsArr, setImgsArr] = useState(listing.listing_photos)
  const [elHeight, setElHeight] = useState('')
  const [displayMenu, setDisplayMenu] = useState(false)
  const [currUser, setCurrUser] = useState(useAuth()?.user?.user_id)
  const element = useRef('null')
  const [listingAuthor, setListingAuthor] = useState('')
  const [createdAt, setCreatedAt] = useState(listing.created_at)

  const redirectToAuthor = user_id => {
    setListingAuthor(user_id)
  }

  const addLike = async userID => {
    try {
      console.log(userID)
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
    setCreatedAt(createdAt.split('T')[0])
  }
  
  useEffect(() => {
    element.current = document.querySelector(`#listingMenu${uniqueKey}`)
    getElHeight(element.current)
  }, [])
  return (
    <div className="ListingContainer" id={`listingMenu${uniqueKey}`}>
      {listingAuthor && <Redirect to={`/profile/${listingAuthor}`} />}
      <div className="cardTop" style={{justifyContent: currUser === listing.listings_user_id ? 'center' : 'flex-start'}}>
        <img onClick={() => redirectToAuthor(listing.listings_user_id)} className="profileImage" src={listing.author.profile_picture}/>
        <div onClick={() => redirectToAuthor(listing.listings_user_id)} className="nameDate">
          <span className="userName">{listing.author.first_name} {listing.author.last_name}</span>
          <span className="postedDate">Listed on {createdAt}</span>
        </div>
        {currUser === listing.listings_user_id && <div className="listingMenuDots" onClick={() => toggleListingMenu(!displayMenu)} >
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
            <div className="dot">{' '}</div>
        </div>}
        {displayMenu && currUser === listing.listings_user_id && <ListingMenu elHeight={elHeight} toggleListingMenu={toggleListingMenu} listing_id={listing.listing_id}/>}
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
      </div>
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