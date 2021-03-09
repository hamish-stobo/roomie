import React, { useState, useEffect } from 'react'
const axios = require('axios')
import '../../styles/styles'
import Listing from './Listing'
import Loading from './Loading'


const Listings = () => {
    const [listings, setListings] = useState([])
    // This will need to be changed to /getListings when it's ready
    const getListings = async () => {
        const { data } = await axios.get('/api/v1/listings/')
            setListings(data) 
    }
    // on load || change in users.length getUser will make the axios call and return the users
    useEffect(() => {
        getListings()
    }, [listings.length])

 
    return (
        <>
            <div className="Listings">
                {!listings.length > 0 ? listings.map((listing, idx) => {
                    // let { listing_id } = listing
                    // let uniqueKey = listing_id + idx.toString()
                    return <Listing key={idx} listing={listing} />
                }) : <Loading />}
            </div>
        </>
    )
}

export default Listings