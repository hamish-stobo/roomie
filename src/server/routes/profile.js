const router = require('express').Router()
const usersFunctions = require('../db/dbfunctions/users')

//given a user's first name, will return that
//users profile and the listings which they have 
//left likes on.
router.get('/:first_name', async (req, res) => {
    try {
      const userFirstName = req.params.first_name
      const profile = await usersFunctions.getUser(userFirstName)
      res.send(JSON.stringify(profile))
    } catch (e) {
      console.error({msg: 'Error from /getUsers'}, e)
      res.send
    }
  })

module.exports = router