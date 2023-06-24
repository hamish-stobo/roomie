import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import Listing from './Listing'
import DeleteListing from '../DeleteListing'

type ListingsProps = {
    user_id: string | number
}

const Listings = ({ user_id }: ListingsProps): JSX.Element => {
    const [listings, setListings] = useState<FullListing[]>([])
    const [responseReceived, setResponseReceived] = useState<Boolean>(false)
    const [listingToDelete, setListingToDelete] = useState<string>('')
    const getListings = async (): Promise<void> => {
        try {
            const { data } = await axios.get('/api/v1/listings/')
            setListings([...listings, ...data])
            setResponseReceived(true)
        } catch (err: any) {
            console.error({ err })
            setResponseReceived(true)
        }
    }

    useEffect(() => {
        getListings()
    }, [])

    return (
        <>
            {listingToDelete && (
                <DeleteListing
                    listing_id={listingToDelete}
                    hideDeleteListing={() => setListingToDelete('')}
                />
            )}
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
                                    deleteListing={(id) =>
                                        setListingToDelete(id)
                                    }
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
                                deleteListing={(id) => setListingToDelete(id)}
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
