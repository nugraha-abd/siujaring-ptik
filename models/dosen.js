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
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: true,
      },
      nidn: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: true,
      },
      nidk: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: true,
      },
      no_telpon: {
        type: Sequelize.STRING(15),
        allowNull: true,
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
    { tableName: 'tb_dosen' }
  )
}
