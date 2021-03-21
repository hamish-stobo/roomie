import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import '../../styles/styles'

const DeleteProfile = () => {
    const [redirect, setRedirect] = useState(false) 
    const { goBack } = useHistory()

    const deleteProfile = input => {
        alert('deleted!')
        setRedirect(input)
    }
    return (
        <div className="deleteProfileWrapper">
            <p>Are you sure you want to delete your account? You will lose all data and be signed out.</p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => goBack()}>Back</button>
                <button className="button delBtn" onClick={() => deleteProfile(true)}>Delete</button>
            </div>
            {redirect && <Redirect push to="/" />}
        </div>
    )
}

export default DeleteProfile
