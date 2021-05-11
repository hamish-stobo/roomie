import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import '../../styles/styles'
import axios from 'axios'

const DeleteProfile = () => {
    const [redirect, setRedirect] = useState(false) 
    const { goBack } = useHistory()

    const deleteProfile = async input => {
        try {
            const deleteProfile = await axios.delete('/api/v1/users/')
            setRedirect(input)
        } catch (err) {
            alert(err)
        }
    }
    return (
        <div className="deleteProfileWrapper">
            <p>Are you sure you want to delete your account? You will lose all your data and be signed out.</p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => goBack()}>Back</button>
                <button className="button delBtn" onClick={() => deleteProfile(true)}>Delete</button>
            </div>
            {redirect && <Redirect to="/logout" />}
        </div>
    )
}

export default DeleteProfile
