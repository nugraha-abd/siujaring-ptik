const express = require('express')
const router = express.Router()

const upload = require('../middleware/uploadCsv')

const kodeSeksiController = require('../controller/kode-seksi')

router
  .route('/')
  .get(kodeSeksiController.get)
  .post(kodeSeksiController.post)

router
  .route('/:idKodeSeksi')
  .put(kodeSeksiController.put)

// Import data mahasiswa ke dalam kode seksi
router
.post(
  '/import/mahasiswa',
  upload.single("file"),
  kodeSeksiController.importKodeSeksiMahasiswa
)

// CRUD mahasiswa dan kode seksi
router
  .route('/:idKodeSeksi/mahasiswa')
  .post(kodeSeksiController.tambahMahasiswa)
  .delete(kodeSeksiController.hapusMahasiswa)

// Import kode seksi
router
  .post(
    '/import',
    upload.single("file"),
    kodeSeksiController.importKodeSeksi
  )

module.exports = router