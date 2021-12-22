const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'Dosen',
    {
      id_dosen: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      nama_dosen: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nip: {
        type: Sequelize.CHAR(18),
        unique: true,
        allowNull: true,
      },
      nidn: {
        type: Sequelize.CHAR(10),
        unique: true,
        allowNull: true,
      },
      nidk: {
        type: Sequelize.CHAR(10),
        unique: true,
        allowNull: true,
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
    { tableName: 'tb_dosen' }
  )
}
