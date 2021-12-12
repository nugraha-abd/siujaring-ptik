const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

const upload = require('../middleware/uploadCsv')

router
  .route('/')
  .post(userController.register)

router.get('/mahasiswa', userController.getMahasiswa)
router.get('/dosen', userController.getDosen)

router
  .route('/:idUser')
  .put(userController.put)

router.get('/profil', userController.getProfil)

// Import user dosen dan mahasiswa
router
  .post(
    '/import/dosen', 
    upload.single("file"), 
    userController.importDosen
  )

router
  .post(
    '/import/mahasiswa', 
    upload.single("file"), 
    userController.importMahasiswa
  )

module.exports = router
