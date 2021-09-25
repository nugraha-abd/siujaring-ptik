const Sequelize = require('sequelize')
const db = require('../config/db')
const Dosen = require('./dosen')
const MataKuliah = require('./mata-kuliah')
const Semester = require('./semester')

const KodeSeksi = db.define('ref_kode_seksi', {
  id_kosek: {
    type: Sequelize.INTEGER(5),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_matkul: {
    type: Sequelize.INTEGER(2),
    references: {
      model: MataKuliah,
      key: id_matkul,
    },
  },
  id_dosen1: {
    type: Sequelize.INTEGER(4),
    references: {
      model: Dosen,
      key: id_dosen,
    },
  },
  id_dosen2: {
    type: Sequelize.INTEGER(4),
    allowNull: true,
    references: {
      model: Dosen,
      key: id_dosen,
    },
  },
  id_dosen3: {
    type: Sequelize.INTEGER(4),
    allowNull: true,
    references: {
      model: Dosen,
      key: id_dosen,
    },
  },
  id_semester: {
    type: Sequelize.INTEGER(3),
    references: {
      model: Semester,
      key: id_semester,
    },
  },
  nomor_kosek: {
    type: Sequelize.STRING(20),
    unique: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = KodeSeksi
