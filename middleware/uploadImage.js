const path = require('path')

const multer = require('multer')

const imageFilter = (req, file, cb) => {
  // Allowed ext
  const fileTypes = /jpg|png/
  // CHeck file size
  const fileSize = parseInt(req.headers['content-length'])
  // Check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = fileTypes.test(file.mimetype)

  if (!extname && !mimetype) {
    req.fileValidationError = {
      success: false,
      message: 'Mohon unggah gambar dengan ekstensi jpg atau png',
    }
    return cb(
      new Error('Mohon unggah gambar dengan ekstensi jpg atau png'),
      false
    )
  }

  if (fileSize > 1024 * 1024 * 5) {
    req.limitFileSize = {
      success: false,
      message: 'Ukuran file maksimal adalah 5 MB',
    }
    return cb(new Error('Ukuran file maksimal adalah 5 MB'), false)
  }

  cb(null, true)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, '..', 'public', 'static', 'assets', 'uploads', 'img')
    )
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: imageFilter,
})

module.exports = uploadImage
