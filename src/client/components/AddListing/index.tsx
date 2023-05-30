import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../../styles/styles'
import { useAuth } from '../App/Auth'

type Listing = {
    tagline: string
    listing_location: string
    rent: number
    bedrooms: number
    bathrooms: number
}

const AddListing = () => {
    const [listingDetails, setListingDetails] = useState<Listing>({
        tagline: '',
        listing_location: '',
        rent: 0,
        bedrooms: 0,
        bathrooms: 0,
    })
    const [listing_images, setListingImages] = useState<File[]>([])
    const [redirect, setRedirect] = useState(false)
    const { user } = useAuth()
    const onChange = (e: Event) => {
        const { name, value }: any = e.currentTarget
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        if (name in listingDetails) {
            setListingDetails({ ...listingDetails, [name]: value })
        }
    }
    const addImages = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement
        const files = target.files as FileList
        const fileList = [...files]
        setListingImages([...listing_images, ...fileList])
    }
    const submit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData() as any
            for (const prop in listingDetails) {
                formData.append(
                    prop,
                    listingDetails[prop as keyof typeof listingDetails]
                )
            }
            listing_images.forEach((image) =>
                formData.append('listing_image', image)
            )
            const insertResponse = await axios.post(
                `api/v1/listings/${user?.user_id}`,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
            )
            if (insertResponse.data === 'Listing inserted successfully') {
                setRedirect(true)
            }
        } catch (err) {
            alert(err)
        }
    }
    return (
        <div className="AddListingContainer">
            {redirect && <Redirect to="/listings" />}
            <div className="addListingTop">
                <p className="small-caps-purple">List a Room</p>
            </div>
            <form className="Form addListingForm" onSubmit={submit}>
                <input
                    required
                    maxLength="35"
                    className={`text-input ${
                        !listingDetails?.tagline ? '' : 'lowercase'
                    }`}
                    type="text"
                    name="tagline"
                    placeholder="Enter a catchy title for your listing"
                    value={listingDetails?.tagline}
                    onChange={onChange}
                />
                <input
                    required
                    className={`text-input ${
                        !listingDetails?.listing_location ? '' : 'lowercase'
                    }`}
                    type="text"
                    name="listing_location"
                    placeholder="Where is the flat located?"
                    value={listingDetails?.listing_location}
                    onChange={onChange}
                />
                <input
                    required
                    className="text-input"
                    type="number"
                    name="rent"
                    placeholder="What is the weekly rent?"
                    value={
                        !listingDetails?.rent ? undefined : listingDetails?.rent
                    }
                    onChange={onChange}
                />
                <input
                    required
                    className="text-input"
                    type="number"
                    name="bedrooms"
                    placeholder="How many bedrooms?"
                    value={
                        !listingDetails?.bedrooms
                            ? undefined
                            : listingDetails?.bedrooms
                    }
                    onChange={onChange}
                />
                <input
                    required
                    className="text-input"
                    type="number"
                    name="bathrooms"
                    placeholder="How many bathrooms?"
                    value={
                        !listingDetails?.bathrooms
                            ? undefined
                            : listingDetails?.bathrooms
                    }
                    onChange={onChange}
                />
                <div className="text-input fileContainer">
                    <label htmlFor="file-upload-label">
                        Upload one or more photos
                    </label>
                    <input
                        required
                        id="file-upload"
                        className="fileUpload"
                        type="file"
                        multiple
                        accept="image/png, image/jpeg"
                        name="listing_images"
                        onChange={addImages}
                    />
                </div>
                <input
                    required
                    className="button"
                    value="Submit"
                    type="submit"
                    name="submit"
                />
            </form>
        </div>
    )
}

export default AddListing
