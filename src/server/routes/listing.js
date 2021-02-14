const router = require('express').Router()
const listingsFunctions = require('../db/dbfunctions/listings')

//shows all listings and user_ids of users who have left likes on
//those listings.
router.get('/', async (req, res) => {
    try {
      const listingsAndLikes = await listingsFunctions.getAllListings()
      res.send(JSON.stringify(listingsAndLikes))
    } catch (e) {
      console.error({msg: 'Error from /'}, e)
      res.status(500).send('Whoops from api/v1/listing/')
    }
  })

//this takes a listing ID as the URL parameter, and
//returns the listing record and all the userIDs of users
//who have left likes on that listing.
router.get('/:listing_id', async (req, res) => {
try {
    const listingId = req.params.listing_id
    const listing = await listingsFunctions.getListing(listingId)
    res.send(JSON.stringify(listing))
} catch (e) {
    console.error({msg: 'Error from /listing'}, e)
    res.send
}
})

module.exports = router