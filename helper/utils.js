const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'private.pem'),
  'utf8'
)

// Sign Token
const issueJWT = (user) => {
  const id = user.id_user
  const expiresIn = '3h'

  const payload = {
    sub: id,
    iat: Date.now(),
  }

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'ES512',
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}

module.exports.issueJWT = issueJWT
