import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/styles'
import Listing from './Listing'


const Listings = ({user_id}) => {
    const [listings, setListings] = useState([])
    // This will need to be changed to /getListings when it's ready
    const getListings = async () => {
        try {
            const { data } = await axios.get('/api/v1/listings/')
            setListings([...listings, ...data])
        } catch (e) {
            alert(e)
        }
    }
    useEffect( () => {
        getListings()
    }, [])

    return (
        <>
            <div className="Listings">
                {!!user_id && listings.length > 0
                    ? listings
                        .filter(listing => listing.listings_user_id == user_id)
                        .map((listing, idx) => {
                        const { listing_id } = listing
                        const uniqueKey = listing_id + idx.toString
                        return <Listing idx={idx} key={uniqueKey} uniqueKey={idx} listing={listing} />
                    })
                : !user_id && listings.length > 0 
                    ? listings.map((listing, idx) => {
                        const { listing_id } = listing
                        const uniqueKey = listing_id + idx.toString
                        return <Listing idx={idx} key={uniqueKey} uniqueKey={idx} listing={listing} />
                    }) 
                : <div>Loading...</div>}
            </div>
        </>
    )
}

export default Listings