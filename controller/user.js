const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')

const User = require('../models/user')
const Mahasiswa = require('../models/mahasiswa')
const Dosen = require('../models/dosen')

module.exports = {
  get: async (req, res) => {},
  register: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const data = await sequelize.transaction(async (t) => {
          const userData = await User.create(
            {
              username: req.body.username,
              role: req.body.role,
              password: hashedPassword,
              keterangan: req.body.keterangan,
              email: req.body.email,
            },
            { transaction: t }
          )

          // Insert into Mahasiswa model
          let mahasiswa = {}
          if (req.body.role === 'mahasiswa') {
            mahasiswa = await Mahasiswa.create(
              {
                id_user: userData.id_user,
                nama_mhs: req.body.nama_mhs,
                nim: req.body.nim,
                no_telpon: req.body.no_telpon,
              },
              { transaction: t }
            )
          }

          // Insert into Dosen model
          let dosen = {}
          if (req.body.role === 'dosen') {
            dosen = await Dosen.create(
              {
                id_user: userData.id_user,
                nama_dosen: req.body.nama_dosen,
                nip: req.body.nip,
                nidk: req.body.nidk,
                nidn: req.body.nidn,
                no_telpon: req.body.no_telpon,
              },
              { transaction: t }
            )
          }
          const result = { ...userData, ...mahasiswa, ...dosen }

          return result
        })

        res.status(201).json({
          message: 'Berhasil membuat akun',
          data: data,
        })
      } else {
        return res.status(403).json({
          message: 'Anda bukan admin',
        })
      }
    } catch (err) {
      if (err.message === 'Validation error') {
        return res.status(400).json({
          success: false,
          message: err.errors.map((e) => e.message),
        })
      } else {
        console.error(err.message)
        res.sendStatus(500)
      }
    }
  },
}
