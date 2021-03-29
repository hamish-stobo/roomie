import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../styles/styles'


const EditListing = () => {
    const [listingDetails, setListingDetails] = useState(new Map()) 
    const [images, setImages] = useState([])
    const { listing_id } = useParams()
    const onChange = e => {
        const { name, value } = e.target
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
        // axios.put('/api/v1/listings/listing_id', formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
    }

    const getListing = async listing_id => {
        try {
            const listing = await axios.get(`/api/v1/listings/${listing_id}`)
            const { data } = listing
            if(!data) throw 'No listing found'
            setImages([...images, ...data.images])
            for(const prop in data) {
                if(prop === 'images') break
                setListingDetails(new Map(listingDetails.set(prop, data[prop])))
            }
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getListing(listing_id)
    }, [])
    return (
        <div className="AddListingContainer editListingWrapper">
            <div className="addListingTop">
                <p className="small-caps-purple">Edit Listing</p>
            </div>
            <form className="Form addListingForm" onSubmit={submit}>
                <label htmlFor="tagline-input">Tagline</label>
                <input id="tagline-input" required className={`text-input ${!listingDetails.get('title') ? '' : 'lowercase'}`} type="text" name="tagline" placeholder="Title" value={listingDetails.get('tagline')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('location') ? '' : 'lowercase'}`} type="text" name="listing_location" placeholder="Location (suburb)" value={listingDetails.get('listing_location')} onChange={onChange} />
                <input required className={`text-input ${!listingDetails.get('rent') ? '' : 'lowercase'}`} type="number" name="rent" placeholder="Weekly rent" value={listingDetails.get('rent')} onChange={onChange} />
                <input required className="text-input" type="number" name="bedrooms" placeholder="No. of bedrooms:" value={listingDetails.get('bedrooms')} onChange={onChange} />
                <input required className="text-input" type="number" name="bathrooms" placeholder="No. of bathrooms:" value={listingDetails.get('bathrooms')} onChange={onChange} />
                <div className="text-input fileContainer">
                    <label htmlFor="file-upload-label">Upload one or more new photos</label>
                    <input required id="file-upload" className="fileUpload" type="file" multiple accept="image/png, image/jpeg" name="images" onChange={addImages}/>
                </div>
                <input required className="button" value="Submit" type="submit" name="submit" />
            </form>
        </div>
    )
}

export default EditListing
