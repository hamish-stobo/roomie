const router = require('express').Router()
const { updateListing, getListingsLiked, getAllListings, getListing, createListing, deleteListing } = require('../db/dbfunctions/listings')
const { validateToken, getUserIdFromToken, compareIDs } = require('../middleware/JWT')

router.get('/', async (req, res) => {
    try {
      const listings = await getAllListings()
      if(listings.length == 0) {
        res.status(200).send(listings)
      } else if (!listings || !Array.isArray(listings)) {
        res.status(404).send('No listings were found.')
      } else {
        res.status(200).send(JSON.stringify(listings))
      }
    } catch (e) {
      console.error({msg: 'Error from api/v1/listing'}, e)
      res.status(500).send('Error from GET all listings')
    }
  })


router.get('/:listing_id', async (req, res) => {
try {
    const { listing_id } = req.params
    const listing = await getListing(listing_id)
    if(!listing || JSON.stringify(listing) == "{}") throw "There's no listing by that name around these parts. Now, be on your way."
    res.status(200).send(JSON.stringify(listing))
} catch (e) {
    e === "There's no listing by that name around these parts. Now, be on your way."
      ? res.status(404).send(e)
      : res.status(500).send(`Error from GET listing route${e}` )
    
}
})


router.post('/:user_id', validateToken, async (req, res) => {
  try {
      const { listing_image } = req.files
      const { user_id } = req.params
      const { body } = req
      const data = Array.isArray(listing_image) 
        ? listing_image.map(photo => photo.data)
        : listing_image.data
      if(JSON.stringify(body) === "{}" || data.length <= 0) {
          res.status(400).send('Request data malformed')
      } else {
          const insertListingResponse = await createListing(user_id, body, data)
          res.status(200).send(insertListingResponse)
      }
  }
      catch (e) {
          res.status(500).send(e)
      }
})

router.put('/:listing_id', validateToken, async (req, res) => {
  try {
      const { body } = req
      const { listing_id } = req.params
      const { images } = req.files
      const { accessToken } = req.cookies
      const user_id = getUserIdFromToken(accessToken)
      const { listings_user_id } = body
      compareIDs(user_id, listings_user_id)
      const data = Array.isArray(images) 
        ? images.map(photo => photo.data)
        : images.data
      if(JSON.stringify(body) === "{}" || data.length <= 0) throw 'Request data malformed'
      const updateListingResponse = await updateListing(listing_id, body, data)
      res.status(200).send(updateListingResponse)
  }
      catch (e) {
          if(e === 'Request data malformed') {
            res.status(400).send(e)
          } else if(e === 'Not Authorized') {
            res.status(403).send(e)
          } else {
            res.status(500).send(e)
          }
      }
})

router.delete('/:listing_id', validateToken, async (req, res) => {
  try {
    const { listing_id } = req.params
    const listing = await getListing(listing_id)
    const { accessToken } = req.cookies
    const user_id = getUserIdFromToken(accessToken)
    const { listings_user_id } = listing
    compareIDs(user_id, listings_user_id)
    const deleteListingRes = await deleteListing(listing_id)
    res.status(200).send(deleteListingRes)
  } catch (e) {
    if(e === 'Not Authorized') {
      res.status(403).send(e)
    } else {
      res.status(500).send(e)
    }
  }
})

router.get('/likes/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params
    const likedListings = await getListingsLiked(user_id)
    if(!likedListings || !Array.isArray(likedListings)) throw 'Couldn\'t find that'
    res.status(200).send(JSON.stringify(likedListings))
  } catch (e) {
    e === 'No listings liked yet' 
      ? res.status(404).send(e)
      : res.status(500).send(e)
  }
})

module.exports = router