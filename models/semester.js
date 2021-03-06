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
      semester: {
        type: Sequelize.STRING(4),
        unique: true,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      },
    },
    { tableName: 'ref_semester' }
  )
}
