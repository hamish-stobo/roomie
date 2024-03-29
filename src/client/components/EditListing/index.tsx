import axios from 'axios'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../App/Auth'
import '../../styles/styles'

const EditListing = (): JSX.Element => {
    const { popup, setPopup } = useAuth()
    const [listingDetails, setListingDetails] = useState<Listing>({
        created_at: '',
        listing_id: '',
        listings_user_id: '',
        tagline: '',
        listing_location: '',
        rent: 0,
        bedrooms: 0,
        bathrooms: 0,
    })
    const [listing_images, setListingImages] = useState<File[]>([])
    const { listing_id } = useParams() as ListingParams
    const [redirect, setRedirect] = useState(false)
    const addImages = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files as FileList
        const fileList = [...files]
        setListingImages([...listing_images, ...fileList])
    }
    const [listingWasUpdated, setListingWasUpdated] = useState(false)
    // React.DOMAttributes<HTMLFormElement>.onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
    const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
            const updateListingResponse = await axios.put(
                `api/v1/listings/${listing_id}`,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
            )
            const { data } = updateListingResponse
            if (data !== 'Listing successfully updated')
                throw 'Update unsuccessful'
            setPopup({
                type: 'success',
                message: 'Listing was successfully updated',
            })
            setListingWasUpdated(true)
        } catch (err: any) {
            console.error(err)
            setPopup({ type: 'error', message: 'Something went wrong' })
        }
    }

    useEffect(() => {
        if (listingWasUpdated) {
            setRedirect(true)
        }
    }, [popup])

    useEffect(() => {
        const getListing = async (listing_id: string): Promise<void> => {
            try {
                const listing = await axios.get(
                    `/api/v1/listings/${listing_id}`
                )
                if (!listing || !listing.data) throw 'No listing found'
                const { data } = listing
                setListingDetails({
                    ...listingDetails,
                    listings_user_id: data.listings_user_id,
                    tagline: data.tagline,
                    listing_location: data.listing_location,
                    rent: data.rent,
                    bedrooms: data.bedrooms,
                    bathrooms: data.bathrooms,
                })
            } catch (err: any) {
                console.error(err)
                setPopup({
                    type: 'error',
                    message: 'Something went wrong',
                })
            }
        }
        getListing(listing_id)
    }, [])
    return (
        <>
            {!!listingDetails.tagline && (
                <span style={{ visibility: 'hidden', display: 'none' }}>
                    Loading...
                </span>
            )}
            <div className="AddListingContainer editListingWrapper">
                {redirect && <Redirect to="/listings" />}
                <div className="addListingTop">
                    <p className="small-caps-purple">Edit Listing</p>
                </div>
                <form className="Form addListingForm" onSubmit={submit}>
                    <label htmlFor="tagline-input">New Tagline</label>
                    <input
                        id="tagline-input"
                        maxLength={35}
                        required
                        className={`text-input ${
                            !listingDetails.tagline ? '' : 'lowercase'
                        }`}
                        type="text"
                        name="tagline"
                        value={listingDetails.tagline}
                        placeholder="Enter catchy title for your listing"
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                tagline: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="location-input">New Location</label>
                    <input
                        id="location-input"
                        required
                        className={`text-input ${
                            !listingDetails.listing_location ? '' : 'lowercase'
                        }`}
                        type="text"
                        name="listing_location"
                        placeholder="Where is the listing located?"
                        value={listingDetails.listing_location}
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                listing_location: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="rent-input">New Weekly Rent</label>
                    <input
                        id="rent-input"
                        required
                        className={`text-input ${
                            !listingDetails.rent ? '' : 'lowercase'
                        }`}
                        type="number"
                        name="rent"
                        value={listingDetails.rent}
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                rent: parseInt(e.target.value),
                            })
                        }
                    />
                    <label htmlFor="bedrooms-input">New No. of Bedrooms</label>
                    <input
                        id="bedrooms-input"
                        required
                        className="text-input"
                        type="number"
                        name="bedrooms"
                        value={listingDetails.bedrooms}
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                bedrooms: parseInt(e.target.value),
                            })
                        }
                    />
                    <label htmlFor="bathrooms-input">
                        New No. of Bathrooms
                    </label>
                    <input
                        id="bathrooms-input"
                        required
                        className="text-input"
                        type="number"
                        name="bathrooms"
                        value={listingDetails.bathrooms}
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                bathrooms: parseInt(e.target.value),
                            })
                        }
                    />
                    <label htmlFor="file-upload">
                        Upload one or more new photos. <br />
                        <span style={{ fontSize: '0.83em', color: 'black' }}>
                            This will overwrite any existing photos.
                        </span>
                    </label>
                    <div className="text-input fileContainer">
                        <input
                            required
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/png, image/jpeg"
                            name="images"
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
        </>
    )
}

export default EditListing
