const router = require('express').Router()
const { getAllListings, getListing, createListing } = require('../db/dbfunctions/listings')

router.get('/', async (req, res) => {
    try {
      const listingsAndLikes = await getAllListings()
      if(listingsAndLikes.length == 0 || !listingsAndLikes) {
        res.status(404).send('Our database is an empty desert. No listings were found.')
      } else {
        res.status(200).send(JSON.stringify(listingsAndLikes))
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
    console.log(listing)
    if(!listing || listing == {}) {
      res.status(404).send('There\'s no listing by that name around these parts. Now, be on your way.')
    } else {
      res.status(200).send(JSON.stringify(listing, circularReplacer()))
    }
} catch (e) {
    console.error({msg: 'Error from /listing'}, e)
    res.status(500).send('Error from GET listing route.')
}
})

//3967addd-e6b6-4696-958b-8d56507a10da
router.post('/:user_id', async (req, res) => {
  try {
      console.log(req.files.listing_image)
      const { listing_image } = req.files
      const { user_id } = req.params
      const { body } = req
      const data = Array.isArray(listing_image) 
        ? listing_image.map(photo => photo.data)
        : listing_image.data
      if(JSON.stringify(body) === "{}" || data.length <= 0) {
          res.status(400).send('Request data malformed')
      } else {
          //do the DB stuff
          const insertListingResponse = await createListing(user_id, body, data)
              //if update is successful
              console.log(insertListingResponse);
              res.status(200).send(insertListingResponse)
      }
  }
      catch (e) {
          console.error(e)
          res.status(500).send(e)
      }
})

module.exports = router