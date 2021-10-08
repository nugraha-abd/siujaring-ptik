const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'JenisUjian',
    {
      id_jenis_ujian: {
        type: Sequelize.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_kosek: {
        type: Sequelize.INTEGER(5),
      },
      role: {
        type: Sequelize.ENUM('uts', 'uas', 'kuis'),
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
    },
    { tableName: 'ref_jenis_ujian' }
  )
}
