const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')
const path = require('path')

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'private.pem'),
  'utf8'
)

const issueJWT = (user) => {
  const _id = user._id
  const expiresIn = '1d'

  const payload = {
    sub: _id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'ecdsa',
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}

module.exports.issueJWT = issueJWT
