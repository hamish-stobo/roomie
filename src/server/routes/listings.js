const router = require('express').Router()
const { getListingsLiked, getAllListings, getListing, createListing, deleteListing } = require('../db/dbfunctions/listings')

router.get('/', async (req, res) => {
    try {
      const listings = await getAllListings()
      if(listings.length == 0 || !listings) {
        res.status(404).send('Our database is an empty desert. No listings were found.')
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
    if(!listing || listing == {}) throw "There's no listing by that name around these parts. Now, be on your way."
    res.status(200).send(JSON.stringify(listing))
} catch (e) {
    e === "There's no listing by that name around these parts. Now, be on your way."
      ? res.status(404).send(e)
      : res.status(500).send(`Error from GET listing route${e}` )
    
}
})


router.post('/:user_id', async (req, res) => {
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

router.delete('/:listing_id', async (req, res) => {
  try {
    const { listing_id } = req.params
    const deleteListingRes = await deleteListing(listing_id)
    res.status(200).send(`yay we deleted it ${deleteListingRes}`)
  } catch (e) {
    res.send(e)
  }
})

router.get('/likes/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params
    console.log(user_id)
    const likedListings = await getListingsLiked(user_id)
    if(!likedListings || !Array.isArray(likedListings) || likedListings.length == 0) throw 'No listings liked yet'
    res.status(200).send(JSON.stringify(likedListings))
  } catch (e) {
    e === 'No listings liked yet' 
      ? res.status(404).send(e)
      : res.status(500).send(e)
  }
})

module.exports = router