const fs = require('fs')
const path = require('path')

const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const csv = require('fast-csv')
const sequelize = require('../config/db')

const { models } = require('../models/index')

module.exports = {
  getDosen: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      const data = await models.User.findAll({
        attributes: {
          exclude: ['id_user', 'password'],
        },
        include: [
          {
            model: models.Dosen,
            as: 'dosen',
            attributes: {
              exclude: ['id_dosen', 'id_user'],
            },
            required: true,
          },
        ],
        where: {
          role: {
            [Op.not]: 'admin',
          },
        },
      })
      if (data.length === 0) {
        return res.status(404).json({ message: 'Data user tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data seluruh user dengan role dosen ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  getMahasiswa: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

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
            required: true,
          },
        ],
        where: {
          role: {
            [Op.not]: 'admin',
          },
        },
      })
      if (data.length === 0) {
        return res.status(404).json({ message: 'Data user tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data seluruh user dengan role mahasiswa ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  getProfil: async (req, res) => {
    try {
      if (req.user.role !== 'mahasiswa' && req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })

      const data = await models.User.findOne({
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
          id_user: req.user.id_user,
        },
      })
      if (data === null) {
        return res.status(404).json({ message: 'Data user tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data profil user ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  register: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

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

        const getUser = await models.User.findOne({
          attributes: {
            exclude: ['id_user'],
          },
          where: { id_user: id },
        })

        if (!getUser) {
          res.status(404).json({
            message: `User dengan id ${id} tidak ditemukan`,
            success: false,
          })
        }

        await models.User.update(
          {
            keterangan,
          },
          { where: { id_user: id } }
        )

        const data = await models.User.findOne({
          attributes: ['keterangan', 'updated_at'],
          where: { id_user: id },
        })

        res.status(200).json({
          message: `Berhasil mengubah keterangan akun dengan id user ${id}`,
          data: data,
        })
      }

      // Change no_telpon data
      else if (req.user.role == 'mahasiswa' || req.user.role == 'dosen') {
        const { no_telpon } = req.body

        const role =
          req.user.role == 'mahasiswa' ? models.Mahasiswa : models.Dosen

        const findData = await role.findOne({
          attributes: ['no_telpon', 'updated_at'],
          where: { id_user: id },
        })

        if (!findData) {
          res.status(404).json({
            success: false,
            message: `User dengan id ${id} tidak ditemukan`,
          })
        }

        await role.update(
          {
            no_telpon,
          },
          { where: { id_user: id } }
        )

        const data = await role.findOne({
          attributes: {
            exclude: ['id_user'],
          },
          where: { id_user: id },
        })

        res.status(200).json({
          message: `Berhasil mengubah nomor telpon dengan id user ${id}`,
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
  importDosen: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      if (req.file == undefined) {
        return res.status(400).json({
          message: 'Mohon unggah file csv',
          success: false,
        })
      }

      let bulkDosen = []

      let dir = path.join(
        __dirname,
        '..',
        'public',
        'static',
        'assets',
        'uploads',
        'csv',
        req.file.filename
      )

      fs.createReadStream(dir)
        .pipe(csv.parse({ headers: true }))
        .transform((data, next) => {
          next(null, {
            username: data.nip,
            role: data.role.toLowerCase(),
            password: bcrypt.hashSync(data.password, 10),
            keterangan: data.keterangan,
            email: data.email.toLowerCase(),
            dosen: {
              nama_dosen: data.nama_dosen,
              nip: data.nip,
              nidk: data.nidk,
              nidn: data.nidn,
              no_telpon: data.no_telpon,
            },
          })
        })
        .on('error', (err) => {
          fs.unlinkSync(dir)

          throw err
        })
        .on('data', (row) => {
          bulkDosen.push(row)
        })
        .on('end', () => {
          models.User.bulkCreate(bulkDosen, {
            include: [{ model: models.Dosen, as: 'dosen' }],
          })
            .then(() => {
              fs.unlinkSync(dir)

              res.status(200).json({
                message:
                  'Berhasil mengimport data dosen pada file ' +
                  req.file.originalname,
                success: true,
              })
            })
            .catch((error) => {
              fs.unlinkSync(dir)

              res.status(409).send({
                message: 'Terdapat data duplikat pada csv dengan database',
                error: error.message,
                success: false,
              })
            })
        })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  importMahasiswa: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      if (req.file == undefined) {
        return res.status(400).json({
          message: 'Mohon unggah file csv',
          success: false,
        })
      }

      let bulkMahasiswa = []

      let dir = path.join(
        __dirname,
        '..',
        'public',
        'static',
        'assets',
        'uploads',
        'csv',
        req.file.filename
      )

      fs.createReadStream(dir)
        .pipe(csv.parse({ headers: true }))
        .transform((data, next) => {
          next(null, {
            username: data.nim,
            role: data.role.toLowerCase(),
            password: bcrypt.hashSync(data.password, 10),
            keterangan: data.keterangan,
            email: data.email.toLowerCase(),
            mahasiswa: {
              nama_mhs: data.nama_mhs,
              nim: data.nim,
              no_telpon: data.no_telpon,
            },
          })
        })
        .on('error', (err) => {
          fs.unlinkSync(dir)

          throw err
        })
        .on('data', (row) => {
          bulkMahasiswa.push(row)
        })
        .on('end', () => {
          models.User.bulkCreate(bulkMahasiswa, {
            include: [{ model: models.Mahasiswa, as: 'mahasiswa' }],
          })
            .then(() => {
              fs.unlinkSync(dir)

              res.status(200).json({
                message:
                  'Berhasil mengimport data mahasiswa pada file ' +
                  req.file.originalname,
                success: true,
              })
            })
            .catch((error) => {
              fs.unlinkSync(dir)

              res.status(409).send({
                message: 'Terdapat data duplikat pada csv dengan database',
                error: error.message,
                success: false,
              })
            })
        })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
