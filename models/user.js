const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define('tb_user', {
  id_user: {
    type: Sequelize.INTEGER(4),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(15),
    unique: true,
  },
  role: {
    type: Sequelize.ENUM('dosen', 'mahasiswa', 'admin'),
  },
  password: {
    type: Sequelize.STRING(30),
  },
  keterangan: {
    type: Sequelize.STRING(256),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(100),
    unique: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = User
