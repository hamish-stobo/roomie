import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../../styles/styles'


const AddListing = () => {
    const [listingDetails, setListingDetails] = useState(new Map()) 
    const [listing_images, setListingImages] = useState([])
    const [redirect, setRedirect] = useState(false)
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setListingDetails(new Map(listingDetails.set(name, value)))
        console.log(`name ${name}, value ${value}`)
    }
    const addImages = e => {
        setListingImages([...listing_images, ...e.target.files])
    }
    const submit =  async e => {
        try {
            e.preventDefault()
            const formData = new FormData();
            listingDetails.forEach((val, key) => {
                formData.append(key, val)
            })
            listing_images.forEach(image => formData.append('listing_image', image))
            alert(formData)
            const insertResponse = await axios.post('/api/v1/listings/c1783704-a832-426a-835c-41d789d75566', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (insertResponse.data === 'Listing inserted successfully') {
                alert(insertResponse.data)
                setRedirect(true)
            }
        } catch (err) {
            alert (err)
        }
    }
    return (
        <div className="AddListingContainer">
            {redirect && <Redirect to="/listings" />}
            <div className="addListingTop">
                <p className="small-caps-purple">List a Room</p>
            </div>
            <form className="Form addListingForm" onSubmit={submit}>
                <input required className={`text-input ${!listingDetails.get('title') ? '' : 'lowercase'}`} type="text" name="tagline" placeholder="Title" value={listingDetails.get('tagline')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('location') ? '' : 'lowercase'}`} type="text" name="listing_location" placeholder="Location (suburb)" value={listingDetails.get('listing_location')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('rent') ? '' : 'lowercase'}`} type="number" name="rent" placeholder="Weekly rent" value={listingDetails.get('rent')} onChange={onChange} />
                <input required className="text-input" type="number" name="bedrooms" placeholder="No. of bedrooms:" value={listingDetails.get('bedrooms')} onChange={onChange} />
                <input required className="text-input" type="number" name="bathrooms" placeholder="No. of bathrooms:" value={listingDetails.get('bathrooms')} onChange={onChange} />
                <div className="text-input fileContainer">
                    <label htmlFor="file-upload-label">Upload one or more photos</label>
                    <input required id="file-upload" className="fileUpload" type="file" multiple accept="image/png, image/jpeg" name="listing_images" onChange={addImages}/>
                </div>
                <input required className="button" value="Submit" type="submit" name="submit" />
            </form>
        </div>
    )
}

export default AddListing
