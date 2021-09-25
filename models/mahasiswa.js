const Sequelize = require('sequelize')
const db = require('../config/db')
const User = require('./user')

const Mahasiswa = db.define('tb_mahasiswa', {
  id_mhs: {
    type: Sequelize.INTEGER(4),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_user: {
    type: Sequelize.INTEGER(4),
    references: {
      model: User,
      key: id_user,
    },
  },
  nama_mhs: {
    type: Sequelize.STRING(100),
  },
  nim: {
    type: Sequelize.STRING(15),
    unique: true,
  },
  no_telpon: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = Mahasiswa
