const router = require('express').Router()
const usersFunctions = require('../db/dbfunctions/users')

//given a user's first name, will return that
//users profile and the listings which they have 
//left likes on.

//if no profile found, an empty object will be returned
router.get('/:first_name', async (req, res) => {
    try {
      const userFirstName = req.params.first_name
      const profile = await usersFunctions.getUser(userFirstName)
      res.status(200).send(JSON.stringify(profile))
    } catch (e) {
      console.error({msg: 'Error from /GET /profile'}, e)
      res.status(500).send('Could not GET /profile')
    }
  })

router.put('/:first_name', async (req, res) => {
    try {
        const userFirstName = req.params.first_name
        const body = req.body
        console.log(`first_name: ${userFirstName}, req.body: ${body} `)
        const profile = await usersFunctions.updateUser(userFirstName, body)
        res.send(JSON.stringify(profile))
      } catch (e) {
        console.error({msg: 'Error from /getUsers'}, e)
        res.status(500).send('Could not update at /profile')
      }
})

module.exports = router