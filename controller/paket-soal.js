const { Op } = require('sequelize')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      const data = await models.PaketSoal.findAll({
        attributes: {
          exclude: ['id_paket'],
        },
        include: [
          {
            model: models.KodeSeksi,
            as: 'kode_seksi',
            attributes: ['nomor_kosek'],
            // get mata kuliah name from tb_kode_seksi
            include: [
              {
                model: models.MataKuliah,
                as: 'mata_kuliah',
                attributes: ['nama_matkul'],
              },
              {
                model: models.Semester,
                as: 'semester',
                attributes: ['semester'],
              },
            ],
            through: {
              attributes: [],
            },
          },
          {
            model: models.SoalPg,
            as: 'soal_pg',
            attributes: {
              exclude: ['id_soal', 'id_dosen', 'id_matkul', 'id_semester'],
            },
            through: {
              attributes: [],
            },
          },
        ],
      })

      res.status(200).json({
        message: 'Data seluruh paket soal ditemukan',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  post: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const {
        id_kosek,
        kode_paket,
        jenis_ujian,
        tgl_mulai,
        waktu_mulai,
        durasi_soal,
        durasi_jeda_soal,
        durasi_paket,
        jml_soal,
        pilihan_tambah_soal,
      } = req.body

      // Opsi untuk menggenerate paket soal secara otomatis //
      // select n random Soal by id_matkul from Soal
      // const soal = await models.SoalPg.findAll({
      //   attribute: ['id_soal'],
      //   where: {
      //     id_matkul: req.params.idMatkul,
      //     status: 'terbit',
      //   },
      //   order: [models.Sequelize.fn('RANDOM')],
      //   limit: jml_soal,
      // })

      // generate paket soal
      const paketSoal = await models.PaketSoal.create({
        kode_paket,
        jenis_ujian,
        tgl_mulai,
        waktu_mulai,
        durasi_soal,
        durasi_jeda_soal,
        durasi_paket,
        jml_soal,
        jml_soal_siap: pilihan_tambah_soal.length,
        status: 'draf',
        aktif: false,
      })

      await models.RelKodeSeksiPaketSoal.create({
        id_kosek,
        id_paket: paketSoal.id_paket,
      })

      let seluruhSoal = []

      for (let i = 0; i < pilihan_tambah_soal.length; i++) {
        let soal = {
          id_paket: paketSoal.id_paket,
          id_soal: pilihan_tambah_soal[i],
        }
        seluruhSoal.push(soal)
      }

      await models.RelSoalPaketSoal.bulkCreate(seluruhSoal)

      const data = models.PaketSoal.findOne({
        attributes: {
          exclude: ['id_paket'],
        },
        include: [
          {
            model: models.KodeSeksi,
            as: 'kode_seksi',
            attributes: ['nomor_kosek'],
            // get mata kuliah name from tb_kode_seksi
            include: [
              {
                model: models.MataKuliah,
                as: 'mata_kuliah',
                attributes: ['nama_matkul'],
              },
            ],
            include: [
              {
                model: models.Semester,
                as: 'semester',
                attributes: ['semester'],
              },
            ],
            through: {
              attributes: [],
            },
          },
          {
            model: models.SoalPg,
            as: 'soal_pg',
            attributes: {
              exclude: ['id_soal', 'id_dosen', 'id_matkul', 'id_semester'],
            },
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id_paket: paketSoal.id_paket,
        },
      })

      res.status(201).json({
        message: 'Berhasil membuat paket soal baru',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  put: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const {
        id_kosek,
        jenis_ujian,
        tgl_mulai,
        waktu_mulai,
        durasi_soal,
        durasi_jeda_soal,
        durasi_paket,
        jml_soal,
        pilihan_tambah_soal,
        pilihan_hapus_soal,
      } = req.body

      const id = req.params.idPaket

      const findPaketSoal = await models.PaketSoal.findOne({
        where: {
          id_paket: id,
        },
      })

      if (!findPaketSoal)
        return res.status(404).json({
          message: `Paket soal dengan id ${id} tidak ditemukan`,
        })

      await models.RelKodeSeksiPaketSoal.update(
        {
          id_kosek,
        },
        {
          where: {
            id_paket: id,
          },
        }
      )

      let seluruhSoal = []

      // Insert soal into junction table
      for (let i = 0; i < pilihan_tambah_soal.length; i++) {
        let soal = {
          id_paket: id,
          id_soal: pilihan_tambah_soal[i],
        }
        seluruhSoal.push(soal)
      }

      await models.RelSoalPaketSoal.bulkCreate(seluruhSoal, {
        updateOnDuplicate: ['id_soal', 'id_paket'],
      })

      // Remove soal from junction table
      await models.RelSoalPaketSoal.destroy({
        where: {
          // where id paket equals to id and id_soal equals to pilihan_hapus_soal,
          id_paket: id,
          id_soal: {
            [Op.in]: pilihan_hapus_soal,
          },
        },
      })

      await models.PaketSoal.update(
        {
          jenis_ujian,
          tgl_mulai,
          waktu_mulai,
          durasi_soal,
          durasi_jeda_soal,
          durasi_paket,
          jml_soal,
          jml_soal_siap:
            findPaketSoal.jml_soal_siap +
            pilihan_tambah_soal.length -
            pilihan_hapus_soal.length,
          status: 'draf',
          aktif: false,
        },
        {
          where: {
            id_paket: id,
          },
        }
      )

      const data = models.PaketSoal.findOne({
        attributes: {
          exclude: ['id_paket'],
        },
        include: [
          {
            model: models.KodeSeksi,
            as: 'kode_seksi',
            attributes: ['nomor_kosek'],
            // get mata kuliah name from tb_kode_seksi
            include: [
              {
                model: models.MataKuliah,
                as: 'mata_kuliah',
                attributes: ['nama_matkul'],
              },
            ],
            include: [
              {
                model: models.Semester,
                as: 'semester',
                attributes: ['semester'],
              },
            ],
            through: {
              attributes: [],
            },
          },
          {
            model: models.SoalPg,
            as: 'soal_pg',
            attributes: {
              exclude: ['id_soal', 'id_dosen', 'id_matkul', 'id_semester'],
            },
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id_paket: id,
        },
      })

      res.status(200).json({
        message: `Berhasil mengubah isi soal paket soal dengan id ${id}`,
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

      const id = req.params.idPaket

      const findPaketSoal = await models.PaketSoal.findOne({
        where: {
          id_paket: id,
        },
      })

      if (!findPaketSoal)
        return res.status(404).json({
          message: `Paket soal dengan id ${id} tidak ditemukan`,
        })

      await models.PaketSoal.destroy({
        where: { id_paket: id },
      })

      await models.RelSoalPaketSoal.destroy({
        where: { id_paket: id },
      })

      await models.RelKodeSeksiPaketSoal.destroy({
        where: { id_paket: id },
      })

      res.status(204).json({
        message: `Berhasil menghapus data paket soal dengan id ${id}`,
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

      const id = req.params.idPaket // body atau params?

      // get id_soal from RelSoalPaketSoal where id_paket equals to id
      const soal = await models.RelSoalPaketSoal.findAll({
        attributes: ['id_paket', 'id_soal', 'no_urut_soal'],
        where: {
          id_paket: id,
        },
      })

      if (!soal)
        return res.status(404).json({
          message: `Paket soal dengan id ${id} tidak ditemukan`,
        })

      // get id_soal from soal where id_paket equals to soal.id_paket
      const dataSoal = await models.SoalPg.findAll({
        attributes: ['id_soal', 'jml_digunakan'],
        where: {
          id_soal: {
            [Op.in]: soal.map((item) => item.id_soal),
          },
        },
      })

      // increase the value of jml_digunakan on each soal by 1
      await models.SoalPg.update(
        { jml_digunakan: dataSoal.map((item) => item.jml_digunakan + 1) },
        {
          where: {
            id_soal: {
              [Op.in]: dataSoal.map((item) => item.id_soal),
            },
          },
        }
      )

      // update no_urut for each soal on RelSoalPaketSoal model
      for (let i = 0; i < soal.length; i++) {
        await models.RelSoalPaketSoal.update(
          { no_urut_soal: i + 1 },
          {
            where: {
              id_paket: id,
              id_soal: soal[i].id_soal,
            },
          }
        )
      }

      await models.PaketSoal.update(
        {
          status: 'terbit',
        },
        {
          where: { id_paket: id },
        }
      )

      res.status(200).json({
        message: `Berhasil menerbitkan paket soal dengan id ${id}`,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  generate: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const { id_kosek, pilihan_paket } = req.body

      const mhs = await models.RelKodeSeksiMahasiswa.findAll({
        attributes: ['id_mhs'],
        where: {
          id_kosek,
        },
      })

      // create a function that return an object that contains mapped array of pilihan paket to array
      // of mhs
      // expected result:
      // id_paket      id_mhs
      // 1             1
      // 2             2
      // 3             3
      // 1             4
      // 2             5
      // 3             6
      // 1             7
      // 2             8
      // 3             9
      // etc

      const paketMahasiswa = []

      mhs.forEach((value, i) => {
        let temp = {
          id_paket: pilihan_paket[i % pilihan_paket.length],
          id_mhs: value.id_mhs,
        }
        paketMahasiswa.push(temp)
      })

      const data = await models.RelPaketSoalMahasiswa.bulkCreate(paketMahasiswa)

      res.status(200).json({
        message: `Berhasil menghubungkan paket soal dengan mahasiswa dalam kode seksi dengan id ${id_kosek}`,
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  aktif: async (req, res) => {
    try {
      if (req.user.role !== 'dosen')
        return res.status(403).json({
          message: 'Anda bukan dosen',
        })

      const id = req.params.idPaket // body atau params?

      await models.PaketSoal.update(
        {
          aktif: true,
        },
        {
          where: { id_paket: id },
        }
      )

      res.status(200).json({
        message: `Berhasil mengaktifkan soal dengan id ${id}`,
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
