const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { models } = require('../models/index')

require('dotenv').config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        let user = await models.User.findOne({
          where: { id_user: jwt_payload.sub },
          include: [
            {
              model: models.Mahasiswa,
              as: 'mahasiswa',
              required: false,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
            {
              model: models.Dosen,
              as: 'dosen',
              required: false,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
        })
        if (!user) return done(null, false)
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
