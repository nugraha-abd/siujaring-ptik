const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'KodeSeksi',
    {
      id_kosek: {
        type: Sequelize.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_matkul: {
        type: Sequelize.INTEGER(2),
      },
      id_dosen1: {
        type: Sequelize.INTEGER(4),
      },
      id_dosen2: {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      id_dosen3: {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      id_semester: {
        type: Sequelize.INTEGER(3),
      },
      nomor_kosek: {
        type: Sequelize.STRING(20),
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
    },
    { tableName: 'ref_kode_seksi' }
  )
}
