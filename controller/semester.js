const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      const data = await models.Semester.findAll()
      res.status(200).json({
        message: 'Data semester ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  post: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      // create a controller that automatically insert new semester
      // into the database
      // without any request body
      // default value for semester is the last semester value in the database
      // and increment it by 1
      const lastSemester = await models.Semester.findAll({
        attributes: {
          exclude: ['id_semester'],
        },
        order: [['id_semester', 'DESC']],
        limit: 1,
      })

      const semester = (parseInt(lastSemester[0].semester) + 1).toString()

      const data = await models.Semester.create({
        semester,
      })

      res.status(201).json({
        message: 'Berhasil menambahkan semester',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
