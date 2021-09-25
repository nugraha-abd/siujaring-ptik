const Sequelize = require('sequelize')
const db = require('../config/db')

const Semester = db.define('ref_semester', {
  id_semester: {
    type: Sequelize.INTEGER(3),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  semester: {
    type: Sequelize.STRING(5),
    unique: true,
  },
  timestamps: true,
  createdAt: Sequelize.DATE,
  updatedAt: false,
  underscored: true,
})

module.exports = Semester
