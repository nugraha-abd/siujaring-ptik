const express = require('express')
const router = express.Router()

const checkDuplicate = require('../middleware/checkDuplicate')

const userController = require('../controller/user')

router
  .route('/')
  .get(userController.get)
  .post(checkDuplicate, userController.register)

router
  .route('/:idUser').put(userController.put)

module.exports = router
