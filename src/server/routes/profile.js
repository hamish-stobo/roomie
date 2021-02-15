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

//
router.put('/:first_name', async (req, res) => {
    try {
        const userFirstName = req.params.first_name
        const body = req.body
        //check that request body keys are named correctly
        let checkBody = false
        const keys = ['first_name', 'last_name', 'email', 'bio']
        keys.forEach(key => {
            //check that request body contains valid keys
            //values of those keys can be empty, but request body must contain the keys
            if(!body.hasOwnProperty(key)) {
                checkBody = true
            }
        })
        //if client data is bad, tell them that they're bad and they should feel bad
        if(body == {} || checkBody === true) {
            res.status(400).send('Request data malformed')
        } else {
            //do the DB stuff
            const profile = await usersFunctions.updateUser(userFirstName, body)
            //if no profile found to update, throw error to the catch block
            if(!profile || profile === {}) {
                throw Error('Update to profile failed')
                // res.status(500).send('Update to profile failed')
            } else {
                //if update is successful
                res.send(JSON.stringify(profile))
            }
        }
      } catch (e) {
        console.error({msg: 'Error from /getUsers'}, e)
        res.status(500).send('Could not update at /profile')
      }
})

module.exports = router