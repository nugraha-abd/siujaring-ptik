const { Op } = require('sequelize')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (
        req.user.role !== 'admin' &&
        req.user.role !== 'dosen' &&
        req.user.role !== 'mahasiswa'
      )
        return res.status(403).json({ message: 'Anda tidak memiliki akses' })

      if (req.user.role === 'admin') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const data = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
          },
          include: [
            {
              model: models.SoalPg,
              as: 'soal_pg',
              attributes: ['id_soal'],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: models.Dosen,
                  as: 'dosen',
                  attributes: ['nama_dosen'],
                },
              ],
            },
            {
              model: models.KodeSeksi,
              as: 'kode_seksi',
              attributes: ['nomor_kosek'],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: models.MataKuliah,
                  as: 'mata_kuliah',
                  attributes: ['nama_matkul'],
                },
              ],
            },
            {
              model: models.Mahasiswa,
              as: 'mahasiswa',
              attributes: ['id_mhs'],
              through: {
                attributes: ['nilai'],
                where: {
                  nilai: {
                    [Op.ne]: null,
                  },
                },
              },
            },
          ],
        })

        if (data.length === 0) {
          return res.status(404).json({ message: 'Data ujian tidak ditemukan' })
        }

        res.status(200).json({
          message: 'Data seluruh ujian ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'dosen') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const data = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
          },
          include: [
            {
              model: models.SoalPg,
              as: 'soal_pg',
              attributes: ['id_soal'],
              where: {
                id_dosen: req.user.dosen.id_dosen,
              },
              include: [
                {
                  model: models.Dosen,
                  as: 'dosen',
                  attributes: ['nama_dosen'],
                },
              ],
            },
            {
              model: models.KodeSeksi,
              as: 'kode_seksi',
              attributes: ['nomor_kosek'],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: models.MataKuliah,
                  as: 'mata_kuliah',
                  attributes: ['nama_matkul'],
                },
              ],
            },
            {
              model: models.Mahasiswa,
              as: 'mahasiswa',
              attributes: ['id_mhs'],
              through: {
                attributes: ['nilai'],
                where: {
                  nilai: {
                    [Op.ne]: null,
                  },
                },
              },
            },
          ],
        })

        if (data.length === 0) {
          return res.status(404).json({ message: 'Data ujian tidak ditemukan' })
        }

        res.status(200).json({
          message: 'Data seluruh ujian ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'mahasiswa') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
          where: {
            id_mhs: req.user.mahasiswa.id_mhs,
          },
        })

        const data = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
          },
          include: [
            {
              model: models.SoalPg,
              as: 'soal_pg',
              attributes: ['id_soal'],
              include: [
                {
                  model: models.Dosen,
                  as: 'dosen',
                  attributes: ['nama_dosen'],
                },
              ],
            },
            {
              model: models.KodeSeksi,
              as: 'kode_seksi',
              attributes: ['nomor_kosek'],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: models.MataKuliah,
                  as: 'mata_kuliah',
                  attributes: ['nama_matkul'],
                },
              ],
            },
            {
              model: models.Mahasiswa,
              as: 'mahasiswa',
              attributes: ['id_mhs'],
              through: {
                attributes: ['nilai'],
                where: {
                  nilai: {
                    [Op.ne]: null,
                  },
                },
              },
            },
          ],
        })

        if (data.length === 0) {
          return res.status(404).json({ message: 'Data ujian tidak ditemukan' })
        }

        res.status(200).json({
          message: 'Data seluruh ujian ditemukan',
          data: data,
        })
      }
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  getDetail: async (req, res) => {
    try {
      if (req.user.role !== 'mahasiswa')
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })

      const id = req.params.idPaket

      const data = await models.PaketSoal.findAll({
        attributes: {
          exclude: ['id_paket', 'status_paket'],
        },
        where: {
          id_paket: id,
        },
        include: [
          {
            model: models.KodeSeksi,
            as: 'kode_seksi',
            attributes: ['nomor_kosek'],
            through: {
              attributes: [],
            },
            include: [
              {
                model: models.MataKuliah,
                as: 'mata_kuliah',
                attributes: ['nama_matkul'],
              },
            ],
          },
          {
            model: models.SoalPg,
            as: 'soal_pg',
            attributes: {
              exclude: [
                'id_soal',
                'id_dosen',
                'id_matkul',
                'id_semester',
                'created_at',
                'updated_at',
              ],
            },
            through: {
              attributes: ['no_urut_soal'],
            },
            include: [
              {
                model: models.Dosen,
                as: 'dosen',
                attributes: ['nama_dosen'],
              },
            ],
          },
        ],
      })

      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: `Data ujian dengan id ${id} tidak ditemukan` })
      }

      res.status(200).json({
        message: `Data detail ujian dengan id ${id} ditemukan`,
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  insertJawaban: async (req, res) => {
    try {
      if (req.user.role !== 'mahasiswa')
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })

      const { jawaban_mhs } = req.body

      const aktif = await models.PaketSoal.findOne({
        attributes: ['aktif'],
        where: {
          id_paket: req.params.idPaket,
        },
      })

      if (aktif.aktif === false) {
        return res.status(400).json({
          message: 'Ujian sedang tidak aktif',
        })
      }

      const id = req.params.idPaket

      await models.RelPaketSoalMahasiswa.update(
        {
          jawaban_mhs,
        },
        {
          where: { id_paket: id, id_mhs: req.user.mahasiswa.id_mhs },
        }
      )

      const data = await models.RelPaketSoalMahasiswa.findOne({
        attributes: ['jawaban_mhs'],
        where: { id_paket: id, id_mhs: req.user.mahasiswa.id_mhs },
      })

      res.status(200).json({
        message: 'Berhasil memasukkan pilihan jawaban',
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  hitungNilai: async (req, res) => {
    try {
      if (req.user.role !== 'mahasiswa')
        return res.status(403).json({
          message: 'Anda tidak memiliki akses',
        })

      const id = req.params.idPaket

      const getJawabanMhs = await models.RelPaketSoalMahasiswa.findOne({
        attributes: ['jawaban_mhs'],
        where: { id_paket: id, id_mhs: req.user.mahasiswa.id_mhs },
      })

      if (getJawabanMhs === null) {
        return res
          .status(404)
          .json({ message: `Data nilai dengan id ${id} tidak ditemukan` })
      }

      const getSoal = await models.RelSoalPaketSoal.findAll({
        attributes: ['id_soal'],
        where: {
          id_paket: id,
        },
      })

      const getKunciJawaban = await models.SoalPg.findAll({
        attributes: ['id_soal', 'kunci_jawaban', 'jml_menjawab_benar'],
        where: {
          id_soal: {
            [Op.in]: getSoal.map((soal) => soal.id_soal),
          },
        },
      })

      let jawabanBenar = 0

      // creates an algorithm to get jumlah jawaban benar
      getJawabanMhs.jawaban_mhs.split('').forEach(async (jawaban, i) => {
        if (
          jawaban.toUpperCase() ==
          getKunciJawaban[i].kunci_jawaban.toUpperCase()
        ) {
          jawabanBenar++

          // update jml_menjawab_benar on soalpg table
          await models.SoalPg.update(
            {
              jml_menjawab_benar: getKunciJawaban[i].jml_menjawab_benar + 1,
            },
            {
              where: {
                id_soal: getKunciJawaban[i].id_soal,
              },
            }
          )
        }
      })

      const nilai = (jawabanBenar / getKunciJawaban.length) * 100

      await models.RelPaketSoalMahasiswa.update(
        {
          nilai: nilai,
          jawaban_benar: jawabanBenar,
          jawaban_salah: getKunciJawaban.length - jawabanBenar,
        },
        {
          where: { id_paket: id, id_mhs: req.user.mahasiswa.id_mhs },
        }
      )

      const data = await models.RelPaketSoalMahasiswa.findOne({
        attributes: ['nilai', 'jawaban_benar', 'jawaban_salah'],
        where: { id_paket: id, id_mhs: req.user.mahasiswa.id_mhs },
      })

      res.status(200).json({
        message: `Data nilai dengan id ${id} ditemukan`,
        data: data,
      })
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
}
