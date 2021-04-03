require('dotenv').config()
const router = require('express').Router()
const {getUser, getUserFromEmail} = require('../db/dbfunctions/users')
const { validateUUID, validateEmail } = require('../validation/dataValidator')
const { createTokens, validateToken, getUserIdFromToken, compareIDs } = require('../middleware/JWT')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/', async (req, res) => {
    try {
        if(!req.body) throw 'Please enter details correctly'
        const { email, password: reqPassword } = req.body
        //get user from email
        if(!validateEmail(email)) throw 'Please enter details correctly'
        const userRes = await getUserFromEmail(email)
        console.log(JSON.stringify(userRes))
        //check if no user found or if password incorrect
        if(!userRes || JSON.stringify(userRes) === '{}' || !bcrypt.compare(reqPassword, userRes?.password)) throw 'Username or password incorrect'
        //get user from ID
        const user = await getUser(userRes?.user_id)
        //create JWT cookie and send to client
        const accessToken = createTokens(user)
        res.cookie("accessToken", accessToken, {
            maxAge: 28800000, //cookie valid for 8 hours
            httpOnly: false,
            }).status(200).send(JSON.stringify(user))
    } catch (err) {
        if(err === 'Username or password incorrect' || 'Please enter details correctly') {
            res.status(400).send(err)
        } else {
            console.log(err)
            res.status(500).send(err)
        }
    }
})

module.exports = router