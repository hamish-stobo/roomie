require('dotenv').config()
const { sign, verify, decode } = require("jsonwebtoken")

const createTokens = user => {
  const accessToken = sign(
        { user_id: user.user_id },
        process.env.SECRET
    )
  return accessToken
};

const validateToken = (req, res, next) => {
  const { accessToken } = req.cookies

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" })

  try {
    const validToken = verify(accessToken, process.env.SECRET)
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

const getUserIdFromToken = token => {
  const { user_id } = decode(token)
  return user_id
}

const compareIDs = (id1, id2) => {
  if(id1 !== id2) throw 'Not Authorized'
}

module.exports = { createTokens, validateToken, getUserIdFromToken, compareIDs }