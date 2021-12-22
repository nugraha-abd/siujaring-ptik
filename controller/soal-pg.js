const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const data = await models.SoalPg.findAll({
        attributes: {
          exclude: ['id_soal', 'id_matkul', 'id_dosen', 'id_semester'],
        },
        where: {
          id_dosen: req.user.dosen.id_dosen,
        },
        include: [
          {
            model: models.MataKuliah,
            as: 'mata_kuliah',
            attributes: {
              exclude: ['id_matkul', 'created_at', 'updated_at'],
            },
          },
          {
            model: models.Dosen,
            as: 'dosen',
            attributes: {
              exclude: ['id_dosen', 'id_user', 'created_at', 'updated_at'],
            },
          },
          {
            model: models.Semester,
            as: 'semester',
            attributes: {
              exclude: ['id_semester', 'created_at', 'updated_at'],
            },
          },
        ],
      })

      if (data.length === 0) {
        return res.status(404).json({ message: 'Data soal tidak ditemukan' })
      }

      res.status(200).json({
        message: 'Data seluruh soal ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  post: async (req, res) => {
    try {
      // Filter image
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      if (req.limitFileSize) return res.status(400).send(req.limitFileSize)

      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const {
        id_matkul,
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
        kunci_jawaban,
        status_soal, // draf atau terbit
      } = req.body

      const {
        gambar_soal,
        gambar_jawaban_a,
        gambar_jawaban_b,
        gambar_jawaban_c,
        gambar_jawaban_d,
        gambar_jawaban_e,
      } = req.files

      const id_dosen = req.user.dosen.id_dosen

      const pathGambarSoal = gambar_soal ? gambar_soal[0].path : null
      const pathGambarJawabanA = gambar_jawaban_a
        ? gambar_jawaban_a[0].path
        : null
      const pathGambarJawabanB = gambar_jawaban_b
        ? gambar_jawaban_b[0].path
        : null
      const pathGambarJawabanC = gambar_jawaban_c
        ? gambar_jawaban_c[0].path
        : null
      const pathGambarJawabanD = gambar_jawaban_d
        ? gambar_jawaban_d[0].path
        : null
      const pathGambarJawabanE = gambar_jawaban_e
        ? gambar_jawaban_e[0].path
        : null

      const data = await models.SoalPg.create({
        id_dosen,
        id_matkul,
        soal,
        gambar_soal: pathGambarSoal,
        jawaban_a,
        gambar_jawaban_a: pathGambarJawabanA,
        jawaban_b,
        gambar_jawaban_b: pathGambarJawabanB,
        jawaban_c,
        gambar_jawaban_c: pathGambarJawabanC,
        jawaban_d,
        gambar_jawaban_d: pathGambarJawabanD,
        jawaban_e,
        gambar_jawaban_e: pathGambarJawabanE,
        kunci_jawaban,
        status_soal, // draf atau terbit
      })

      res.status(201).json({
        message: 'Berhasil menambahkan soal',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  put: async (req, res) => {
    try {
      // Filter image
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      if (req.limitFileSize) return res.status(400).send(req.limitFileSize)

      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const {
        id_matkul,
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
        kunci_jawaban,
        status_soal, // draf atau terbit
      } = req.body

      const {
        gambar_soal,
        gambar_jawaban_a,
        gambar_jawaban_b,
        gambar_jawaban_c,
        gambar_jawaban_d,
        gambar_jawaban_e,
      } = req.files

      const id = req.params.idSoal

      // Get images from database and delete from storage
      // if there are any updated images value
      const dataGambar = await models.SoalPg.findOne({
        where: { id_soal: id },
        attributes: [
          'gambar_soal',
          'gambar_jawaban_a',
          'gambar_jawaban_b',
          'gambar_jawaban_c',
          'gambar_jawaban_d',
          'gambar_jawaban_e',
        ],
      })

      // Delete the images
      for (const gambar in dataGambar) {
        if (dataGambar[gambar]) {
          const path = dataGambar[gambar]
          fs.unlinkSync(path)
        }
      }

      await models.SoalPg.update(
        {
          id_matkul,
          soal,
          gambar_soal: gambar_soal.path,
          jawaban_a,
          gambar_jawaban_a: gambar_jawaban_a.path,
          jawaban_b,
          gambar_jawaban_b: gambar_jawaban_b[0].path,
          jawaban_c,
          gambar_jawaban_c: gambar_jawaban_c[0].path,
          jawaban_d,
          gambar_jawaban_d: gambar_jawaban_d[0].path,
          jawaban_e,
          gambar_jawaban_e: gambar_jawaban_e[0].path,
          kunci_jawaban,
          status_soal, // draf atau terbit
        },
        { where: { id_soal: id } }
      )

      const data = await models.SoalPg.findOne({
        attributes: {
          exclude: ['id_soal', 'id_dosen', 'id_matkul', 'id_semester'],
        },
        include: [
          {
            model: models.MataKuliah,
            attributes: {
              exclude: ['id_mhs', 'id_user'],
            },
            where: { id_matkul },
          },
          {
            model: models.Dosen,
            as: 'dosen',
            attributes: {
              exclude: ['id_dosen', 'id_user'],
            },
            where: { id_dosen: req.user.dosen.id_dosen },
          },
          {
            model: models.Semester,
            as: 'semester',
            attributes: {
              exclude: ['id_semester'],
            },
            where: { id_semester: 'current_semester' },
          },
        ],
        where: { id_soal: id },
      })

      if (!data) {
        res.status(404).json({
          success: false,
          message: `Soal dengan id ${id} tidak ditemukan`,
        })
      }

      res.status(200).json({
        message: 'Berhasil mengubah data soal',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  delete: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const id = req.params.idSoal

      // Get images from database and delete from storage
      // if there are any updated images
      const dataGambar = await models.SoalPg.findOne({
        where: { id_soal: id },
        attributes: [
          'gambar_soal',
          'gambar_jawaban_a',
          'gambar_jawaban_b',
          'gambar_jawaban_c',
          'gambar_jawaban_d',
          'gambar_jawaban_e',
        ],
      })

      // Delete the images
      for (const gambar in dataGambar) {
        if (dataGambar[gambar]) {
          const path = dataGambar[gambar]
          fs.unlinkSync(path)
        }
      }

      await models.SoalPg.destroy({
        where: { id_soal: id },
      })

      res.status(204).json({
        message: `Berhasil menghapus data soal dengan id ${id}`,
        success: true,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  terbit: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const { status_soal } = req.body

      const id = req.params.idSoal

      await models.SoalPg.update(
        { status_soal: status_soal },
        { where: { id_soal: id } }
      )

      if (status_soal === 'terbit')
        res.status(200).json({
          message: `Berhasil menerbitkan soal dengan id ${id}`,
          success: true,
        })

      if (status_soal === 'draf')
        res.status(200).json({
          message: `Berhasil mengubah status soal dengan id ${id} menjadi draf`,
          success: true,
        })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
