import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

const ProfileMenu = ({toggleProfileMenu}) => {
    return (
        <>
        <ul className="editProfileWrapper">
            <Link onClick={() => toggleProfileMenu(false)} to="/editProfile" className="linky">
                <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                <span className="menuSpan">Edit Profile</span>
            </Link>
            <Link onClick={() => toggleProfileMenu(false)} to="/deleteProfile" className="linky">
                <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                <span className="menuSpan">Delete Profile</span>
            </Link>
        </ul>
        </>
    )
}

export default ProfileMenu
