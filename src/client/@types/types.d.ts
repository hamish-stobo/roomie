type Listing = {
    created_at: string
    listing_id: string
    listings_user_id: string
    tagline: string
    listing_location: string
    rent: number
    bedrooms: number
    bathrooms: number
}

type FullListing = {
    created_at: string
    listing_id: string
    listings_user_id: string
    tagline: string
    listing_location: string
    rent: number
    bedrooms: number
    bathrooms: number
    author: User
    userLikes: string[]
    listing_photos: string[]
}

type ListingParams = {
    listing_id: string
}

type User = {
    readonly created_at: string | number
    readonly user_id: string | number
    readonly first_name: string | number
    readonly last_name: string | number
    readonly password: string | number
    readonly email: string | number
    readonly user_location: string | number
    readonly profile_picture: string | number
}

type Popup = {
    type: string
    message: string
}

type ChevronProps = {
    counter: (difference: number) => void
}
