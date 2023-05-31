type Listing = {
    listing_id: String
    listings_user_id: String
    tagline: string
    listing_location: string
    rent: number
    bedrooms: number
    bathrooms: number
}

type ListingParams = {
    listing_id: string
}

type User = {
    created_at: String | number | readonly;
    user_id: String | number | readonly;
    first_name: String | number | readonly;
    last_name: String | number | readonly;
    password: String | number | readonly;
    email: String | number | readonly;
    user_location: String | number | readonly;
    profile_picture: String | number | readonly;
}

type Popup = {
    type: String
    message: String
}

type ChevronProps = {
    counter: (difference: number) => void;
}