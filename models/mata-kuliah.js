const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'MataKuliah',
    {
      id_matkul: {
        type: Sequelize.INTEGER(2),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kode_matkul: {
        type: Sequelize.CHAR(8),
        unique: true,
      },
      nama_matkul: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      sks: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        allowNull: false,
      },
    },
    { tableName: 'ref_mata_kuliah' }
  )
}
