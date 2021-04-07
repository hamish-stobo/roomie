require('dotenv').config()
const router = require('express').Router()
const {createUser, getUser, updateUser, deleteUser, getUserFromEmail} = require('../db/dbfunctions/users')
const { validateUUID, validateEmail } = require('../validation/dataValidator')
const { createTokens, validateToken, getUserIdFromToken, compareIDs } = require('../middleware/JWT')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 
//insert a new user
router.post('/', async (req, res) => {
    try {
        const { body } = req
        body.password = await bcrypt.hash(body.password, 10)
        // console.log(req.body)
        body.profile_picture = req.files.profile_picture.data
        if(JSON.stringify(body) == "{}") {
            throw 'Request data malformed'
        } else {
            //do the DB stuff
            const profile = await createUser(body)
                // if update is successful
                // create token from secret, email and password for 28800 seconds
                const accessToken = createTokens(profile)
                res.cookie("accessToken", accessToken, {
                    maxAge: 28800000, //cookie valid for 8 hours
                    httpOnly: false,
                  }).status(200).send(JSON.stringify(profile))
        }
    }
        catch (e) {
            console.error({msg: 'Error from /createUser'}, e)
            if(e === 'Request data malformed')  { 
                res.status(400).send(e)
            } else {
                res.status(500).send(e)
            }
        }
})

router.get('/fromcookie', validateToken, async (req, res) => {
    try {
    const { accessToken } = req.cookies
    const user_id = getUserIdFromToken(accessToken)
    const profile = await getUser(user_id)
    if(!profile || JSON.stringify(profile) === "{}") {
        throw '404/Profile not found :('
    } else {
        res.status(200).send(profile)
    }
    } catch (e) {
        switch (e) {
            case '400/Incorrect URL parameters':
                res.status(400).send('Incorrect URL parameters')
                break
            case '404/Profile not found :(':
                res.status(404).send('404/Profile not found :(')
                break
            default:
                res.status(500).send(e)
        }
    }
})

router.get('/:user_id', validateToken, async (req, res) => {
    try {
    const { user_id } = req.params
    if(!validateUUID(user_id)) {
        res.status(400).send('Incorrect URL parameters')
    } else {
        const profile = await getUser(user_id)
        if(!profile || JSON.stringify(profile) === "{}") {
            res.status(404).send('Profile not found :(')
        } else {
            res.status(200).send(profile)
        }
    }
    } catch (e) {
      console.error('Error from GET profile', e)
      res.status(500).send(e)
    }
  })


router.put('/:user_id', validateToken, async (req, res) => {
    try {
        const { user_id } = req.params
        const { body } = req
        body.profile_picture = req.files.profile_picture.data
        const { accessToken } = req.cookies
        const idFromJWT = getUserIdFromToken(accessToken)
        compareIDs(user_id, idFromJWT)
        if(!validateUUID(user_id) || JSON.stringify(body) === "{}" || !validateEmail(body.email)) {
            res.status(400).send('Request data malformed')
        }
        else {
            console.log(`user_id: ${user_id}, body: ${JSON.stringify(body)}`)
            const profile = await updateUser(user_id, body)
            //extra layer of error handling
            if(JSON.stringify(profile) == "{}" || !profile) {
                throw 'Update to profile failed'
            } else {
                //if update is successful
                res.status(200).send(profile)
            }
        }
      } catch (e) {
            console.error({msg: 'Error from update profile'}, e)
            if(e === 'Not Authorized') {
                res.status(403).send(e)
            } else {
                res.status(500).send('Could not update at /profile')
            }
      }
})

router.delete('/', validateToken, async (req, res) => {
    try {
        const user_id = getUserIdFromToken(req.cookies.accessToken)
        const deleteUser = await deleteUser(user_id)
        res.status(200).send(deleteUser)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router