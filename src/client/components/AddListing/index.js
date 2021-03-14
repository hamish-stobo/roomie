import React, { useState } from 'react'
import '../../styles/styles'


const AddListing = () => {
    const [listingDetails, setListingDetails] = useState(new Map()) 
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setListingDetails(new Map(listingDetails.set(name, value)))
        console.log(`name ${name}, value ${value}`)
    }
    const submit = e => {
        e.preventDefault()
        const userObject = Object.fromEntries(listingDetails)
        console.log(JSON.stringify(userObject))
    }
    return (
        <div className="AddListingContainer">
            {/* <div className="registerTop">                
                <Link className="exitBtn registerExitBtn" to="/">x</Link>
                <p className="small-caps-purple">Sign Up to Find a Flat or List a Room</p>
            </div> */}
            <form className="Form" onSubmit={submit}>
                <input className={`text-input ${!listingDetails.get('title') ? '' : 'lowercase'}`} type="text" name="title" placeholder="Title" value={listingDetails.get('title')} onChange={onChange} />
                <input className={`text-input ${!listingDetails.get('location') ? '' : 'lowercase'}`} type="text" name="location" placeholder="Location (suburb)" value={listingDetails.get('location')} onChange={onChange} />
                <input className={`text-input ${!listingDetails.get('rent') ? '' : 'lowercase'}`} type="text" name="rent" placeholder="Weekly rent" value={listingDetails.get('rent')} onChange={onChange} />
                <input className={`text-input ${!listingDetails.get('bedrooms') ? '' : 'lowercase'}`} type="bedrooms" name="bedrooms" placeholder="No. of bedrooms" value={listingDetails.get('bedrooms')} onChange={onChange} />
                <input className={`text-input ${!listingDetails.get('bathrooms') ? '' : 'lowercase'}`} type="bathrooms" name="bathrooms" placeholder="No. of bathrooms?" value={listingDetails.get('bathrooms')} onChange={onChange} />
                <div>
                    <label for="file-upload">Upload one or more photos</label>
                    <input id="file-upload" className="fileUpload" type="file" multiple accept="image/png, image/jpeg" name="images" onChange={onChange}/>
                </div>
                <input className="button" value="Sign Up" type="submit" name="submit" />
            </form>
        </div>
    )
}

export default AddListing
