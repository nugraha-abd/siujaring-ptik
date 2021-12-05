const express = require('express')
const router = express.Router()

const paketSoalController = require('../controller/paket-soal')

router
  .route('/')
  .get(paketSoalController.get)
  .post(paketSoalController.post)

router
  .route('/:idPaket')
  .put(paketSoalController.put)
  .delete(paketSoalController.delete)

module.exports = router
