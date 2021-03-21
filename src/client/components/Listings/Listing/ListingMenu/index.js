import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../../styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

const ListingMenu = ({elHeight, toggleListingMenu}) => {
    
    return (
        <>
        <ul className="ListingMenuWrapper" style={{top: `calc(${elHeight}px + 60px)`}}>
            <Link onClick={() => toggleListingMenu(false)} to="/editlisting" className="linky">
                <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                <span className="menuSpan">Edit Listing</span>
            </Link>
            <Link onClick={() => toggleListingMenu(false)} to="/deletelisting" className="linky">
                <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
                <span className="menuSpan">Delete Listing</span>
            </Link>
        </ul>
        </>
    )
}

export default ListingMenu

