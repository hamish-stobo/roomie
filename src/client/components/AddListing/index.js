import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/styles'


const AddListing = () => {
    const [listingDetails, setListingDetails] = useState(new Map()) 
    const [images, setImages] = useState([])
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setListingDetails(new Map(listingDetails.set(name, value)))
        console.log(`name ${name}, value ${value}`)
    }
    const addImages = e => {
        setImages([...images, ...e.target.files])
    }
    const submit = e => {
        e.preventDefault()
        const formData = new FormData();
        listingDetails.forEach((val, key) => {
            formData.append(key, val)
        })
        formData.append('images', images);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
            if(pair[0] == 'images') {
                console.log(`IMAGES: ...${images[1]}`)
            }
         } 
        // console.log(JSON.stringify(formData))
        // axios.post('/api/v1/listings', formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
    }
    return (
        <div className="AddListingContainer">
            <div className="addListingTop">
                <p className="small-caps-purple">Add a Listing</p>
            </div>
            <form className="Form addListingForm" onSubmit={submit}>
                <input required className={`text-input ${!listingDetails.get('title') ? '' : 'lowercase'}`} type="text" name="title" placeholder="Title" value={listingDetails.get('title')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('location') ? '' : 'lowercase'}`} type="text" name="location" placeholder="Location (suburb)" value={listingDetails.get('location')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('rent') ? '' : 'lowercase'}`} type="number" name="rent" placeholder="Weekly rent" value={listingDetails.get('rent')} onChange={onChange} />
                <input required className="text-input" type="number" name="bedrooms" placeholder="No. of bedrooms:" value={listingDetails.get('bedrooms')} onChange={onChange} />
                <input required className="text-input" type="number" name="bathrooms" placeholder="No. of bathrooms:" value={listingDetails.get('bathrooms')} onChange={onChange} />
                <div className="text-input fileContainer">
                    <label htmlFor="file-upload-label">Upload one or more photos</label>
                    <input required id="file-upload" className="fileUpload" type="file" multiple accept="image/png, image/jpeg" name="images" onChange={addImages}/>
                </div>
                <input required className="button" value="Submit" type="submit" name="submit" />
            </form>
        </div>
    )
}

export default AddListing
