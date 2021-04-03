import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

const ProfileMenu = ({toggleProfileMenu}) => {
    return (
        <>
        <ul className="editProfileWrapper sm-element">
            <Link onClick={() => toggleProfileMenu(false)} to="/editprofile" className="linky">
                <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                <span className="menuSpan">Update Profile</span>
            </Link>
            <Link onClick={() => toggleProfileMenu(false)} to="/deleteprofile" className="linky">
                <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                <span className="menuSpan">Delete Account</span>
            </Link>
        </ul>
        </>
    )
}

export default ProfileMenu
