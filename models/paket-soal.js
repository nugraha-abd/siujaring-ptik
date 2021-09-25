const Sequelize = require('sequelize')
const db = require('../config/db')
const JenisUjian = require('./jenis-ujian')
const KodeSeksi = require('./kode-seksi')

const PaketSoal = db.define('tb_paket_soal', {
  id_paket: {
    type: Sequelize.INTEGER(5),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_jenis_ujian: {
    type: Sequelize.INTEGER(3),
    references: {
      model: JenisUjian,
      key: id_jenis_ujian,
    },
  },
  id_kosek: {
    type: Sequelize.INTEGER(5),
    references: {
      model: KodeSeksi,
      key: id_kosek,
    },
  },
  kode_paket: {
    type: Sequelize.STRING(15),
    unique: true,
  },
  tgl_mulai: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  waktu_mulai: {
    type: Sequelize.TIME,
  },
  durasi_soal: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  durasi_jeda_soal: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  durasi_paket: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  jml_soal: {
    type: Sequelize.INTEGER(3),
  },
  jml_soal_siap: {
    type: Sequelize.INTEGER(3),
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('draf', 'terbit'),
    allowNull: true,
  },
  aktif: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = PaketSoal
