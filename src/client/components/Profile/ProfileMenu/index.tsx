import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../../styles/styles'

type ProfileMenuProps = {
    toggleProfileMenu: (toggle: boolean) => void
}

const ProfileMenu = ({ toggleProfileMenu }: ProfileMenuProps): JSX.Element => {
    return (
        <>
            <ul className="editProfileWrapper sm-element">
                <Link
                    onClick={() => toggleProfileMenu(false)}
                    to="/editprofile"
                    className="linky"
                >
                    <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                    <span className="menuSpan">Update Profile</span>
                </Link>
                <Link
                    onClick={() => toggleProfileMenu(false)}
                    to="/deleteprofile"
                    className="linky"
                >
                    <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                    <span className="menuSpan">Delete Account</span>
                </Link>
            </ul>
        </>
    )
}

export default ProfileMenu
