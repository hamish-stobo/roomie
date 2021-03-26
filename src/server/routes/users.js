require('dotenv').config()
const router = require('express').Router()
const {createUser, getUser, updateUser} = require('../db/dbfunctions/users')
const { validateUUID, validateEmail } = require('../validation/dataValidator')

 
//insert a new user
router.post('/', async (req, res) => {
    try {
        console.log(req)
        const { body } = req
        const { data } = req.files.profile_picture
        if(JSON.stringify(body) === "{}" || !data) {
            res.status(400).send('Request data malformed')
        } else {
            //do the DB stuff
            const profile = await createUser({...body, profile_picture: data})
                //if update is successful
                console.log(JSON.stringify(profile));
                res.status(200).send(JSON.stringify(profile))
        }
    }
        catch (e) {
            console.error({msg: 'Error from /createUser'}, e)
            res.status(500).send('Could not create profile')
        }
})
router.get('/:user_id', async (req, res) => {
    try {
    const { user_id } = req.params
    if(!validateUUID(user_id)) {
        res.status(400).send('Incorrect URL parameters')
    } else {
        const profile = await getUser(user_id)
        if(!profile || JSON.stringify(profile) === "{}") {
            res.status(404).send('Profile not found :(')
        } else {
        //if update is successful
            res.status(200).send(profile)
        }
    }
    } catch (e) {
      console.error('Error from GET profile', e)
      res.status(500).send(e)
    }
  })


router.put('/:user_id', async (req, res) => {
    try {
        const { user_id} = req.params
        const { body } = req
        if(!validateUUID(user_id) || JSON.stringify(body) === "{}" || !validateEmail(body.email)) {
            res.status(400).send('Request data malformed')
        }
        else {
            const profile = await updateUser(user_id, body)
            //extra layer of error handling
            if(JSON.stringify(profile) == "{}" || !profile) {
                throw Error('Update to profile failed')
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