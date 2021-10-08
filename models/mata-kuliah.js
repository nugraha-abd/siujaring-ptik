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
        type: Sequelize.STRING(8),
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
    { tableName: 'ref_mata_kuliah' }
  )
}
