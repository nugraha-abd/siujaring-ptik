const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const data = await models.User.findAll({
          attributes: {
            exclude: ['id_user', 'password'],
          },
          include: [
            {
              model: models.Mahasiswa,
              as: 'mahasiswa',
              attributes: {
                exclude: ['id_mhs', 'id_user'],
              },
              required: false,
            },
            {
              model: models.Dosen,
              as: 'dosen',
              attributes: {
                exclude: ['id_dosen', 'id_user'],
              },
              required: false,
            },
          ],
          where: {
            role: {
              [Op.not]: 'admin',
            },
          },
          limit: 3,
        })
        if (data.length === 0) {
          return res.status(404).json({ message: 'Data user tidak ditemukan' })
        }

        res.status(200).json({
          message: 'Data seluruh user ditemukan',
          data: data,
        })
      } else {
        return res.status(403).json({
          message: 'Anda bukan admin',
        })
      }
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  register: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const {
          role,
          keterangan,
          email,
          nama_mhs,
          nim,
          nama_dosen,
          nip,
          nidk,
          nidn,
          no_telpon,
        } = req.body

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const data = await sequelize.transaction(async (t) => {
          const user = await models.User.create(
            {
              username: req.body.role == 'mahasiswa' ? nim : nip,
              role: role.toLowerCase(),
              password: hashedPassword,
              keterangan,
              email: email.toLowerCase(),
            },
            { transaction: t }
          )

          let biodata = {}

          // Insert into Mahasiswa model
          if (req.body.role === 'mahasiswa') {
            biodata = await models.Mahasiswa.create(
              {
                id_user: user.id_user,
                nama_mhs,
                nim,
                no_telpon,
              },
              { transaction: t }
            )
            return { user, biodata }
          }

          // Insert into Dosen model
          if (req.body.role === 'dosen') {
            biodata = await models.Dosen.create(
              {
                id_user: user.id_user,
                nama_dosen,
                nip,
                nidk,
                nidn,
                no_telpon,
              },
              { transaction: t }
            )
            return { user, biodata }
          }
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
  put: async (req, res) => {
    try {
      const id = req.params.idUser

      // Change keterangan data
      if (req.user.role == 'admin') {
        const { keterangan } = req.body

        await models.User.update(
          {
            keterangan,
          },
          { where: { id_user: id } }
        )

        const data = await models.User.findOne({
          attributes: {
            exclude: ['id_user'],
          },
          where: { id_user: id },
        })

        if (!data) {
          res.status(404).json({
            success: false,
            msg: `User dengan id ${id} tidak ditemukan`,
          })
        }

        res.status(200).json({
          message: 'Berhasil mengubah keterangan akun',
          data: data,
        })
      }

      // Change no_telpon data
      else if (req.user.role == 'mahasiswa' || req.user.role == 'dosen') {
        const { no_telpon } = req.body

        const role =
          req.user.role == 'mahasiswa' ? models.Mahasiswa : models.Dosen

        await role.update(
          {
            no_telpon,
          },
          { where: { id_user: id } }
        )

        const data = await role.findOne({
          attributes: ['no_telpon', 'updated_at'],
          where: { id_user: id },
        })

        if (!data) {
          res.status(404).json({
            success: false,
            msg: `User dengan id ${id} tidak ditemukan`,
          })
        }

        res.status(200).json({
          message: 'Berhasil mengubah nomor telpon',
          data: data,
        })
      } else {
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })
      }
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
