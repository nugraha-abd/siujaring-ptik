const Sequelize = require('sequelize')
const db = require('../config/db')

const MataKuliah = db.define('ref_mata_kuliah', {
  id_matkul: {
    type: Sequelize.INTEGER(2),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  kode_matkul: {
    type: Sequelize.STRING(8),
    unique: true,
  },
  nama_matkul: {
    type: Sequelize.STRING(80),
  },
  sks: {
    type: Sequelize.INTEGER(1),
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = MataKuliah
