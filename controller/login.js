const bcrypt = require('bcrypt')

const utils = require('../helper/utils')

const { models } = require('../models/index')

module.exports = {
  login: async (req, res, next) => {
    try {
      const findUser = await models.User.findOne({
        where: { username: req.body.username },
      })

      // Username verification
      if (!findUser)
        res.status(401).json({ success: false, msg: 'Username salah' })

      const isValid = await bcrypt.compare(req.body.password, findUser.password)

      // Password verification
      if (isValid) {
        const accessToken = utils.generateAccessToken(findUser)
        const refreshToken = utils.generateRefreshToken(findUser)

        res.status(200).json({
          message: 'Berhasil Login',
          success: true,
          accessToken: accessToken.token,
          refreshToken: refreshToken.token,
        })
      } else {
        res.status(401).json({ success: false, msg: 'Password Salah' })
      }
    } catch (err) {
      next(err)
    }
  },
}
