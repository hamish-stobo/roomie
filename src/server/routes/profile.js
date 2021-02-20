require('dotenv').config()
const router = require('express').Router()
const {createUser, getUser, updateUser} = require('../db/dbfunctions/users')
const { validateUUID, validateRequestBody } = require('../validation/dataValidator')
//insert a new user
router.post('/', async (req, res) => {
    try {
        const { body } = req
        const isValid = validateRequestBody(body)
        //we check the keys and data types are correct,
        //and check that the request body is not empty

        //if client data is bad, tell them that they're bad and they should feel bad
        if(!isValid || !JSON.stringify(body)) {
            res.status(400).send('Request data malformed')
        } else {
            //do the DB stuff
            const profile = await createUser(body)
            //if no profile found to update, throw error to the catch block
            if(!profile || !JSON.stringify(profile)) {
                throw Error('Create profile failed')
                // res.status(500).send('Update to profile failed')
            } else {
                //if update is successful
                res.status(200).send(JSON.stringify(profile))
            }
        }
    }
        catch (e) {
            console.error({msg: 'Error from /createUser'}, e)
            res.status(500).send('Could not create profile')
        }
})

//given a user's first name, will return that
//users profile and the listings which they have 
//left likes on.

//if no profile found, an empty object will be returned
router.get('/:user_id', async (req, res) => {
    try {
    const { user_id } = req.params
    if(!validateParam) {
        res.status(400).send('Incorrect URL parameters')
    } else {
        const profile = await getUser(user_id)
        if(!profile || !JSON.stringify(profile)) {
            res.status(404).send('Profile not found :(')
        // res.status(500).send('Update to profile failed')
        } else {
        //if update is successful
            res.status(200).send(JSON.stringify(profile))
        }
    }
    } catch (e) {
      console.error({msg: 'Error from /GET /profile'}, e)
      res.status(500).send('Could not GET /profile')
    }
  })

//
router.put('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const { body } = req
        console.log(`user_id: ${JSON.stringify(user_id)}, body: ${JSON.stringify(body)}`)
        //validate client data, and if client data is bad,
        //tell them that they're bad and they should feel bad
        if(!validateUUID(user_id) || !JSON.stringify(body) || !validateRequestBody(body)) {
            res.status(400).send('Request data malformed')
        }
        else {
            //do the DB stuff
            const profile = await updateUser(user_id, body)
            //if no profile found to update, throw error to the catch block
            if(!JSON.stringify(profile) || !profile) {
                throw Error('Update to profile failed')
                // res.status(500).send('Update to profile failed')
            } else {
                //if update is successful
                res.status(200).send(JSON.stringify(profile))
            }
        }
      } catch (e) {
            console.error({msg: 'Error from update profile'}, e)
            res.status(500).send('Could not update at /profile')
      }
})

module.exports = router