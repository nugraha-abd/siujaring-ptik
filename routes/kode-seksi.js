const express = require('express')
const router = express.Router()

const kodeSeksiController = require('../controller/kode-seksi')

router
  .route('/')
  .get(kodeSeksiController.get)
  .post(kodeSeksiController.post)

router
  .route('/:idKodeSeksi')
  .put(kodeSeksiController.put)
  
// CRUD mahasiswa dan kode seksi
router
  .route('/:idKodeSeksi/mahasiswa')
  .post(kodeSeksiController.tambahMahasiswa)
  .delete(kodeSeksiController.hapusMahasiswa)

module.exports = router