const path = require('path')

const multer = require('multer')

const imageFilter = (req, file, cb) => {
  // Allowed ext
  const fileTypes = /csv/
  // CHeck file size
  const fileSize = parseInt(req.headers['content-length'])
  // Check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = fileTypes.test(file.mimetype)

  if (!extname && !mimetype) {
    req.fileValidationError = {
      success: false,
      message: 'Mohon unggah file dengan ekstensi csv',
    }
    return cb(new Error('Mohon unggah file dengan ekstensi csv'), false)
  }

  if (fileSize > 1024 * 1024 * 10) {
    req.limitFileSize = {
      success: false,
      message: 'Ukuran file maksimal adalah 10 MB',
    }
    return cb(new Error('Ukuran file maksimal adalah 10 MB'), false)
  }

  cb(null, true)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, '..', 'public', 'static', 'assets', 'uploads', 'csv')
    )
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const uploadCsv = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: imageFilter,
})

module.exports = uploadCsv
