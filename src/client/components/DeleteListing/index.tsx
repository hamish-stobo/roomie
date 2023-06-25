import axios from 'axios'
import { useAuth } from '../App/Auth'

import '../../styles/styles'

const DeleteListing = (props: DeleteListingProps): JSX.Element => {
    const { listing_id, hideDeleteListing, refreshListings } = props
    const { setPopup } = useAuth()

    const DeleteListing = async (listing_id: string) => {
        try {
            const deleteResponse = await axios.delete(
                `/api/v1/listings/${listing_id}`
            )
            if (!deleteResponse || !deleteResponse?.data)
                throw 'Failed to delete listing'
            setPopup({
                type: 'success',
                message: 'Listing was successfully deleted',
            })
            refreshListings()
            hideDeleteListing()
        } catch (e) {
            console.error(e)
            setPopup({ type: 'error', message: 'An unexpected error occurred' })
        }
    }
    return (
        <div className="deleteProfileWrapper">
            <p>Are you sure you want to delete this listing?</p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => hideDeleteListing()}>
                    Close
                </button>
                <button
                    className="button delBtn"
                    onClick={() => DeleteListing(listing_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteListing
