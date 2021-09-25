const Sequelize = require('sequelize')
const db = require('../config/db')
const User = require('./user')

const Dosen = db.define('tb_dosen', {
  id_dosen: {
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
  nama_dosen: {
    type: Sequelize.STRING(100),
  },
  nip: {
    type: Sequelize.STRING(20),
    unique: true,
    allowNull: true,
  },
  nidn: {
    type: Sequelize.STRING(10),
    unique: true,
    allowNull: true,
  },
  nidk: {
    type: Sequelize.STRING(10),
    unique: true,
    allowNull: true,
  },
  no_telpon: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  underscored: true,
})

module.exports = Dosen
