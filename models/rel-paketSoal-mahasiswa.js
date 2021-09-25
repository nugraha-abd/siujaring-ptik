const Sequelize = require('sequelize')
const db = require('../config/db')
const Mahasiswa = require('./mahasiswa')
const PaketSoal = require('./paket-soal')

const relSoalPaketSoal = db.define('rel_soal_paket_soal', {
  id_paket: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    references: {
      model: PaketSoal,
      key: id_paket,
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
  nilai: {
    type: Sequelize.INTEGER(3),
    allowNull: true,
  },
  no_urut_soal: {
    type: Sequelize.INTEGER(2),
    allowNull: true,
  },
  no_urut_soal: {
    type: Sequelize.INTEGER(2),
    allowNull: true,
  },
  timestamps: true,
  createdAt: Sequelize.DATE,
  updatedAt: false,
  underscored: true,
})

module.exports = relSoalPaketSoal
