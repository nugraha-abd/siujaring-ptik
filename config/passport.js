const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')

const { models } = require('../models/index')

const PUB_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'public.pem'),
  'utf8'
)

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['ES512'],
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        let user = await models.User.findOne({
          where: { id_user: jwt_payload.sub },
        })
        if (!user) return done(null, false)
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
