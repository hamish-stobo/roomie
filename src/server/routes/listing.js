const router = require('express').Router()
const listingsFunctions = require('../db/dbfunctions/listings')

//shows all listings and user_ids of users who have left likes on
//those listings.
router.get('/', async (req, res) => {
    try {
      const listingsAndLikes = await listingsFunctions.getAllListings()
      if(listingsAndLikes.length == 0) {
        res.status(404).send('Our database is an empty desert. No listings were found.')
      } else {
        res.status(200).send(JSON.stringify(listingsAndLikes))
      }
    } catch (e) {
      console.error({msg: 'Error from /'}, e)
      res.status(500).send('Error from GET all listings')
    }
  })

//this takes a listing ID as the URL parameter, and
//returns the listing record and all the userIDs of users
//who have left likes on that listing.
router.get('/:listing_id', async (req, res) => {
try {
    const { listing_id } = req.params
    const listing = await listingsFunctions.getListing(listing_id)
    if(!listing || listing == {}) {
      res.status(404).send('There\'s no listing by that name around these parts. Now, be on your way.')
    } else {
      res.status(200).send(JSON.stringify(listing))
    }
} catch (e) {
    console.error({msg: 'Error from /listing'}, e)
    res.status(500).send('Error from GET listing route.')
}
})

module.exports = router