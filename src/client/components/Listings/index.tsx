import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import Listing from './Listing'

const Listings = ({ user_id }: User): JSX.Element => {
    const [listings, setListings] = useState<Listing[]>([])
    const [responseReceived, setResponseReceived] = useState<Boolean>(false)
    const getListings = async (): Promise<void> => {
        try {
            const { data } = await axios.get('/api/v1/listings/')
            setListings([...listings, ...data])
        } catch (err: any) {
            alert(err.response.data)
        } finally {
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
                                    idx={idx}
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
                                idx={idx}
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
