import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import Listing from '../Listings/Listing'
import DeleteListing from '../DeleteListing'

const LikedListings = ({
    user_id,
}: LikedListingsComponentProps): JSX.Element => {
    const [listings, setListings] = useState<FullListing[]>([])
    const [responseReceived, setResponseReceived] = useState(false)
    const [listingToDelete, setListingToDelete] = useState<string>('')
    const [initialPageLoad, setInitialPageLoad] = useState(true)
    const getLikedListings = async () => {
        try {
            const { data }: AxiosResponse = await axios.get(
                `/api/v1/listings/likes/${user_id}`
            )
            setListings([...data])
        } catch (e: any) {
            console.error(e)
        } finally {
            setResponseReceived(true)
            setInitialPageLoad(false)
        }
    }
    useEffect(() => {
        if (initialPageLoad) {
            getLikedListings()
        }
    }, [])
    return (
        <>
            {listingToDelete && (
                <DeleteListing
                    listing_id={listingToDelete}
                    hideDeleteListing={() => setListingToDelete('')}
                    refreshListings={() => getLikedListings()}
                />
            )}
            <div className="Listings">
                {!!user_id && listings.length > 0 ? (
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
                ) : listings.length == 0 && responseReceived === false ? (
                    <div>Loading...</div>
                ) : (
                    responseReceived === true && (
                        <div>No listings liked yet</div>
                    )
                )}
            </div>
        </>
    )
}

export default LikedListings
