import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../../../styles/styles'

const ListingMenu = ({
    elHeight,
    toggleListingMenu,
    listing_id,
    deleteListing,
}: ListingMenuProps) => {
    const actionDeleteListing = (id: string): void => {
        deleteListing(id)
        toggleListingMenu(false)
    }

    return (
        <>
            <ul
                className="ListingMenuWrapper"
                style={{ top: `calc(${elHeight}px + 60px)` }}
            >
                <Link
                    onClick={() => toggleListingMenu(false)}
                    to={`/editlisting/${listing_id}`}
                    className="linky"
                >
                    <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                    <span>Edit Listing</span>
                </Link>
                <div
                    onClick={() => actionDeleteListing(listing_id)}
                    className="linky"
                >
                    <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                    <span>Delete Listing</span>
                </div>
            </ul>
        </>
    )
}

export default ListingMenu
