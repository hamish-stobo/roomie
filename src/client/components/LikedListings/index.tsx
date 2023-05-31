import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import Listing from '../Listings/Listing'

const LikedListings = ({ user_id }) => {
    const [listings, setListings] = useState([])
    const [responseReceived, setResponseReceived] = useState(false)
    const getLikedListings = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/listings/likes/${user_id}`
            )
            setListings([...listings, ...data])
        } catch (e) {
            alert(e)
        } finally {
            setResponseReceived(true)
        }
    }
    useEffect(() => {
        getLikedListings()
    }, [])
    return (
        <div className="Listings">
            {!!user_id && listings.length > 0 ? (
                listings.map((listing, idx) => {
                    const { listing_id } = listing
                    const uniqueKey = listing_id + idx.toString
                    return (
                        <Listing
                            idx={idx}
                            key={uniqueKey}
                            uniqueKey={idx}
                            listing={listing}
                        />
                    )
                })
            ) : listings.length == 0 && responseReceived === false ? (
                <div>Loading...</div>
            ) : (
                responseReceived === true && <div>No listings liked yet</div>
            )}
        </div>
    )
}

export default LikedListings
