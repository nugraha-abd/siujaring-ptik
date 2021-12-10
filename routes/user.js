const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router
  .route('/')
  .post(userController.register)

router.get('/mahasiswa', userController.getMahasiswa)
router.get('/dosen', userController.getDosen)

router
  .route('/:idUser')
  .put(userController.put)

router.get('/profil', userController.getProfil)

module.exports = router
