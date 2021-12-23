const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')

const { Op } = require('sequelize')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })

      // TO DO
      // get the data from relation table
      const data = await models.KodeSeksi.findAll({
        attributes: {
          exclude: [
            'id_matkul',
            'id_dosen1',
            'id_dosen2',
            'id_dosen3',
            'id_semester',
          ],
        },
        include: [
          {
            model: models.MataKuliah,
            as: 'mata_kuliah',
            attributes: {
              exclude: ['id_matkul'],
            },
          },
          {
            model: models.Dosen,
            as: 'dosen1',
            attributes: {
              exclude: ['id_dosen', 'id_user'],
            },
          },
          {
            model: models.Dosen,
            as: 'dosen2',
            attributes: {
              exclude: ['id_dosen', 'id_user'],
            },
          },
          {
            model: models.Dosen,
            as: 'dosen3',
            attributes: {
              exclude: ['id_dosen', 'id_user'],
            },
          },
          {
            model: models.Semester,
            as: 'semester',
            attributes: {
              exclude: ['id_semester'],
            },
          },
        ],
      })

      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: 'Data kode seksi tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data seluruh kode seksi ditemukan',
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

      const {
        id_matkul,
        id_dosen1,
        id_dosen2,
        id_dosen3,
        id_semester,
        nomor_kosek,
      } = req.body

      const data = await models.KodeSeksi.create({
        id_matkul,
        id_dosen1,
        id_dosen2,
        id_dosen3,
        id_semester, // set default value
        nomor_kosek,
      })

      res.status(201).json({
        message: 'Berhasil menambahkan kode seksi',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  put: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      const {
        id_matkul,
        id_dosen1,
        id_dosen2,
        id_dosen3,
        id_semester,
        nomor_kosek,
      } = req.body

      const id = req.params.idKodeSeksi // id atau kode?

      await models.KodeSeksi.update(
        {
          id_matkul,
          id_dosen1,
          id_dosen2,
          id_dosen3,
          id_semester, // set default value
          nomor_kosek,
        },
        { where: { id_kosek: id } }
      )

      const data = await models.KodeSeksi.findOne({
        attributes: {
          exclude: ['id_user'],
        },
        where: { id_kosek: id },
      })

      res.status(200).json({
        message: 'Berhasil mengubah data kode seksi',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  tambahMahasiswa: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      const { pilihan_mahasiswa } = req.body

      const id = req.params.idKodeSeksi // id atau kode?

      let seluruhMahasiswa = []

      for (let i = 0; i < pilihan_mahasiswa.length; i++) {
        let mahasiswa = {
          id_kosek: id,
          id_mhs: pilihan_mahasiswa[i],
        }
        seluruhMahasiswa.push(mahasiswa)
      }

      const data = await models.RelKodeSeksiMahasiswa.bulkCreate(
        seluruhMahasiswa
      )

      res.status(200).json({
        message: `Berhasil menambahkan mahasiswa ke dalam kode seksi dengan id ${id}`,
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  hapusMahasiswa: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      const id = req.params.idKodeSeksi // id atau kode?
      const { pilihan_mahasiswa } = req.body

      await models.RelKodeSeksiMahasiswa.destroy({
        where: {
          [Op.and]: [{ id_kosek: id }, { id_mhs: pilihan_mahasiswa }],
        },
      })

      res.status(204).json({
        message: `Berhasil menghapus mahasiswa dari kode seksi dengan id ${id}`,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  importKodeSeksi: async (req, res) => {
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

      let bulkKodeSeksi = []
      let promise

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
        .on('error', (err) => {
          fs.unlinkSync(dir)

          throw err
        })
        .on('data', (row) => {
          const idMatkul = models.MataKuliah.findOne({
            attributes: ['id_matkul'],
            where: {
              nama_matkul: row.nama_matkul,
            },
          })
          const idDosen1 = models.Dosen.findOne({
            attributes: ['id_dosen'],
            where: {
              nip: row.nip_dosen1,
            },
          })
          const idDosen2 = models.Dosen.findOne({
            attributes: ['id_dosen'],
            where: {
              nip: row.nip_dosen2,
            },
          })
          const idDosen3 = models.Dosen.findOne({
            attributes: ['id_dosen'],
            where: {
              nip: row.nip_dosen3,
            },
          })
          const idSemester = models.Semester.findOne({
            attributes: ['id_semester'],
            where: {
              semester: row.semester,
            },
          })
          promise = Promise.all([
            idMatkul,
            idDosen1,
            idDosen2,
            idDosen3,
            idSemester,
          ]).then((val) => {
            const kodeSeksi = {
              id_matkul: val[0].id_matkul,
              id_dosen1: val[1].id_dosen,
              id_dosen2: val[2] ? val[2].id_dosen : null,
              id_dosen3: val[3] ? val[3].id_dosen : null,
              id_semester: val[4].id_semester,
              nomor_kosek: row.nomor_kosek,
            }
            bulkKodeSeksi.push(kodeSeksi)
          })
        })
        .on('end', () => {
          promise.then(() => {
            models.KodeSeksi.bulkCreate(bulkKodeSeksi)
              .then(() => {
                fs.unlinkSync(dir)

                res.status(200).json({
                  message:
                    'Berhasil mengimport data kode seksi pada file ' +
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
        })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  importKodeSeksiMahasiswa: async (req, res) => {
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

      let bulkKodeSeksiMahasiswa = []
      let promise

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
        .on('error', (err) => {
          fs.unlinkSync(dir)

          throw err
        })
        .on('data', (row) => {
          const idKosek = models.KodeSeksi.findOne({
            attributes: ['id_kosek'],
            where: {
              nomor_kosek: row.nomor_kosek,
            },
          })
          const idMhs = models.Mahasiswa.findOne({
            attributes: ['id_mhs'],
            where: {
              nim: row.nim,
            },
          })
          promise = Promise.all([idKosek, idMhs]).then((val) => {
            const kodeSeksiMahasiswa = {
              id_kosek: val[0].id_kosek,
              id_mhs: val[1].id_mhs,
            }
            bulkKodeSeksiMahasiswa.push(kodeSeksiMahasiswa)
          })
        })
        .on('end', () => {
          promise.then(() => {
            models.RelKodeSeksiMahasiswa.bulkCreate(bulkKodeSeksiMahasiswa)
              .then(() => {
                fs.unlinkSync(dir)

                res.status(200).json({
                  message:
                    'Berhasil mengimport data mahasiswa ke dalam kode seksi pada file ' +
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
        })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
