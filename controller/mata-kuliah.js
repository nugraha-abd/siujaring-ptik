const MataKuliah = require('../models/mata-kuliah')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const data = await MataKuliah.findAll({
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
  post: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const { kode_matkul, nama_matkul, sks } = req.body

        const data = await MataKuliah.create({
          kode_matkul,
          nama_matkul,
          sks,
        })

        res.status(201).json({
          message: 'Berhasil menambahkan mata kuliah',
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
  put: async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        const { kode_matkul, nama_matkul, sks } = req.body

        const id = req.params.idMataKuliah

        await MataKuliah.update({
          kode_matkul,
          nama_matkul,
          sks,
        })

        const data = await MataKuliah.findOne({
          attributes: {
            exclude: ['id_user'],
          },
          where: { id_matkul: id },
        })

        res.status(200).json({
          message: 'Berhasil mengubah data mata kuliah',
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
}