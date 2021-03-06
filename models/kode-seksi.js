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
        allowNull: false,
      },
      id_dosen1: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
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
        type: Sequelize.CHAR(20),
        unique: true,
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      },
      updated_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
      },
    },
    { tableName: 'ref_kode_seksi' }
  )
}
