const jwt = require('jsonwebtoken')

require('dotenv').config()

// Generate Access Token
const generateAccessToken = (user) => {
  const id = user.id_user
  const expiresIn = '30m'

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

  const signedToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

  return {
    token: 'Bearer ' + signedToken,
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
}
