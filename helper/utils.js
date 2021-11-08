const jwt = require('jsonwebtoken')

require('dotenv').config()

// Generate Access Token
const generateAccessToken = (user) => {
  const id = user.id_user
  const expiresIn = '10m'

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  }

  const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}

// Generate Refresh Token
const generateRefreshToken = (user) => {
  const id = user.id_user

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  }

  const signedToken = jwt.sign(payload, PRIV_KEY)

  return {
    token: 'Bearer ' + signedToken,
  }
}

module.exports.generateAccessToken = generateAccessToken
module.exports.generateRefreshToken = generateRefreshToken
