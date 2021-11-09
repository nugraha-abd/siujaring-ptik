const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        return res
          .status(401)
          .json({ success: false, message: 'Username salah' })

      // Password verification
      const isValid = await bcrypt.compare(req.body.password, findUser.password)

      if (!isValid)
        return res
          .status(401)
          .json({ success: false, message: 'Password Salah' })

      const accessToken = utils.generateAccessToken(findUser)
      const refreshToken = utils.generateRefreshToken(findUser)

      await models.User.update(
        {
          refresh_token: refreshToken.token,
        },
        { where: { username: req.body.username } }
      )

      res.status(200).json({
        message: 'Berhasil Login',
        success: true,
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
      })
    } catch (err) {
      next(err)
    }
  },
  token: async (req, res) => {
    try {
      const refreshToken = req.body.token

      if (refreshToken === null) {
        return res.status(401).json({
          success: false,
          message: 'Token tidak ditemukan, silakan login',
        })
      }

      const findRefreshToken = await models.User.findOne({
        where: { refresh_token: refreshToken, id_user: req.user.id_user },
      })

      if (!findRefreshToken) {
        return res
          .status(403)
          .json({ success: false, message: 'Token tidak valid' })
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            return res
              .status(403)
              .json({ success: false, message: 'Error verifikasi token' })
          }

          const accessToken = utils.generateAccessToken({
            username: user.username,
          })

          res.status(200).json({
            message: 'Berhasil refresh token',
            success: true,
            accessToken: accessToken.token,
          })
        }
      )
    } catch {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  logout: async (req, res) => {
    try {
      // remove refresh token value from database on user logout
      await models.User.update(
        {
          refresh_token: null,
        },
        { where: { id_user: req.user.id_user } }
      )

      req.logout()

      res.status(200).json({
        message: 'Berhasil Logout',
        success: true,
      })
    } catch {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
