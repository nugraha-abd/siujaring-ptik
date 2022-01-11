const express = require('express')
const router = express.Router()

const soalPgController = require('../controller/soal-pg')

const upload = require('../middleware/uploadImage')

router
  .route('/')
  .get(soalPgController.get)
  .post(
    upload.fields([
      { name: 'gambar_soal', maxCount: 1 }, 
      { name: 'gambar_jawaban_a', maxCount: 1 }, 
      { name: 'gambar_jawaban_b', maxCount: 1 }, 
      { name: 'gambar_jawaban_c', maxCount: 1 }, 
      { name: 'gambar_jawaban_d', maxCount: 1 }, 
      { name: 'gambar_jawaban_e', maxCount: 1 },
    ]),
    soalPgController.post
  )

router
  .route('/:idSoal')
  .get(soalPgController.getById)
  .put(
    upload.fields([
      { name: 'gambar_soal', maxCount: 1 }, 
      { name: 'gambar_jawaban_a', maxCount: 1 }, 
      { name: 'gambar_jawaban_b', maxCount: 1 }, 
      { name: 'gambar_jawaban_c', maxCount: 1 }, 
      { name: 'gambar_jawaban_d', maxCount: 1 }, 
      { name: 'gambar_jawaban_e', maxCount: 1 },
    ]),
    soalPgController.put)
  .delete(soalPgController.delete)

// Menerbitkan paket soal
router.post('/:idSoal/terbit', soalPgController.terbit)

module.exports = router
