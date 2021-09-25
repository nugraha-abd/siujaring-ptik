const Sequelize = require('sequelize')
const db = require('../config/db')
const KodeSeksi = require('./kode-seksi')

const JenisUjian = db.define('ref_jenis_ujian', {
  id_jenis_ujian: {
    type: Sequelize.INTEGER(3),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_kosek: {
    type: Sequelize.INTEGER(5),
    references: {
      model: KodeSeksi,
      key: id_kosek,
    },
  },
  role: {
    type: Sequelize.ENUM('uts', 'uas', 'kuis'),
  },
  timestamps: true,
  createdAt: Sequelize.DATE,
  updatedAt: false,
  underscored: true,
})

module.exports = JenisUjian
