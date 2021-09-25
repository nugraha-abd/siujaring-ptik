const Sequelize = require('sequelize')
const db = require('../config/db')
const KodeSeksi = require('./kode-seksi')
const Mahasiswa = require('./mahasiswa')

const relKodeSeksiMahasiswa = db.define('rel_kode_seksi_mahasiswa', {
  id_kosek: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    references: {
      model: KodeSeksi,
      key: id_kosek,
    },
  },
  id_mhs: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    references: {
      model: Mahasiswa,
      key: id_mhs,
    },
  },
  timestamps: true,
  createdAt: Sequelize.DATE,
  updatedAt: false,
  underscored: true,
})

module.exports = relKodeSeksiMahasiswa
