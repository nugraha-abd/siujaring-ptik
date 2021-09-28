const Sequelize = require('sequelize')
const db = require('../config/db')

const Mahasiswa = require('./mahasiswa')
const Dosen = require('./dosen')

const User = db.define('tb_user', {
  id_user: {
    type: Sequelize.INTEGER(4),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    defaultValue: null,
  },
  username: {
    type: Sequelize.STRING(15),
    unique: true,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('dosen', 'mahasiswa', 'admin'),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  keterangan: {
    type: Sequelize.STRING(256),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
})

User.hasOne(Mahasiswa)
User.hasOne(Dosen)

module.exports = User
