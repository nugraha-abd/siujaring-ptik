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

// Menerbitkan paket soal
router.post('/:idPaket/terbit', paketSoalController.terbit)

// Mengaktifkan paket soal
router.post('/:idPaket/aktif', paketSoalController.aktif)

// Menghubungkan paket soal dengan mahasiswa
router.post('/generate', paketSoalController.generate)


module.exports = router
