const { models } = require('../models/index')

const findData = async (obj, model) => {
  return await model.findOne({
    where: obj,
  })
}

module.exports = {
  checkDuplicate: async (req, res, next) => {
    const { email, nim, nip, nidk, nidn, role } = req.body

    // Check if email is already registered
    const emailExist = findData({ email }, models.User)
    if (emailExist) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      })
    }
    if (role === 'mahasiswa') {
      // Check if NIM is already registered
      const nimExist = findData({ nim }, models.Mahasiswa)
      if (nimExist) {
        return res.status(409).json({
          success: false,
          message: 'NIM already exists',
        })
      }
    }
    if (role === 'dosen') {
      const nipExist = findData({ nip }, models.Dosen)
      const nidkExist = findData({ nidk }, models.Dosen)
      const nidnExist = findData({ nidn }, models.Dosen)

      // Check if NIP is already registered
      if (nipExist) {
        return res.status(409).json({
          success: false,
          message: 'NIP already exists',
        })
      }
      // Check if NIDK is already registered
      if (nidkExist) {
        return res.status(409).json({
          success: false,
          message: 'NIDK already exists',
        })
      }
      // Check if NIDN is already registered
      if (nidnExist) {
        return res.status(409).json({
          success: false,
          message: 'NIDN already exists',
        })
      }
    }
    next()
  },
}
