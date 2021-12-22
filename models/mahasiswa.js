const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'Mahasiswa',
    {
      id_mhs: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      nama_mhs: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nim: {
        type: Sequelize.CHAR(10),
        unique: true,
        allowNull: false,
      },
      no_telpon: {
        type: Sequelize.STRING(15),
        allowNull: true,
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
    { tableName: 'tb_mahasiswa' }
  )
}
