const express = require('express')
const router = express.Router()
const passport = require('passport')

// Passport config
require('../config/passport')(passport)

const authController = require('../controller/auth')

// Login Route
router.post('/login', authController.login)

// Protecting Refresh Token and Logout Routes
router.use(passport.authenticate('jwt', { session: false }))

// Change password Route
router.put('/password', authController.ubahPassword)

// Reset password by admin Route
router.put('/password/:idUser', authController.resetPassword)

// Refresh Token Route
router.post('/token', authController.token)

// Logout Route
router.post('/logout', authController.logout)

module.exports = router
