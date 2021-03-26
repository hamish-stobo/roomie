import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/styles'
import Listing from './Listing'


const Listings = () => {
    const [listings, setListings] = useState([])
    // This will need to be changed to /getListings when it's ready
    const getListings = async () => {
        const { data } = await axios.get('/api/v1/listings/')
        setListings([...listings, ...data])
    }
    useEffect( () => {
        getListings()
    }, [])

 
    return (
        <>
            <div className="Listings">
                {/* <Listing uniqueKey={0} />
                <Listing uniqueKey={1} /> */}
                {listings.length > 0 ? listings.map((listing, idx) => {
                    const { listing_id } = listing
                    const uniqueKey = listing_id + idx.toString
                    return <Listing idx={idx} key={uniqueKey} uniqueKey={idx} listing={listing} />
                }) : <div>There are currently no listings to display</div>}
            </div>
        </>
    )
}

export default Listings