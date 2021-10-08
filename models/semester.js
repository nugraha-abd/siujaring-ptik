const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'Semester',
    {
      id_semester: {
        type: Sequelize.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nomor_semester: {
        type: Sequelize.STRING(5),
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { tableName: 'ref_semester' }
  )
}
