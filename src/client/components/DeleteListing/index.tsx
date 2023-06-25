import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../../styles/styles'

const DeleteListing = (props: DeleteListingProps): JSX.Element => {
    const { listing_id, hideDeleteListing } = props
    const [redirect, setRedirect] = useState(false)
    // const { listing_id } = useParams<ListingParams>()

    const DeleteListing = async (listing_id: string) => {
        try {
            const deleteResponse = await axios.delete(
                `/api/v1/listings/${listing_id}`
            )
            if (!deleteResponse || !deleteResponse.data)
                throw 'Failed to delete listing'
            const { data } = deleteResponse
            alert(`${JSON.stringify(data)} Listing was deleted`)
            setRedirect(true)
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div className="deleteProfileWrapper">
            <p>Are you sure you want to delete this listing?</p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => hideDeleteListing()}>
                    Back
                </button>
                <button
                    className="button delBtn"
                    onClick={() => DeleteListing(listing_id)}
                >
                    Delete
                </button>
            </div>
            {redirect && <Redirect to="/listings" />}
        </div>
    )
}

export default DeleteListing
