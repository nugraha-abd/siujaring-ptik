const { fn, col, Op } = require('sequelize')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role !== 'admin')
        return res.status(403).json({
          message: 'Anda bukan admin',
        })

      const data = await models.MataKuliah.findAll({
        attributes: {
          exclude: ['id_matkul'],
        },
      })

      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: 'Data mata kuliah tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data seluruh mata kuliah ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  getSdgDiampu: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const currentSemester = await models.Semester.findAll({
        attributes: ['id_semester'],
        order: [['id_semester', 'DESC']],
        limit: 1,
      })

      const getMataKuliah = await models.KodeSeksi.findAll({
        attributes: [],
        where: {
          [Op.or]: [
            { id_dosen1: req.user.dosen.id_dosen },
            { id_dosen2: req.user.dosen.id_dosen },
            { id_dosen3: req.user.dosen.id_dosen },
          ],
          id_semester: currentSemester[0].id_semester,
        },
        include: [
          {
            model: models.MataKuliah,
            as: 'mata_kuliah',
            attributes: ['nama_matkul'],
            group: ['nama_matkul'],
          },
        ],
      })

      // get result from data and convert it to array
      const arrayMataKuliah = getMataKuliah.map(
        (item) => item.mata_kuliah.nama_matkul
      )

      // remove same value from array mata kuliah
      const data = [...new Set(arrayMataKuliah)]

      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: 'Data mata kuliah tidak ditemukan' })
      }

      res.status(200).json({
        message:
          `Data mata kuliah yang sedang diampu oleh dosen dengan ` +
          `id ${req.user.dosen.id_dosen} ditemukan`,
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

      const { kode_matkul, nama_matkul, sks } = req.body

      const data = await models.MataKuliah.create({
        kode_matkul,
        nama_matkul,
        sks,
      })

      res.status(201).json({
        message: 'Berhasil menambahkan mata kuliah',
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

      const { kode_matkul, nama_matkul, sks } = req.body

      const id = req.params.idMataKuliah // id atau kode?

      await models.MataKuliah.update(
        {
          kode_matkul,
          nama_matkul,
          sks,
        },
        { where: { id_matkul: id } }
      )

      const data = await models.MataKuliah.findOne({
        attributes: {
          exclude: ['id_user'],
        },
        where: { id_matkul: id },
      })

      if (!data) {
        res.status(404).json({
          success: false,
          message: `Mata kuliah dengan id ${id} tidak ditemukan`,
        })
      }

      res.status(200).json({
        message: 'Berhasil mengubah data mata kuliah',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
