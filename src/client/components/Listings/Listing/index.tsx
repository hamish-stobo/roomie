import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faLikeBold } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../../../styles/styles'
import { useAuth } from '../../App/Auth'
import BathroomIcon from './BathroomIcon'
import BedroomIcon from './BedroomIcon'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'
import ListingMenu from './ListingMenu'

const Listing = ({
    uniqueKey,
    listing,
    deleteListing,
}: ListingProps): JSX.Element => {
    const auth = useAuth()
    const [selected, setSelected] = useState<number>(0)
    const [likes, setLikes] = useState<string[]>(listing.userLikes)
    const [imgsArr] = useState<string[]>(listing.listing_photos)
    const [elHeight, setElHeight] = useState<number>(0)
    const [displayMenu, setDisplayMenu] = useState<Boolean>(false)
    const [currUser, setCurrUser] = useState<string | number | undefined>(
        auth?.user?.user_id
    )
    const [listingAuthor, setListingAuthor] = useState<string>('')

    const elementRef = useRef<HTMLElement | null>(null)

    const getElHeight = (el: HTMLElement | null): void => {
        if (!!el) {
            const yPosition =
                window.pageYOffset + el.getBoundingClientRect().top
            setElHeight(yPosition)
        }
    }

    useEffect(() => {
        elementRef.current = document.querySelector(`#listingMenu${uniqueKey}`)
        getElHeight(elementRef.current)
    }, [])

    useEffect(() => {
        setCurrUser(auth?.user?.user_id)
    }, [auth?.user?.user_id])

    const redirectToAuthor = (user_id: string): void => {
        setListingAuthor(user_id)
    }

    const addLike = async (userID: string): Promise<void> => {
        try {
            const addLike = await axios.post('api/v1/likes', {
                likes_listing_id: listing.listing_id,
                likes_user_id: userID,
            })
            if (!addLike) throw Error('Add like failed in the server')
            setLikes([...likes, userID])
        } catch (e) {
            alert(e)
        }
    }

    const removeLike = async (userID: string): Promise<void> => {
        try {
            const deleteLike = await axios.delete(
                `api/v1/likes/${listing.listing_id}/${userID}`
            )
            if (!deleteLike) throw Error('Delete like failed in the server')
            setLikes(likes.filter((item) => item !== userID))
        } catch (e) {
            alert(e)
        }
    }

    const toggleLike = (userID: string | number | undefined): void => {
        if (!!userID) {
            likes.includes(userID as string)
                ? //this will eventually be set up to call a delete on the likes table.
                  removeLike(userID as string)
                : //this will eventually be set up to call a post on the likes table.
                  addLike(userID as string)
        }
    }

    const counter = (difference: number): void => {
        const current = selected + difference
        setSelected(current)
    }

    const toggleListingMenu = (input: Boolean): void => {
        setDisplayMenu(input)
    }
    return (
        <div className="ListingContainer" id={`listingMenu${uniqueKey}`}>
            {listingAuthor && <Redirect to={`/profile/${listingAuthor}`} />}
            <div
                className="cardTop"
                style={{
                    justifyContent:
                        currUser === listing.listings_user_id
                            ? 'center'
                            : 'flex-start',
                }}
            >
                <img
                    onClick={() => redirectToAuthor(listing.listings_user_id)}
                    className="profileImage"
                    src={listing.author.profile_picture as string}
                />
                <div
                    onClick={() => redirectToAuthor(listing.listings_user_id)}
                    className="nameDate"
                >
                    <span className="userName">
                        {listing.author.first_name} {listing.author.last_name}
                    </span>
                    <span className="postedDate">
                        Listed on {listing.created_at.split('T')[0]}
                    </span>
                </div>
                {currUser === listing.listings_user_id && (
                    <div
                        className="listingMenuDots"
                        onClick={() => toggleListingMenu(!displayMenu)}
                    >
                        <div className="dot"> </div>
                        <div className="dot"> </div>
                        <div className="dot"> </div>
                    </div>
                )}
                {displayMenu && currUser === listing.listings_user_id && (
                    <ListingMenu
                        elHeight={elHeight}
                        toggleListingMenu={toggleListingMenu}
                        listing_id={listing.listing_id}
                        deleteListing={(id: string) => deleteListing(id)}
                    />
                )}
            </div>
            <div className="imageCarousel">
                <img className="bedroomImage" src={imgsArr[selected]} />
                {selected !== 0 && <ChevronLeft counter={counter} />}
                {selected !== imgsArr.length - 1 && (
                    <ChevronRight counter={counter} />
                )}
                <span
                    className="indexCount"
                    style={{
                        right: `${
                            selected == imgsArr.length - 1 ? '29' : '0'
                        }px`,
                    }}
                >{`${selected + 1}/${imgsArr.length}`}</span>
            </div>
            <div className="socialContainer">
                <div className="Likes" onClick={() => toggleLike(currUser)}>
                    <span>{likes.length}</span>
                    {likes.includes(currUser as string) ? (
                        <FontAwesomeIcon
                            className="likeIcon Icon"
                            icon={faLikeBold}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="likeIcon Icon"
                            icon={faThumbsUp}
                        />
                    )}
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
