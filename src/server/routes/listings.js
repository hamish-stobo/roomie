const router = require('express').Router()
const { getAllListings, getListing } = require('../db/dbfunctions/listings')

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