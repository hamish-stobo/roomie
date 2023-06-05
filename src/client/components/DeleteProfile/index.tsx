import axios from 'axios'
import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import '../../styles/styles'

const DeleteProfile = (): JSX.Element => {
    const [redirect, setRedirect] = useState<Boolean>(false)
    const { goBack } = useHistory()

    const deleteProfile = async (input: Boolean): Promise<void> => {
        try {
            await axios.delete('/api/v1/users/')
            setRedirect(input)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="deleteProfileWrapper">
            <p>
                Are you sure you want to delete your account? You will lose all
                your data and be signed out.
            </p>
            <div className="buttonsWrapper">
                <button className="button" onClick={() => goBack()}>
                    Back
                </button>
                <button
                    className="button delBtn"
                    onClick={() => deleteProfile(true)}
                >
                    Delete
                </button>
            </div>
            {redirect && <Redirect to="/logout" />}
        </div>
    )
}

export default DeleteProfile
