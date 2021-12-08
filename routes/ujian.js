const express = require('express')
const router = express.Router()

const ujianController = require('../controller/ujian')

router
  .route('/')
  .get(ujianController.get)

router
  .route('/:idPaket')
  .get(ujianController.getDetail)
  .put(ujianController.insertJawaban)

module.exports = router
