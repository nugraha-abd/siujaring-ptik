const Sequelize = require('sequelize')

module.exports = (db) => {
  db.define(
    'User',
    {
      id_user: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        defaultValue: null, // might remove it later
      },
      username: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('dosen', 'mahasiswa', 'admin'),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      keterangan: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT,
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
    { tableName: 'tb_user' }
  )
}
