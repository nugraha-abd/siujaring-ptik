const express = require('express')
const router = express.Router()

const paketSoalController = require('../controller/paket-soal')

router
  .route('/')
  .get(paketSoalController.get)
  .post(paketSoalController.post)

router
  .route('/:idPaket')
  .get(paketSoalController.getById)
  .put(paketSoalController.put)
  .delete(paketSoalController.delete)

// Menerbitkan paket soal
router.put('/:idPaket/terbit', paketSoalController.terbit)

// Mengaktifkan paket soal
router.put('/:idPaket/aktif', paketSoalController.aktif)

// Menghubungkan paket soal dengan mahasiswa
router.post('/generate', paketSoalController.generate)


module.exports = router
