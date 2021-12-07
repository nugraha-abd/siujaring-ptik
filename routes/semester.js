const express = require('express')
const router = express.Router()

const semesterController = require('../controller/semester')

router
  .route('/')
  .get(semesterController.get)
  .post(semesterController.post)

module.exports = router
