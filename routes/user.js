const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router
  .route('/')
  .get(userController.get)
  .post(userController.register)

router
  .route('/:idUser').put(userController.put)

module.exports = router
