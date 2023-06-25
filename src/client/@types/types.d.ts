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
    type: 'success' | 'info' | 'warning' | 'error'
    message: string
}

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

type ListingParams = {
    listing_id: string
}

type ListingProps = {
    uniqueKey: number
    listing: FullListing
    deleteListing: (value: string) => void
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

type ListingsProps = {
    user_id: string | number
}

type DeleteListingProps = {
    listing_id: string
    hideDeleteListing: () => void
}

type LikedListingsComponentProps = {
    user_id: string | number
}

type ListingMenuProps = {
    elHeight: number
    toggleListingMenu: (arg: boolean) => void
    listing_id: string
    deleteListing: (value: string) => void
}

type ProfileMenuProps = {
    toggleProfileMenu: (toggle: boolean) => void
}

type ChevronProps = {
    counter: (difference: number) => void
}

type LoginDetails = {
    email: string
    password: string
}
