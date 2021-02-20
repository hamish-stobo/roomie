require('dotenv').config()
const router = require('express').Router()
const {createUser, getUser, updateUser} = require('../db/dbfunctions/users')
const usersTableInfo = async () => await JSON.parse(process.env.USERS_FIELDS)
const uuidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
//insert a new user
router.post('/', async (req, res) => {
    try {
        const body = req.body
        //check that request body keys are named correctly
        keys.forEach(key => {
            //check that request body contains valid keys
            //values of those keys can be empty, but request body must contain the keys
            if(!body.hasOwnProperty(key)) {
                checkBody = true
            }
            //check that all data attempting to be inserted is of type string
            if(typeof body[key] !== 'string') checkBody = true
        })
        //if client data is bad, tell them that they're bad and they should feel bad
        if(Object.keys(body).length == 0 || checkBody === true) {
            res.status(400).send('Request data malformed')
        } else {
            //do the DB stuff
            const profile = await createUser(body)
            //if no profile found to update, throw error to the catch block
            if(!profile) {
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
    const validateParam = user_id.match(uuidRegex)
    if(!validateParam) {
        res.status(400).send('Incorrect URL parameters')
    } else {
        const profile = await getUser(user_id)
        if(!profile) {
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
        const user_id = req.params.user_id
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
        const usersFields = await usersTableInfo();
        const newKeys = usersFields.map(item => {
            let fieldInfo = {...item}
            return fieldInfo
        })
        console.log('keys: ' + JSON.stringify(newKeys))
        //if client data is bad, tell them that they're bad and they should feel bad
        if(body == {} || checkBody === true) {
            res.status(400).send('Request data malformed')
        } else {
            //do the DB stuff
            const profile = await updateUser(user_id, body)
            //if no profile found to update, throw error to the catch block
            if(!profile || profile === {}) {
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