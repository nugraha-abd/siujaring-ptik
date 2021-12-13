const express = require('express')
const router = express.Router()

const upload = require('../middleware/uploadCsv')
const mataKuliahController = require('../controller/mata-kuliah')

router
  .route('/')
  .get(mataKuliahController.get)
  .post(mataKuliahController.post)

router
  .route('/:idMataKuliah')
  .put(mataKuliahController.put)

router.get('/diampu', mataKuliahController.getSdgDiampu)

router
  .post(
    '/import', 
    upload.single("file"), 
    mataKuliahController.importMataKuliah
  )

module.exports = router
