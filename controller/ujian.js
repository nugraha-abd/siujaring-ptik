const { Op } = require('sequelize')

const { models } = require('../models/index')

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: false,
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
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({
            message: 'Data ujian yang belum berjalan tidak ditemukan',
            success: false,
          })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang belum berjalan ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'dosen') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: false,
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
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({ message: 'Data ujian tidak ditemukan' })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

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
          aktif: false,
        })

        const getData = await models.PaketSoal.findAll({
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
                attributes: ['status_ujian'],
                where: {
                  status_ujian: 'belum',
                },
              },
            },
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({ message: 'Data ujian tidak ditemukan' })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
            mahasiswa: [
              {
                RelPaketSoalMahasiswa: { status_ujian },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            status_ujian,
            created_at,
            updated_at,
          }
        })

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
  getAktif: async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: true,
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
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({
            message: 'Data ujian yang sedang berjalan tidak ditemukan',
          })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sedang berjalan ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'dosen') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: true,
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
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({
            message: 'Data ujian yang sedang berjalan tidak ditemukan',
          })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sedang berjalan ditemukan',
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

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: true,
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
          ],
        })

        if (getData.length === 0) {
          return res.status(404).json({
            message: 'Data ujian yang sedang berjalan tidak ditemukan',
          })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sedang berjalan ditemukan',
          data: data,
        })
      }
    } catch (err) {
      console.error(err.message)
      res.sendStatus(500)
    }
  },
  getSelesai: async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
          where: {
            status_ujian: 'sudah',
          },
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: false,
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
                    [Op.gte]: 0,
                  },
                },
              },
            },
          ],
        })

        if (getData.length === 0) {
          return res
            .status(404)
            .json({ message: 'Data ujian yang sudah selesai tidak ditemukan' })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
            mahasiswa: [
              {
                RelPaketSoalMahasiswa: { nilai, status_ujian },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nilai,
            status_ujian,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sudah selesai ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'dosen') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
          where: {
            status_ujian: 'sudah',
          },
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: false,
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
                    [Op.gte]: 0,
                  },
                },
              },
            },
          ],
        })

        if (getData.length === 0) {
          return res
            .status(404)
            .json({ message: 'Data ujian yang sudah selesai tidak ditemukan' })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
            mahasiswa: [
              {
                RelPaketSoalMahasiswa: { nilai, status_ujian },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            nilai,
            status_ujian,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sudah selesai ditemukan',
          data: data,
        })
      }

      if (req.user.role === 'mahasiswa') {
        const getPaketSoalTerbit = await models.RelPaketSoalMahasiswa.findAll({
          attributes: ['id_paket'],
          where: {
            id_mhs: req.user.mahasiswa.id_mhs,
            status_ujian: 'sudah',
          },
        })

        const getData = await models.PaketSoal.findAll({
          attributes: {
            exclude: ['id_paket', 'status_paket'],
          },
          where: {
            id_paket: {
              [Op.in]: getPaketSoalTerbit.map((paket) => paket.id_paket),
            },
            aktif: false,
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
                attributes: ['nilai', 'status_ujian'],
                where: {
                  nilai: {
                    [Op.gte]: 0,
                  },
                },
              },
            },
          ],
        })

        if (getData.length === 0) {
          return res
            .status(404)
            .json({ message: 'Data ujian yang sudah selesai tidak ditemukan' })
        }

        const data = getData.map((item) => {
          const {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            created_at,
            updated_at,
            soal_pg: [
              {
                dosen: { nama_dosen },
              },
            ],
            kode_seksi: [
              {
                nomor_kosek,
                mata_kuliah: { nama_matkul },
              },
            ],
            mahasiswa: [
              {
                RelPaketSoalMahasiswa: { nilai, status_ujian },
              },
            ],
          } = item.dataValues

          return {
            kode_paket,
            jenis_ujian,
            tgl_mulai,
            waktu_mulai,
            durasi_soal,
            durasi_jeda_soal,
            durasi_paket,
            jml_soal,
            jml_soal_siap,
            aktif,
            nama_dosen: nama_dosen,
            mata_kuliah: nama_matkul,
            kode_seksi: nomor_kosek,
            nilai,
            status_ujian,
            created_at,
            updated_at,
          }
        })

        res.status(200).json({
          message: 'Data seluruh ujian yang sudah selesai ditemukan',
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

      const getData = await models.PaketSoal.findOne({
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
                'status_soal',
                'jml_digunakan',
                'jml_menjawab_benar',
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

      // if paket soal is not active
      if (getData.aktif === false) {
        return res.status(400).json({
          message: `Paket soal dengan id ${id} tidak aktif`,
        })
      }

      if (getData.length === 0) {
        return res
          .status(404)
          .json({ message: `Data ujian dengan id ${id} tidak ditemukan` })
      }

      const {
        kode_paket,
        jenis_ujian,
        tgl_mulai,
        waktu_mulai,
        durasi_soal,
        durasi_jeda_soal,
        durasi_paket,
        jml_soal,
        jml_soal_siap,
        aktif,
        kode_seksi: [
          {
            nomor_kosek,
            mata_kuliah: { nama_matkul },
          },
        ],
        soal_pg: [
          {
            dosen: { nama_dosen },
          },
        ],
      } = getData.dataValues

      const soal_pg = getData.dataValues.soal_pg.map((item) => {
        const {
          soal,
          gambar_soal,
          jawaban_a,
          gambar_jawaban_a,
          jawaban_b,
          gambar_jawaban_b,
          jawaban_c,
          gambar_jawaban_c,
          jawaban_d,
          gambar_jawaban_d,
          jawaban_e,
          gambar_jawaban_e,
          kunci_jawaban,
          RelSoalPaketSoal: { no_urut_soal },
        } = item.dataValues

        return {
          no_urut_soal,
          soal,
          gambar_soal,
          jawaban_a,
          gambar_jawaban_a,
          jawaban_b,
          gambar_jawaban_b,
          jawaban_c,
          gambar_jawaban_c,
          jawaban_d,
          gambar_jawaban_d,
          jawaban_e,
          gambar_jawaban_e,
          kunci_jawaban,
        }
      })

      const data = {
        kode_paket,
        jenis_ujian,
        tgl_mulai,
        waktu_mulai,
        durasi_soal,
        durasi_jeda_soal,
        durasi_paket,
        jml_soal,
        jml_soal_siap,
        aktif,
        nama_dosen: nama_dosen,
        mata_kuliah: nama_matkul,
        kode_seksi: nomor_kosek,
        soal_pg,
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

      const cekAktif = await models.PaketSoal.findOne({
        attributes: ['aktif'],
        where: {
          id_paket: req.params.idPaket,
        },
      })

      if (cekAktif.aktif === false) {
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
          status_ujian: 'sudah',
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
