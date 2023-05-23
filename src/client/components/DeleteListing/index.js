import React, { useState } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import axios from 'axios'

import '../../styles/styles'

const DeleteListing = () => {
    const [redirect, setRedirect] = useState(false) 
    const { goBack } = useHistory()
    const { listing_id } = useParams()

    const DeleteListing = async input => {
        try {
        const deleteResponse = await axios.delete(`/api/v1/listings/${input}`)
        if(!deleteResponse || !deleteResponse.data) throw 'Failed to delete listing'
        const { data } = deleteResponse
        alert(JSON.stringify(data))
        setRedirect(true)
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div className="deleteProfileWrapper">
            <p>Are you sure you want to delete this listing?</p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => goBack()}>Back</button>
                <button className="button delBtn" onClick={() => DeleteListing(listing_id)}>Delete</button>
            </div>
            {redirect && <Redirect to="/listings" />}
        </div>
    )
}

export default DeleteListing
