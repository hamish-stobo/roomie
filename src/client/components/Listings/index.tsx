import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import Listing from './Listing'

type ListingsProps = {
    user_id: string | number
}

const Listings = ({ user_id }: ListingsProps): JSX.Element => {
    const [listings, setListings] = useState<FullListing[]>([])
    const [responseReceived, setResponseReceived] = useState<Boolean>(false)
    const getListings = async (): Promise<void> => {
        try {
            const { data } = await axios.get('/api/v1/listings/')
            setListings([...listings, ...data])
            setResponseReceived(true)
        } catch (err: any) {
            console.error(err.response.data)
            setResponseReceived(true)
        }
    }
    useEffect(() => {
        getListings()
    }, [])
    return (
        <>
            <div className="Listings">
                {!!user_id && listings.length > 0 ? (
                    listings
                        .filter(
                            (listing) => listing.listings_user_id === user_id
                        )
                        .map((listing, idx) => {
                            const { listing_id } = listing
                            const uniqueKey = listing_id + idx.toString()
                            return (
                                <Listing
                                    key={uniqueKey}
                                    uniqueKey={idx}
                                    listing={listing}
                                />
                            )
                        })
                ) : !user_id && listings.length > 0 ? (
                    listings.map((listing, idx) => {
                        const { listing_id } = listing
                        const uniqueKey = listing_id + idx.toString()
                        return (
                            <Listing
                                key={uniqueKey}
                                uniqueKey={idx}
                                listing={listing}
                            />
                        )
                    })
                ) : responseReceived === false ? (
                    <div>Loading...</div>
                ) : (
                    listings.length === 0 && <div>No Listings Found</div>
                )}
            </div>
        </>
    )
}

export default Listings
