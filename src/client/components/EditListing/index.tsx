import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../styles/styles'

const EditListing = () => {
    const [listingDetails, setListingDetails] = useState({
        tagline: '',
        listing_location: '',
        rent: 0,
        bedrooms: 0,
        bathrooms: 0,
        listings_user_id: '',
    })
    const [images, setImages] = useState([])
    const { listing_id } = useParams() as ListingParams
    const [redirect, setRedirect] = useState(false)
    // const onChange = e => {
    //     const { name, value } = e.target
    //     setListingDetails({...listingDetails, [name]: value})
    //     console.log(`name ${name}, value ${value}`)
    // }
    const addImages = (e) => {
        setImages([...images, ...e.target.files])
    }
    const submit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            for (const prop in listingDetails) {
                formData.append(prop, listingDetails[prop])
            }
            images.forEach((image) => formData.append('images', image))
            const updateListingResponse = await axios.put(
                `/api/v1/listings/${listing_id}`,
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
            setRedirect(true)
        } catch (e) {
            alert(e)
        }
    }

    const getListing = async (listing_id) => {
        try {
            const listing = await axios.get(`/api/v1/listings/${listing_id}`)
            if (!listing || !listing.data) throw 'No listing found'
            const { data } = listing
            setListingDetails({
                ...listingDetails,
                tagline: data.tagline,
                listing_location: data.listing_location,
                rent: data.rent,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                listings_user_id: data.listings_user_id,
            })
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getListing(listing_id)
    }, [])
    return (
        <div className="AddListingContainer editListingWrapper">
            {redirect && <Redirect to="/listings" />}
            <div className="addListingTop">
                <p className="small-caps-purple">Edit Listing</p>
            </div>
            <form className="Form addListingForm" onSubmit={submit}>
                <label htmlFor="tagline-input">New Tagline</label>
                <input
                    id="tagline-input"
                    maxLength="35"
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
                            rent: e.target.value,
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
                            bedrooms: e.target.value,
                        })
                    }
                />
                <label htmlFor="bathrooms-input">New No. of Bathrooms</label>
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
                            bathrooms: e.target.value,
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
    )
}

export default EditListing
