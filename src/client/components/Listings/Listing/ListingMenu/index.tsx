import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../../../styles/styles'

type ListingMenuProps = {
    elHeight: number
    toggleListingMenu: (arg: boolean) => void
    listing_id: string
    deleteListing: (value: string) => void
}

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
                    <span className="menuSpan">Edit Listing</span>
                </Link>
                <div
                    onClick={() => actionDeleteListing(listing_id)}
                    className="linky"
                >
                    <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                    <span className="menuSpan">Delete Listing</span>
                </div>
            </ul>
        </>
    )
}

export default ListingMenu
