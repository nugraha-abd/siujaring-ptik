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
            'id_kosek',
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
}
