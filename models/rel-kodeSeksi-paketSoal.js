const Sequelize = require('sequelize')
const db = require('../config/db')
const KodeSeksi = require('./kode-seksi')
const PaketSoal = require('./paket-soal')

const relKodeSeksiPaketSoal = db.define('kode_seksi_paket_soal', {
  id_kosek: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    references: {
      model: KodeSeksi,
      key: id_kosek,
    },
  },
  id_paket: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    references: {
      model: PaketSoal,
      key: id_paket,
    },
  },
  timestamps: true,
  createdAt: Sequelize.DATE,
  updatedAt: false,
  underscored: true,
})

module.exports = relKodeSeksiPaketSoal
